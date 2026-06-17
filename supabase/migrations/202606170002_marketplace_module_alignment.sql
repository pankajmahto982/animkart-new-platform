create extension if not exists "pgcrypto";

alter table public.categories add column if not exists icon text;
alter table public.categories add column if not exists status text not null default 'ACTIVE';

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo text,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products add column if not exists brand_id uuid references public.brands(id) on delete set null;
alter table public.products add column if not exists gst numeric(5, 2) not null default 0;

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_documents (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  document_url text not null,
  document_type text not null,
  created_at timestamptz not null default now()
);

alter table public.inventory add column if not exists current_stock integer not null default 0 check (current_stock >= 0);
alter table public.inventory add column if not exists expiry_date date;
alter table public.inventory add column if not exists batch_number text;
alter table public.inventory add column if not exists last_updated timestamptz not null default now();

create table if not exists public.inventory_logs (
  id uuid primary key default gen_random_uuid(),
  inventory_id uuid not null references public.inventory(id) on delete cascade,
  old_stock integer not null default 0,
  new_stock integer not null default 0,
  updated_by uuid references public.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.shipping_rules add column if not exists rule_type text;
alter table public.shipping_rules add column if not exists status text not null default 'ACTIVE';
alter table public.shipping_rules add constraint shipping_rules_rule_type_check
  check (rule_type is null or rule_type in ('STATE', 'CITY', 'PINCODE', 'WEIGHT', 'PRODUCT', 'ORDER_VALUE', 'FREIGHT', 'PICKUP'));

create table if not exists public.shipping_states (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  state text not null,
  charge numeric(12, 2) not null default 0,
  free_shipping_above numeric(12, 2),
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  unique (supplier_id, state)
);

create table if not exists public.shipping_cities (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  city text not null,
  state text,
  charge numeric(12, 2) not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  unique (supplier_id, city, state)
);

create table if not exists public.shipping_pincodes (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  pincode text not null,
  charge numeric(12, 2) not null default 0,
  delivery_days integer,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  unique (supplier_id, pincode)
);

create table if not exists public.shipping_weight_slabs (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  min_weight numeric(10, 2) not null default 0,
  max_weight numeric(10, 2),
  charge numeric(12, 2) not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table if not exists public.blocked_locations (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  state text,
  city text,
  pincode text,
  reason text,
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists shipping_amount numeric(12, 2) not null default 0;
alter table public.orders add column if not exists discount numeric(12, 2) not null default 0;
alter table public.orders add column if not exists gst numeric(12, 2) not null default 0;
alter table public.orders add column if not exists total numeric(12, 2) not null default 0;
alter table public.orders add column if not exists order_status text not null default 'PENDING';

alter table public.order_items add column if not exists price numeric(12, 2) not null default 0;
alter table public.order_items add column if not exists shipping numeric(12, 2) not null default 0;
alter table public.order_items add column if not exists gst numeric(12, 2) not null default 0;
alter table public.order_items add column if not exists subtotal numeric(12, 2) not null default 0;

create table if not exists public.order_tracking (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null,
  remarks text,
  created_at timestamptz not null default now()
);

alter table public.payments add column if not exists transaction_id text;
alter table public.payments add column if not exists payment_status text not null default 'PENDING';

create table if not exists public.settlements (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  gross_amount numeric(12, 2) not null default 0,
  shipping_amount numeric(12, 2) not null default 0,
  commission numeric(12, 2) not null default 0,
  gst numeric(12, 2) not null default 0,
  refund_amount numeric(12, 2) not null default 0,
  net_amount numeric(12, 2) not null default 0,
  settlement_status text not null default 'PENDING',
  payout_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.vets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  qualification text,
  specialization text,
  experience integer not null default 0,
  languages text[] not null default '{}',
  consultation_fee numeric(12, 2) not null default 0,
  rating numeric(3, 2) not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.vet_consultations add column if not exists animal_type text;
alter table public.vet_consultations add column if not exists appointment_date timestamptz;

create table if not exists public.vet_prescriptions (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references public.vet_consultations(id) on delete cascade,
  medicine text not null,
  dosage text,
  duration text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.b2b_leads add column if not exists product_name text;
alter table public.b2b_leads add column if not exists budget numeric(12, 2);

create table if not exists public.b2b_supplier_quotes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.b2b_leads(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  price numeric(12, 2),
  shipping_charge numeric(12, 2) not null default 0,
  remarks text,
  status text not null default 'SENT',
  created_at timestamptz not null default now()
);

create table if not exists public.notification_templates (
  id uuid primary key default gen_random_uuid(),
  template_name text not null unique,
  channel text not null check (channel in ('WHATSAPP', 'SMS', 'EMAIL', 'PUSH', 'IN_APP')),
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.support_tickets add column if not exists ticket_type text;

create table if not exists public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  sender_id uuid references public.users(id) on delete set null,
  message text not null,
  attachment text,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image text,
  mobile_image text,
  cta text,
  status text not null default 'DRAFT',
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text,
  seo_title text,
  meta_description text,
  status text not null default 'DRAFT',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  page text not null,
  device text,
  ip inet,
  created_at timestamptz not null default now()
);

create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  keyword text not null,
  results_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.audit_logs add column if not exists user_id uuid references public.users(id) on delete set null;
alter table public.audit_logs add column if not exists action text;

create index if not exists idx_brands_status on public.brands(status);
create index if not exists idx_product_images_product_id on public.product_images(product_id);
create index if not exists idx_product_documents_product_id on public.product_documents(product_id);
create index if not exists idx_inventory_logs_inventory_id on public.inventory_logs(inventory_id);
create index if not exists idx_shipping_states_supplier_state on public.shipping_states(supplier_id, state);
create index if not exists idx_shipping_cities_supplier_city on public.shipping_cities(supplier_id, city);
create index if not exists idx_shipping_pincodes_supplier_pincode on public.shipping_pincodes(supplier_id, pincode);
create index if not exists idx_blocked_locations_supplier on public.blocked_locations(supplier_id);
create index if not exists idx_order_tracking_order_id on public.order_tracking(order_id);
create index if not exists idx_settlements_supplier_status on public.settlements(supplier_id, settlement_status);
create index if not exists idx_vets_user_id on public.vets(user_id);
create index if not exists idx_vet_prescriptions_consultation_id on public.vet_prescriptions(consultation_id);
create index if not exists idx_b2b_supplier_quotes_lead_id on public.b2b_supplier_quotes(lead_id);
create index if not exists idx_notifications_sent_at on public.notifications(sent_at);
create index if not exists idx_ticket_messages_ticket_id on public.ticket_messages(ticket_id);
create index if not exists idx_banners_status_dates on public.banners(status, start_date, end_date);
create index if not exists idx_blogs_status_published_at on public.blogs(status, published_at);
create index if not exists idx_page_views_page_created on public.page_views(page, created_at);
create index if not exists idx_search_logs_keyword_created on public.search_logs(keyword, created_at);

alter table public.brands enable row level security;
alter table public.product_images enable row level security;
alter table public.product_documents enable row level security;
alter table public.inventory_logs enable row level security;
alter table public.shipping_states enable row level security;
alter table public.shipping_cities enable row level security;
alter table public.shipping_pincodes enable row level security;
alter table public.shipping_weight_slabs enable row level security;
alter table public.blocked_locations enable row level security;
alter table public.order_tracking enable row level security;
alter table public.settlements enable row level security;
alter table public.vets enable row level security;
alter table public.vet_prescriptions enable row level security;
alter table public.b2b_supplier_quotes enable row level security;
alter table public.notification_templates enable row level security;
alter table public.ticket_messages enable row level security;
alter table public.banners enable row level security;
alter table public.blogs enable row level security;
alter table public.page_views enable row level security;
alter table public.search_logs enable row level security;
