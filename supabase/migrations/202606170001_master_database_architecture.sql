create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

do $$ begin
  create type public.app_role as enum (
    'SUPER_ADMIN',
    'ADMIN',
    'SUPPLIER',
    'BUYER',
    'VET',
    'SUPPORT',
    'FINANCE',
    'OPERATIONS',
    'CONTENT_MANAGER'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.app_user_status as enum ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED', 'BLOCKED');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.approval_status as enum ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'HIDDEN', 'FLAGGED', 'REVIEW_REQUIRED');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ticket_priority as enum ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.ticket_status as enum ('OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'WAITING_FOR_SUPPLIER', 'ESCALATED', 'RESOLVED', 'CLOSED');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.payment_status as enum ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.cms_status as enum ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'EXPIRED', 'ARCHIVED');
exception when duplicate_object then null;
end $$;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  role_name public.app_role not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  module text not null,
  can_view boolean not null default false,
  can_create boolean not null default false,
  can_edit boolean not null default false,
  can_delete boolean not null default false,
  can_approve boolean not null default false,
  can_export boolean not null default false,
  created_at timestamptz not null default now(),
  unique (module)
);

create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  can_view boolean not null default false,
  can_create boolean not null default false,
  can_edit boolean not null default false,
  can_delete boolean not null default false,
  can_approve boolean not null default false,
  can_export boolean not null default false,
  created_at timestamptz not null default now(),
  unique (role_id, permission_id)
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  name text not null,
  email text unique,
  mobile text unique,
  password_hash text,
  role public.app_role not null default 'BUYER',
  status public.app_user_status not null default 'PENDING',
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_or_mobile_check check (email is not null or mobile is not null)
);

comment on column public.users.password_hash is 'Store only a password hash or delegate passwords fully to Supabase Auth. Never store plain text passwords.';

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  assigned_by uuid references public.users(id) on delete set null,
  assigned_at timestamptz not null default now(),
  unique (user_id, role_id)
);

create table if not exists public.login_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  login_at timestamptz not null default now(),
  ip_address inet,
  user_agent text,
  device text,
  success boolean not null default true,
  failure_reason text
);

create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  session_token_hash text not null,
  device text,
  ip_address inet,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  event_type text not null,
  module text not null,
  entity_type text,
  entity_id uuid,
  old_value jsonb,
  new_value jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

alter table public.suppliers add column if not exists user_id uuid references public.users(id) on delete set null;
alter table public.suppliers add column if not exists business_type text;
alter table public.suppliers add column if not exists logo text;
alter table public.suppliers add column if not exists banner text;
alter table public.suppliers add column if not exists address text;
alter table public.suppliers add column if not exists city text;
alter table public.suppliers add column if not exists state text;
alter table public.suppliers add column if not exists pincode text;
alter table public.suppliers add column if not exists country text not null default 'India';
alter table public.suppliers add column if not exists rating numeric(3, 2) not null default 0;
alter table public.suppliers add column if not exists verified boolean not null default false;

create table if not exists public.supplier_bank_details (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  account_holder text not null,
  bank_name text not null,
  account_number text not null,
  ifsc text not null,
  upi_id text,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.supplier_documents (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  document_type text not null,
  document_url text not null,
  status public.approval_status not null default 'PENDING_APPROVAL',
  reviewed_by uuid references public.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.buyers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  full_name text not null,
  mobile text,
  email text,
  gst_number text,
  business_name text,
  address text,
  city text,
  state text,
  pincode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.buyer_addresses (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.buyers(id) on delete cascade,
  address_type text not null default 'FARM',
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products add column if not exists brand text;
alter table public.products add column if not exists sku text;
alter table public.products add column if not exists short_description text;
alter table public.products add column if not exists benefits text;
alter table public.products add column if not exists ingredients text;
alter table public.products add column if not exists dosage text;
alter table public.products add column if not exists usage_instructions text;
alter table public.products add column if not exists technical_specs jsonb not null default '{}'::jsonb;
alter table public.products add column if not exists images text[] not null default '{}';
alter table public.products add column if not exists videos text[] not null default '{}';
alter table public.products add column if not exists documents text[] not null default '{}';
alter table public.products add column if not exists moq integer not null default 1 check (moq > 0);
alter table public.products add column if not exists stock_status text not null default 'IN_STOCK';
alter table public.products add column if not exists expiry_date date;
alter table public.products add column if not exists country_of_origin text default 'India';
alter table public.products add column if not exists approval_status public.approval_status not null default 'DRAFT';
alter table public.products add column if not exists approved_by uuid references public.users(id) on delete set null;
alter table public.products add column if not exists approved_at timestamptz;
alter table public.products add column if not exists rejected_reason text;
alter table public.products add column if not exists health_score integer not null default 0 check (health_score between 0 and 100);

create table if not exists public.product_approval_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  status public.approval_status not null,
  comment text,
  changed_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_batches (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  batch_number text,
  manufacturing_date date,
  expiry_date date,
  quantity integer not null default 0 check (quantity >= 0),
  created_at timestamptz not null default now()
);

alter table public.inventory add column if not exists reserved_stock integer not null default 0 check (reserved_stock >= 0);
alter table public.inventory add column if not exists available_stock integer generated always as (greatest(stock_quantity - reserved_stock, 0)) stored;
alter table public.inventory add column if not exists inventory_status text not null default 'IN_STOCK';
alter table public.inventory add column if not exists last_updated_by uuid references public.users(id) on delete set null;

create table if not exists public.shipping_zones (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  rule_type text not null check (rule_type in ('STATE', 'CITY', 'PINCODE', 'WEIGHT', 'PRODUCT', 'ORDER_VALUE', 'FREIGHT_ON_ACTUAL', 'BUYER_PICKUP', 'BLOCKED_LOCATION')),
  state text,
  city text,
  pincode text,
  product_id uuid references public.products(id) on delete cascade,
  min_weight numeric(10, 2),
  max_weight numeric(10, 2),
  min_order_value numeric(12, 2),
  delivery_charge numeric(12, 2) not null default 0,
  free_shipping_above numeric(12, 2),
  delivery_days integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists buyer_profile_id uuid references public.buyers(id) on delete set null;
alter table public.orders add column if not exists order_number text unique;
alter table public.orders add column if not exists payment_status public.payment_status not null default 'PENDING';
alter table public.orders add column if not exists delivery_status text not null default 'PENDING';
alter table public.orders add column if not exists gst_total numeric(12, 2) not null default 0;
alter table public.orders add column if not exists discount_total numeric(12, 2) not null default 0;
alter table public.orders add column if not exists platform_fee numeric(12, 2) not null default 0;
alter table public.orders add column if not exists shipping_address jsonb not null default '{}'::jsonb;
alter table public.orders add column if not exists gst_details jsonb not null default '{}'::jsonb;

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null,
  note text,
  changed_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  supplier_id uuid references public.suppliers(id) on delete set null,
  courier_partner text,
  tracking_number text,
  shipping_charge numeric(12, 2) not null default 0,
  freight_on_actual boolean not null default false,
  freight_status text not null default 'NOT_REQUIRED',
  buyer_pickup boolean not null default false,
  expected_delivery date,
  actual_delivery date,
  status text not null default 'PENDING',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete set null,
  buyer_id uuid references public.buyers(id) on delete set null,
  payment_method text not null,
  gateway text,
  gateway_payment_id text,
  amount numeric(12, 2) not null check (amount >= 0),
  status public.payment_status not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references public.payments(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  amount numeric(12, 2) not null check (amount >= 0),
  reason text,
  status text not null default 'PENDING',
  requested_by uuid references public.users(id) on delete set null,
  processed_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create table if not exists public.supplier_settlements (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  settlement_period text not null,
  gross_amount numeric(12, 2) not null default 0,
  commission_amount numeric(12, 2) not null default 0,
  net_amount numeric(12, 2) not null default 0,
  status text not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.vet_consultants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  full_name text not null,
  qualification text,
  specialization text[] not null default '{}',
  experience_years integer not null default 0,
  languages text[] not null default '{}',
  consultation_fee numeric(12, 2) not null default 0,
  rating numeric(3, 2) not null default 0,
  verified boolean not null default false,
  availability jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.vet_consultations add column if not exists vet_id uuid references public.vet_consultants(id) on delete set null;
alter table public.vet_consultations add column if not exists consultation_date timestamptz;
alter table public.vet_consultations add column if not exists prescription_url text;
alter table public.vet_consultations add column if not exists uploaded_images text[] not null default '{}';
alter table public.vet_consultations add column if not exists uploaded_videos text[] not null default '{}';

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references public.vet_consultations(id) on delete cascade,
  vet_id uuid references public.vet_consultants(id) on delete set null,
  medicines jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  follow_up_date date,
  pdf_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.b2b_leads (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.buyers(id) on delete set null,
  product_requirement text not null,
  category text,
  quantity text,
  location text,
  contact_name text,
  phone text,
  status text not null default 'NEW',
  lead_value numeric(12, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.b2b_lead_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.b2b_leads(id) on delete cascade,
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  quoted_price numeric(12, 2),
  message text,
  status text not null default 'SENT',
  created_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  title text not null,
  slug text not null unique,
  content jsonb not null default '{}'::jsonb,
  seo_title text,
  meta_description text,
  schema_markup jsonb not null default '{}'::jsonb,
  status public.cms_status not null default 'DRAFT',
  published_at timestamptz,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_banners (
  id uuid primary key default gen_random_uuid(),
  placement text not null,
  title text not null,
  subtitle text,
  cta_label text,
  cta_link text,
  desktop_image text,
  mobile_image text,
  display_order integer not null default 0,
  start_date timestamptz,
  end_date timestamptz,
  status public.cms_status not null default 'DRAFT',
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_offers (
  id uuid primary key default gen_random_uuid(),
  offer_title text not null,
  offer_type text not null,
  coupon_code text,
  discount_percent numeric(5, 2),
  banner_image text,
  applicable_categories text[] not null default '{}',
  start_date timestamptz,
  end_date timestamptz,
  status public.cms_status not null default 'DRAFT',
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  channel text not null check (channel in ('WHATSAPP', 'SMS', 'EMAIL', 'PUSH', 'IN_APP')),
  title text not null,
  message text not null,
  status text not null default 'PENDING',
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text not null unique,
  user_id uuid references public.users(id) on delete set null,
  user_type text not null,
  category text not null,
  subject text not null,
  description text,
  priority public.ticket_priority not null default 'MEDIUM',
  status public.ticket_status not null default 'OPEN',
  assigned_to uuid references public.users(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  supplier_id uuid references public.suppliers(id) on delete set null,
  attachments text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  sender_id uuid references public.users(id) on delete set null,
  message text not null,
  internal_note boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  event_name text not null,
  module text,
  entity_type text,
  entity_id uuid,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_metrics (
  id uuid primary key default gen_random_uuid(),
  metric_date date not null,
  metric_name text not null,
  metric_value numeric(14, 2) not null default 0,
  dimensions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (metric_date, metric_name, dimensions)
);

create index if not exists idx_users_role_status on public.users(role, status);
create index if not exists idx_suppliers_user_id on public.suppliers(user_id);
create index if not exists idx_buyers_user_id on public.buyers(user_id);
create index if not exists idx_products_supplier_status on public.products(supplier_id, approval_status);
create index if not exists idx_inventory_product_id on public.inventory(product_id);
create index if not exists idx_orders_buyer_status on public.orders(buyer_profile_id, status);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_shipments_order_id on public.shipments(order_id);
create index if not exists idx_payments_order_id on public.payments(order_id);
create index if not exists idx_b2b_leads_status on public.b2b_leads(status);
create index if not exists idx_notifications_user_status on public.notifications(user_id, status);
create index if not exists idx_support_tickets_status_priority on public.support_tickets(status, priority);
create index if not exists idx_analytics_events_name_created on public.analytics_events(event_name, created_at);

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.users enable row level security;
alter table public.user_roles enable row level security;
alter table public.login_history enable row level security;
alter table public.user_sessions enable row level security;
alter table public.audit_logs enable row level security;
alter table public.supplier_bank_details enable row level security;
alter table public.supplier_documents enable row level security;
alter table public.buyers enable row level security;
alter table public.buyer_addresses enable row level security;
alter table public.product_approval_history enable row level security;
alter table public.inventory_batches enable row level security;
alter table public.shipping_zones enable row level security;
alter table public.order_status_history enable row level security;
alter table public.shipments enable row level security;
alter table public.payments enable row level security;
alter table public.refunds enable row level security;
alter table public.supplier_settlements enable row level security;
alter table public.vet_consultants enable row level security;
alter table public.prescriptions enable row level security;
alter table public.b2b_leads enable row level security;
alter table public.b2b_lead_responses enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_banners enable row level security;
alter table public.cms_offers enable row level security;
alter table public.notifications enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_ticket_messages enable row level security;
alter table public.analytics_events enable row level security;
alter table public.daily_metrics enable row level security;

insert into public.roles (role_name, description)
values
  ('SUPER_ADMIN', 'Full platform owner access'),
  ('ADMIN', 'Admin staff access'),
  ('SUPPLIER', 'Supplier seller operating system access'),
  ('BUYER', 'Buyer account and procurement access'),
  ('VET', 'Veterinary consultant access'),
  ('SUPPORT', 'Support ticket and issue resolution access'),
  ('FINANCE', 'Payments, refunds, settlements and reports access'),
  ('OPERATIONS', 'Orders, shipping, suppliers and inventory operations access'),
  ('CONTENT_MANAGER', 'CMS, banners, offers and content access')
on conflict (role_name) do nothing;

insert into public.permissions (module, can_view, can_create, can_edit, can_delete, can_approve, can_export)
values
  ('Dashboard', true, false, false, false, false, true),
  ('Analytics', true, false, false, false, false, true),
  ('Suppliers', true, true, true, false, true, true),
  ('Buyers', true, true, true, false, false, true),
  ('Products', true, true, true, true, true, true),
  ('Inventory', true, true, true, false, false, true),
  ('Orders', true, true, true, false, true, true),
  ('Shipping', true, true, true, false, true, true),
  ('Vet Consultations', true, true, true, false, true, true),
  ('Payments', true, false, true, false, true, true),
  ('Settlements', true, false, true, false, true, true),
  ('CMS', true, true, true, true, true, true),
  ('Reports', true, false, false, false, false, true),
  ('Settings', true, true, true, true, true, true)
on conflict (module) do nothing;
