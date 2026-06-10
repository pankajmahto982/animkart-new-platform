create extension if not exists "pgcrypto";

create type public.user_role as enum ('buyer', 'supplier', 'admin', 'vet');
create type public.supplier_status as enum ('draft', 'pending_review', 'approved', 'suspended');
create type public.product_status as enum ('draft', 'pending_review', 'active', 'hidden', 'rejected');
create type public.order_status as enum ('pending', 'accepted', 'packed', 'dispatched', 'delivered', 'cancelled', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'buyer',
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  gst_number text,
  pan_number text,
  status public.supplier_status not null default 'draft',
  inventory_health_score integer not null default 0 check (inventory_health_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  parent_id uuid references public.categories(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  mrp numeric(12, 2) check (mrp is null or mrp >= price),
  sku text,
  status public.product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.shipping_rules (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  zone_name text not null,
  states text[] not null default '{}',
  charge_type text not null check (charge_type in ('fixed', 'weight_based', 'order_value_based', 'freight_on_actual', 'buyer_pickup')),
  base_charge numeric(12, 2) check (base_charge is null or base_charge >= 0),
  minimum_order_value numeric(12, 2) check (minimum_order_value is null or minimum_order_value >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  status public.order_status not null default 'pending',
  subtotal numeric(12, 2) not null default 0,
  shipping_total numeric(12, 2) not null default 0,
  grand_total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  supplier_id uuid not null references public.suppliers(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0)
);

create table public.vet_consultations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete restrict,
  animal_category text not null,
  consultation_type text not null check (consultation_type in ('whatsapp', 'phone', 'video', 'farm_advisory')),
  symptoms text not null,
  status text not null default 'pending',
  paid_amount numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.suppliers enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.inventory enable row level security;
alter table public.shipping_rules enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.vet_consultations enable row level security;

create policy "Public categories are readable"
  on public.categories for select
  using (true);

create policy "Active products are readable"
  on public.products for select
  using (status = 'active');

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);
