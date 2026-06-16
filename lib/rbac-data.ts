import { ActivityItem, PanelMetric, RoleKpi, TableColumn, TableRow } from "@/lib/role-dashboard-data";

export const userRoles = [
  "Super Admin",
  "Admin",
  "Operations Manager",
  "Finance Manager",
  "Support Executive",
  "Supplier",
  "Buyer",
  "Vet Consultant",
  "Content Manager"
];

export const loginRedirects = [
  { role: "Super Admin", route: "/admin/dashboard", detail: "Full platform command center" },
  { role: "Supplier", route: "/supplier/dashboard", detail: "Seller OS and inventory control" },
  { role: "Buyer", route: "/buyer/dashboard", detail: "Orders, invoices and procurement" },
  { role: "Vet Consultant", route: "/vet/dashboard", detail: "Appointments and prescriptions" }
];

export const userKpis: RoleKpi[] = [
  { label: "Total Users", value: "18,420", helper: "All AnimKart account identities", status: "healthy" },
  { label: "Admins", value: "42", helper: "Super admin, staff and managers", status: "healthy" },
  { label: "Suppliers", value: "2,148", helper: "Supplier and manufacturer users", status: "healthy" },
  { label: "Buyers", value: "15,884", helper: "Farmers, farms, pet owners and distributors", status: "healthy" },
  { label: "Vets", value: "106", helper: "Certified vet consultants", status: "healthy" },
  { label: "Active Users", value: "12,940", helper: "Active in last 30 days", status: "healthy" },
  { label: "Inactive Users", value: "4,982", helper: "Needs reactivation or review", status: "watch" },
  { label: "Pending Users", value: "498", helper: "KYC, invite or email verification pending", status: "watch" }
];

export const usersTableColumns: TableColumn[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "lastLogin", label: "Last Login" },
  { key: "createdDate", label: "Created Date" },
  { key: "action", label: "Actions" }
];

export const usersRows: TableRow[] = [
  { name: "Pankaj Mahto", email: "pankaj@animkart.com", phone: "+91 98765 43210", role: "Super Admin", status: "Active", lastLogin: "Today, 11:42 AM", createdDate: "01 Jun 2026", action: "View Activity" },
  { name: "Neha Sharma", email: "ops@animkart.com", phone: "+91 90000 10001", role: "Operations Manager", status: "Active", lastLogin: "Today, 10:20 AM", createdDate: "04 Jun 2026", action: "Edit Role" },
  { name: "Amit Finance", email: "finance@animkart.com", phone: "+91 90000 10002", role: "Finance Manager", status: "Active", lastLogin: "Yesterday", createdDate: "05 Jun 2026", action: "Reset Password" },
  { name: "Ritu Support", email: "support@animkart.com", phone: "+91 90000 10003", role: "Support Executive", status: "Active", lastLogin: "Today, 09:18 AM", createdDate: "08 Jun 2026", action: "Suspend User" },
  { name: "Pashu Care Distributors", email: "seller@pashucare.in", phone: "+91 90000 10004", role: "Supplier", status: "Pending", lastLogin: "Never", createdDate: "15 Jun 2026", action: "Send Invite" },
  { name: "Green Valley Dairy", email: "buyer@greenvalley.in", phone: "+91 90000 10005", role: "Buyer", status: "Active", lastLogin: "Today, 08:12 AM", createdDate: "11 Jun 2026", action: "View Activity" },
  { name: "Dr. Kavita Rao", email: "vet@animkart.com", phone: "+91 90000 10006", role: "Vet Consultant", status: "Inactive", lastLogin: "10 Jun 2026", createdDate: "03 Jun 2026", action: "Edit Role" },
  { name: "Content Desk", email: "content@animkart.com", phone: "+91 90000 10007", role: "Content Manager", status: "Suspended", lastLogin: "09 Jun 2026", createdDate: "06 Jun 2026", action: "View Activity" }
];

export const userStatusMetrics: PanelMetric[] = [
  { label: "Active", value: "12,940", detail: "Can access assigned dashboards", status: "healthy" },
  { label: "Inactive", value: "4,982", detail: "No recent login activity", status: "watch" },
  { label: "Pending", value: "498", detail: "Invite, KYC or OTP verification pending", status: "watch" },
  { label: "Suspended", value: "18", detail: "Manually suspended accounts", status: "critical" },
  { label: "Blocked", value: "7", detail: "Security or abuse block", status: "critical" }
];

export const securityMetrics: PanelMetric[] = [
  { label: "Two-Factor Authentication", value: "Enabled", detail: "Mandatory for admin and finance roles", status: "healthy" },
  { label: "OTP Login", value: "Ready", detail: "Mobile OTP login for buyers, suppliers and vets", status: "healthy" },
  { label: "Password Reset", value: "Ready", detail: "Secure reset workflow with audit trail", status: "healthy" },
  { label: "Session Management", value: "Active", detail: "Device sessions and revoke controls", status: "healthy" },
  { label: "Login History", value: "Tracked", detail: "IP, device and timestamp history", status: "healthy" },
  { label: "Audit Logs", value: "Tracked", detail: "Permissions, approvals and financial changes", status: "healthy" }
];

export const adminActions: PanelMetric[] = [
  { label: "Create User", value: "Ready", detail: "Invite staff, vet, supplier or support account", status: "healthy" },
  { label: "Edit Role", value: "Ready", detail: "Change role and permission template", status: "healthy" },
  { label: "Suspend User", value: "Ready", detail: "Temporarily block account access", status: "watch" },
  { label: "Reset Password", value: "Ready", detail: "Trigger secure reset flow", status: "healthy" },
  { label: "Send Invite", value: "Ready", detail: "Email or WhatsApp invite link", status: "healthy" },
  { label: "View Activity", value: "Ready", detail: "Login, action and audit history", status: "healthy" },
  { label: "Change Permissions", value: "Ready", detail: "Adjust module-level access matrix", status: "watch" }
];

export const permissionModules = [
  "Dashboard",
  "Analytics",
  "Suppliers",
  "Buyers",
  "Products",
  "Inventory",
  "Orders",
  "Shipping",
  "Vet Consultations",
  "Payments",
  "Settlements",
  "CMS",
  "Reports",
  "Settings"
];

export const permissionColumns = ["View", "Create", "Edit", "Delete", "Approve", "Export"];

export const permissionMatrixRows: TableRow[] = permissionModules.map((module) => ({
  module,
  view: "Allowed",
  create: ["Dashboard", "Analytics", "Reports"].includes(module) ? "No" : "Role based",
  edit: ["Dashboard", "Analytics"].includes(module) ? "No" : "Role based",
  delete: ["Settings", "CMS", "Products"].includes(module) ? "Restricted" : "No",
  approve: ["Suppliers", "Products", "Payments", "Settlements"].includes(module) ? "Manager+" : "No",
  export: ["Analytics", "Orders", "Payments", "Settlements", "Reports"].includes(module) ? "Allowed" : "Role based"
}));

export const permissionMatrixColumns: TableColumn[] = [
  { key: "module", label: "Module" },
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
  { key: "approve", label: "Approve" },
  { key: "export", label: "Export" }
];

export const roleExamples: PanelMetric[] = [
  { label: "Super Admin", value: "Full access", detail: "All modules, approvals, exports and settings", status: "healthy" },
  { label: "Finance Manager", value: "Restricted", detail: "Payments, settlements and reports only", status: "watch" },
  { label: "Support Executive", value: "View only", detail: "Orders, tickets, buyers and suppliers view only", status: "watch" },
  { label: "Supplier", value: "Own data", detail: "Own products, orders, inventory and shipping", status: "healthy" },
  { label: "Buyer", value: "Own account", detail: "Own orders, profile and vet consultations", status: "healthy" },
  { label: "Vet", value: "Own consultations", detail: "Prescriptions, appointments and earnings", status: "healthy" }
];

export const auditLogRows: TableRow[] = [
  { event: "User Login", user: "Pankaj Mahto", role: "Super Admin", module: "Dashboard", time: "Today, 11:42 AM", status: "Success" },
  { event: "Permission Changed", user: "Neha Sharma", role: "Operations Manager", module: "Products", time: "Today, 10:18 AM", status: "Reviewed" },
  { event: "Supplier Approved", user: "Pankaj Mahto", role: "Super Admin", module: "Suppliers", time: "Today, 09:44 AM", status: "Approved" },
  { event: "Product Approved", user: "Content Desk", role: "Content Manager", module: "Products", time: "Yesterday", status: "Approved" },
  { event: "Payment Updated", user: "Amit Finance", role: "Finance Manager", module: "Payments", time: "Yesterday", status: "Success" },
  { event: "Order Status Changed", user: "Ritu Support", role: "Support Executive", module: "Orders", time: "15 Jun 2026", status: "Updated" }
];

export const auditLogColumns: TableColumn[] = [
  { key: "event", label: "Audit Event" },
  { key: "user", label: "User" },
  { key: "role", label: "Role" },
  { key: "module", label: "Module" },
  { key: "time", label: "Time" },
  { key: "status", label: "Status" }
];

export const permissionActivity: ActivityItem[] = [
  { title: "Permission changed", detail: "Operations Manager can now approve product catalog edits", time: "8m", status: "warning" },
  { title: "Supplier invited", detail: "Pashu Care Distributors received onboarding invite", time: "18m", status: "success" },
  { title: "Finance session verified", detail: "Two-factor challenge completed by finance manager", time: "31m", status: "success" },
  { title: "Suspicious login blocked", detail: "Blocked login attempt for suspended content account", time: "1h", status: "critical" }
];
