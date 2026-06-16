import { ActivityItem, PanelMetric, RoleKpi, TableColumn, TableRow } from "@/lib/role-dashboard-data";

export const supportKpis: RoleKpi[] = [
  { label: "Open Tickets", value: "184", helper: "Across buyer, supplier, order and vet queues", status: "watch" },
  { label: "High Priority Tickets", value: "29", helper: "High and critical SLA queue", status: "critical" },
  { label: "Buyer Complaints", value: "62", helper: "Order, product and refund issues", status: "watch" },
  { label: "Supplier Complaints", value: "31", helper: "Catalog, shipping and payment disputes", status: "watch" },
  { label: "Shipping Issues", value: "46", helper: "Delayed, failed and in-transit disputes", status: "critical" },
  { label: "Payment Issues", value: "18", helper: "Refunds, UPI, COD and settlement tickets", status: "watch" },
  { label: "Vet Support Cases", value: "14", helper: "Consultation, prescription and follow-up help", status: "healthy" },
  { label: "Average Resolution Time", value: "5h 40m", helper: "Current support SLA performance", status: "healthy" }
];

export const supportTabs = [
  { label: "All Tickets", href: "#all-tickets" },
  { label: "Open", href: "#open" },
  { label: "Pending", href: "#pending" },
  { label: "Resolved", href: "#resolved" },
  { label: "Escalated", href: "#escalated" },
  { label: "High Priority", href: "#high-priority" },
  { label: "Buyer Tickets", href: "#buyer-tickets" },
  { label: "Supplier Tickets", href: "#supplier-tickets" },
  { label: "Vet Tickets", href: "#vet-tickets" }
];

export const ticketCategories: PanelMetric[] = [
  { label: "Order Issue", value: "42", detail: "Missing, delayed or incorrect orders", status: "watch" },
  { label: "Shipping Issue", value: "46", detail: "Failed delivery and courier disputes", status: "critical" },
  { label: "Payment Issue", value: "18", detail: "Payment, COD and settlement problems", status: "watch" },
  { label: "Refund Request", value: "13", detail: "Refund review and approval queue", status: "watch" },
  { label: "Product Complaint", value: "21", detail: "Quality, expiry or wrong product", status: "watch" },
  { label: "Supplier Complaint", value: "31", detail: "Supplier behavior or fulfillment complaints", status: "watch" },
  { label: "Buyer Complaint", value: "62", detail: "Buyer trust and service issues", status: "watch" },
  { label: "Vet Consultation Issue", value: "14", detail: "Appointment, prescription or follow-up", status: "healthy" },
  { label: "Technical Issue", value: "9", detail: "Login, checkout and dashboard problems", status: "healthy" }
];

export const ticketStatusMetrics: PanelMetric[] = [
  { label: "Open", value: "74", detail: "New tickets needing first response", status: "watch" },
  { label: "In Progress", value: "58", detail: "Assigned and under investigation", status: "healthy" },
  { label: "Waiting For User", value: "24", detail: "Customer input required", status: "watch" },
  { label: "Waiting For Supplier", value: "31", detail: "Supplier response required", status: "critical" },
  { label: "Escalated", value: "17", detail: "Manager or policy decision required", status: "critical" },
  { label: "Resolved", value: "142", detail: "Resolved in current period", status: "healthy" },
  { label: "Closed", value: "311", detail: "Closed after confirmation", status: "healthy" }
];

export const priorityMetrics: PanelMetric[] = [
  { label: "Low", value: "51", detail: "General support and information", status: "healthy" },
  { label: "Medium", value: "104", detail: "Standard support SLA", status: "healthy" },
  { label: "High", value: "24", detail: "Trust or order risk", status: "watch" },
  { label: "Critical", value: "5", detail: "Revenue, payment or emergency vet risk", status: "critical" }
];

export const adminActions: PanelMetric[] = [
  { label: "Assign Ticket", value: "Ready", detail: "Route to support owner or specialist", status: "healthy" },
  { label: "Reply To User", value: "Ready", detail: "Send response from ticket thread", status: "healthy" },
  { label: "Escalate Ticket", value: "Ready", detail: "Move to high priority command queue", status: "watch" },
  { label: "Mark Resolved", value: "Ready", detail: "Close with resolution status", status: "healthy" },
  { label: "Refund Request", value: "Ready", detail: "Create finance review from ticket", status: "watch" },
  { label: "Contact Supplier", value: "Ready", detail: "Call, email or WhatsApp supplier", status: "healthy" },
  { label: "Contact Buyer", value: "Ready", detail: "Call, email or WhatsApp buyer", status: "healthy" },
  { label: "Send WhatsApp Message", value: "Ready", detail: "Notify stakeholder with update", status: "healthy" },
  { label: "Add Internal Note", value: "Ready", detail: "Private support and ops note", status: "healthy" }
];

export const automationRules: PanelMetric[] = [
  { label: "Auto-assign ticket by category", value: "On", detail: "Orders, shipping, payment and vet queues", status: "healthy" },
  { label: "Auto-escalate after 24 hours", value: "On", detail: "SLA breach creates critical alert", status: "healthy" },
  { label: "Send WhatsApp update to user", value: "On", detail: "Ticket status changes notify user", status: "healthy" },
  { label: "Send email update", value: "On", detail: "Detailed support email updates", status: "healthy" },
  { label: "Create refund request from ticket", value: "Ready", detail: "Payment issue to finance workflow", status: "watch" },
  { label: "Create supplier warning from ticket", value: "Ready", detail: "Supplier complaint to compliance workflow", status: "watch" }
];

export const supportAnalytics: PanelMetric[] = [
  { label: "Ticket Volume", value: "584", detail: "Last 30 days", status: "watch" },
  { label: "Resolution Time", value: "5h 40m", detail: "Average first-to-resolved duration", status: "healthy" },
  { label: "Most Common Issues", value: "Shipping", detail: "Failed and delayed delivery issues lead", status: "critical" },
  { label: "Supplier Complaint Score", value: "72/100", detail: "Supplier support risk index", status: "watch" },
  { label: "Buyer Satisfaction Score", value: "91%", detail: "Post-resolution feedback", status: "healthy" },
  { label: "Shipping Issue Frequency", value: "7.8%", detail: "Orders with shipping support touch", status: "watch" }
];

export const supportActivityFeed: ActivityItem[] = [
  { title: "Critical shipping ticket escalated", detail: "Order AK-59218 failed delivery twice in Jaipur", time: "4m", status: "critical" },
  { title: "Refund request created", detail: "Payment issue ticket moved to finance review", time: "11m", status: "warning" },
  { title: "Supplier replied", detail: "Vetcare Supply House responded to missing invoice ticket", time: "16m", status: "success" },
  { title: "Buyer complaint resolved", detail: "Replacement order approved for dairy supplement", time: "24m", status: "success" },
  { title: "Vet support case assigned", detail: "Prescription follow-up routed to poultry specialist", time: "37m", status: "info" }
];

export const supportTableColumns: Record<string, TableColumn[]> = {
  tickets: [
    { key: "ticketId", label: "Ticket ID" },
    { key: "userType", label: "User Type" },
    { key: "userName", label: "User Name" },
    { key: "category", label: "Category" },
    { key: "subject", label: "Subject" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "createdDate", label: "Created Date" },
    { key: "lastUpdated", label: "Last Updated" },
    { key: "action", label: "Actions" }
  ],
  detail: [
    { key: "section", label: "Ticket Detail Drawer" },
    { key: "content", label: "Captured Data" },
    { key: "status", label: "Status" }
  ]
};

export const ticketRows: TableRow[] = [
  {
    ticketId: "AK-SUP-10284",
    userType: "Buyer",
    userName: "Ramesh Dairy Farm",
    category: "Shipping Issue",
    subject: "Order delayed for cattle feed bags",
    priority: "Critical",
    status: "Escalated",
    assignedTo: "Shipping Ops",
    createdDate: "16 Jun 2026",
    lastUpdated: "9 min ago",
    action: "Resolve"
  },
  {
    ticketId: "AK-SUP-10283",
    userType: "Supplier",
    userName: "Pashu Care Distributors",
    category: "Payment Issue",
    subject: "Settlement not visible in supplier dashboard",
    priority: "High",
    status: "In Progress",
    assignedTo: "Finance",
    createdDate: "16 Jun 2026",
    lastUpdated: "22 min ago",
    action: "Review"
  },
  {
    ticketId: "AK-SUP-10282",
    userType: "Buyer",
    userName: "Green Poultry Farm",
    category: "Product Complaint",
    subject: "Wrong vaccine pack received",
    priority: "High",
    status: "Waiting For Supplier",
    assignedTo: "Catalog Ops",
    createdDate: "16 Jun 2026",
    lastUpdated: "41 min ago",
    action: "Contact"
  },
  {
    ticketId: "AK-SUP-10281",
    userType: "Vet",
    userName: "Dr. Neha Sharma",
    category: "Vet Consultation Issue",
    subject: "Prescription PDF failed to send",
    priority: "Medium",
    status: "Open",
    assignedTo: "Vet Ops",
    createdDate: "16 Jun 2026",
    lastUpdated: "1h ago",
    action: "Assign"
  },
  {
    ticketId: "AK-SUP-10280",
    userType: "Buyer",
    userName: "Amit Goat Farm",
    category: "Refund Request",
    subject: "Refund needed for cancelled equipment order",
    priority: "Medium",
    status: "Waiting For User",
    assignedTo: "Support",
    createdDate: "15 Jun 2026",
    lastUpdated: "2h ago",
    action: "Reply"
  },
  {
    ticketId: "AK-SUP-10279",
    userType: "Supplier",
    userName: "Healthy Hooves",
    category: "Technical Issue",
    subject: "Unable to bulk upload product sheet",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Tech Support",
    createdDate: "15 Jun 2026",
    lastUpdated: "4h ago",
    action: "Close"
  }
];

export const ticketDetailRows: TableRow[] = [
  { section: "User Details", content: "Buyer, supplier, vet profile and contact data", status: "Ready" },
  { section: "Order Details", content: "Order ID, items, payment, tracking and SLA", status: "Ready" },
  { section: "Supplier Details", content: "Supplier profile, dispatch history and response SLA", status: "Ready" },
  { section: "Issue Description", content: "Structured complaint summary and category", status: "Ready" },
  { section: "Uploaded Images", content: "Product, delivery or damage proof", status: "Ready" },
  { section: "Uploaded Documents", content: "Invoices, prescriptions and payment receipts", status: "Ready" },
  { section: "Chat History", content: "Buyer, supplier, vet and admin replies", status: "Ready" },
  { section: "Internal Notes", content: "Private support notes and escalation context", status: "Ready" },
  { section: "Resolution Status", content: "Open, progress, escalated, resolved and closed", status: "Ready" }
];
