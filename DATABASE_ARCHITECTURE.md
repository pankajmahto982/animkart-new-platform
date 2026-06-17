# AnimKart OS Master Database Architecture

This architecture is designed for PostgreSQL on Supabase with Next.js and TypeScript.

## Core Identity

- `auth.users`: Supabase Auth source of truth.
- `users`: AnimKart application user profile with role, status, mobile, email and last login.
- `roles`, `permissions`, `role_permissions`, `user_roles`: role-based access control for Super Admin, Admin, Supplier, Buyer, Vet, Support, Finance, Operations and Content Manager.
- `login_history`, `user_sessions`, `audit_logs`: security, session and audit tracking.

## Marketplace Modules

- Buyers: `buyers`, `buyer_addresses`
- Suppliers: `suppliers`, `supplier_bank_details`, `supplier_documents`
- Products: `categories`, `brands`, `products`, `product_images`, `product_documents`, `product_approval_history`
- Inventory: `inventory`, `inventory_logs`, `inventory_batches`
- Orders: `orders`, `order_items`, `order_status_history`
- Shipping: `shipping_rules`, `shipping_states`, `shipping_cities`, `shipping_pincodes`, `shipping_weight_slabs`, `blocked_locations`, `shipping_zones`, `shipments`
- Payments: `payments`, `refunds`, `settlements`, `supplier_settlements`

## Operating System Modules

- Vet: `vets`, `vet_consultants`, `vet_consultations`, `vet_prescriptions`, `prescriptions`
- B2B: `b2b_leads`, `b2b_supplier_quotes`, `b2b_lead_responses`
- CMS: `banners`, `blogs`, `cms_pages`, `cms_banners`, `cms_offers`
- Notifications: `notifications`, `notification_templates`
- Support: `support_tickets`, `ticket_messages`, `support_ticket_messages`
- Analytics: `page_views`, `search_logs`, `analytics_events`, `daily_metrics`

## Important Relationships

- `users` -> `suppliers`
- `users` -> `buyers`
- `users` -> `vets`
- `suppliers` -> `products`
- `products` -> `inventory`
- `buyers` -> `orders`
- `orders` -> `order_items`
- `orders` -> `payments`
- `orders` -> `settlements`
- `buyers` -> `vet_consultations`
- `vets` -> `vet_consultations`
- `buyers` -> `b2b_leads`
- `b2b_leads` -> `b2b_supplier_quotes`

## Security Model

All new tables have Row Level Security enabled. Policies should be added per role once Supabase Auth claims are connected.

Recommended policy approach:

- Super Admin: full access.
- Admin/Ops: marketplace operations modules.
- Supplier: own supplier, own products, own inventory, own orders, own shipping, own settlements.
- Buyer: own profile, addresses, orders, payments, tickets and consultations.
- Vet: own consultations, prescriptions, messages and earnings.
- Finance: payments, refunds, settlements and reports.
- Support: tickets, users view-only, orders view-only, communication logs.
- Content Manager: CMS, banners, offers, blogs and SEO.

## Migration

Master migration:

`supabase/migrations/202606170001_master_database_architecture.sql`

Marketplace module alignment migration:

`supabase/migrations/202606170002_marketplace_module_alignment.sql`

Both migrations are additive to the existing initial schema and extend current marketplace tables instead of deleting or replacing them.
