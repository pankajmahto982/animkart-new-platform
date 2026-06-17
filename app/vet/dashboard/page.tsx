import {
  BadgeCheck,
  BarChart3,
  Bell,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Phone,
  Pill,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  UserRound,
  Video
} from "lucide-react";
import { DashboardAreaChart, DashboardBarChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RoleKpi } from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "/vet/dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "#appointments", icon: CalendarCheck },
  { label: "Consultations", href: "#requests", icon: Stethoscope },
  { label: "Patient Cases", href: "#cases", icon: HeartPulse },
  { label: "Prescriptions", href: "#prescription", icon: FileText },
  { label: "Recommendations", href: "#recommendations", icon: ShoppingCart },
  { label: "Messages", href: "#messages", icon: MessageCircle },
  { label: "Earnings", href: "#earnings", icon: CreditCard },
  { label: "Reports", href: "#analytics", icon: BarChart3 },
  { label: "Calendar", href: "#calendar", icon: Calendar },
  { label: "Profile", href: "#profile", icon: UserRound },
  { label: "Settings", href: "#settings", icon: Settings }
];

const kpis: RoleKpi[] = [
  { label: "Today's Appointments", value: "18", helper: "7 video, 6 phone, 5 WhatsApp", status: "healthy" },
  { label: "Active Cases", value: "42", helper: "9 need same-day review", status: "watch" },
  { label: "Completed Consultations", value: "1,284", helper: "Lifetime AnimKart consults", status: "healthy" },
  { label: "Pending Follow Ups", value: "11", helper: "Prescription and recovery checks", status: "watch" },
  { label: "Monthly Earnings", value: "₹1.84L", helper: "Consultations and follow-ups", status: "healthy" },
  { label: "Average Rating", value: "4.9", helper: "From verified buyers/farmers", status: "healthy" }
];

const appointments = [
  ["APT-2041", "Green Valley Dairy", "Dairy Cattle", "Video", "16 Jun", "10:30 AM", "Accepted"],
  ["APT-2042", "Kisan Poultry Farm", "Poultry", "WhatsApp", "16 Jun", "11:15 AM", "Pending"],
  ["APT-2043", "Ravi Pet Care", "Dog", "Phone", "16 Jun", "12:00 PM", "In Progress"],
  ["APT-2044", "Aqua Fresh Co.", "Fish", "Video", "16 Jun", "02:30 PM", "Follow Up Required"],
  ["APT-2045", "Nandi Goat Farm", "Goat", "Emergency", "16 Jun", "04:00 PM", "Pending"]
];

const requests = [
  { title: "Respiratory distress in broiler flock", detail: "2,000 birds, sudden cough, low feed intake", priority: "Emergency", type: "Poultry" },
  { title: "Milk drop after feed change", detail: "18 cows, possible mineral imbalance", priority: "High", type: "Dairy" },
  { title: "Skin lesions in dog", detail: "Photos uploaded, itching for 5 days", priority: "Normal", type: "Pet" },
  { title: "Fish mortality in pond", detail: "Water quality video uploaded", priority: "High", type: "Aquaculture" }
];

const cases = [
  ["CASE-884", "Dairy cattle", "HF Cross", "5 years", "430 kg", "Mastitis symptoms", "Consultation notes pending"],
  ["CASE-885", "Poultry", "Broiler", "24 days", "1.2 kg", "Coughing, stress", "Prescription draft ready"],
  ["CASE-886", "Pet", "Labrador", "3 years", "28 kg", "Skin allergy", "Follow-up scheduled"]
];

const messages = [
  { sender: "Green Valley Dairy", text: "Uploaded udder photo and milk yield chart.", time: "8 min ago" },
  { sender: "Kisan Poultry Farm", text: "Can we switch to video consultation?", time: "18 min ago" },
  { sender: "Aqua Fresh Co.", text: "Water test values added.", time: "34 min ago" }
];

const recommendations = ["Medicines", "Supplements", "Feed", "Equipment", "Vaccines"];
const earningsData = [
  { label: "Mon", value: 9200 },
  { label: "Tue", value: 13200 },
  { label: "Wed", value: 11800 },
  { label: "Thu", value: 16400 },
  { label: "Fri", value: 20600 },
  { label: "Sat", value: 18400 },
  { label: "Sun", value: 15100 }
];
const analyticsData = [
  { label: "Completed", value: 1284 },
  { label: "Rating", value: 490 },
  { label: "Revenue", value: 184 },
  { label: "Repeats", value: 38 },
  { label: "Products", value: 72 }
];

const statusClass: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-[#0B8F47]",
  "In Progress": "bg-sky-50 text-sky-700",
  Completed: "bg-emerald-50 text-[#0B8F47]",
  Cancelled: "bg-rose-50 text-rose-700",
  "Follow Up Required": "bg-purple-50 text-purple-700",
  Emergency: "bg-rose-50 text-rose-700",
  High: "bg-amber-50 text-amber-700",
  Normal: "bg-slate-100 text-slate-700"
};

export const metadata = {
  title: "Vet Dashboard | AnimKart OS",
  description: "Premium veterinary doctor dashboard for AnimKart OS consultations, prescriptions, earnings and recommendations."
};

export default function VetDashboardPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <DashboardSidebar active="Dashboard" eyebrow="Vet OS" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Doctor Console</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">AnimKart Certified</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Emergency Consultant</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Vet Dashboard</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search appointments, cases, prescriptions..." />
                </div>
                <Button variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
              <div className="grid gap-6 xl:grid-cols-[1fr_460px] xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Animal Healthcare Operating System</p>
                  <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Manage appointments, patient cases, prescriptions, recommendations and earnings from one vet console.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                    Practo-style doctor workflow combined with AnimKart marketplace recommendations for medicines, feed,
                    supplements, equipment and vaccines.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Next Video", "10:30 AM"],
                    ["Emergency Queue", "2 cases"],
                    ["Pending Prescriptions", "8 drafts"],
                    ["Video Link", "Ready"]
                  ].map(([label, value]) => (
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={label}>
                      <p className="text-xs uppercase tracking-wide text-emerald-200">{label}</p>
                      <p className="mt-2 text-xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {kpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_390px]">
              <div className="grid gap-6">
                <Card id="appointments">
                  <CardHeader className="gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Appointment ID, buyer, animal, consultation type, schedule and status.</CardDescription>
                    </div>
                    <Button>
                      <Video size={16} />
                      Start Next Consult
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[860px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                            {["Appointment ID", "Buyer Name", "Animal Type", "Consultation Type", "Date", "Time", "Status", "Actions"].map((column) => (
                              <th className="px-4 py-3 font-semibold" key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((row) => (
                            <tr className="border-b border-slate-100 last:border-0" key={row[0]}>
                              {row.map((cell, index) => (
                                <td className={index === 0 ? "px-4 py-4 font-bold text-slate-950" : "px-4 py-4 text-slate-600"} key={`${row[0]}-${cell}`}>
                                  {index === 6 ? <Badge className={statusClass[cell]}>{cell}</Badge> : cell}
                                </td>
                              ))}
                              <td className="px-4 py-4">
                                <div className="flex gap-2">
                                  <Button className="h-8 px-3" variant="outline">Accept</Button>
                                  <Button className="h-8 px-3" variant="outline">Open</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="requests">
                    <CardHeader>
                      <CardTitle>New Consultation Requests</CardTitle>
                      <CardDescription>Urgency routing for poultry, dairy, pet and aquaculture cases.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {requests.map((request) => (
                        <div className="rounded-xl border border-slate-200 bg-white p-4" key={request.title}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-950">{request.title}</p>
                              <p className="mt-1 text-sm leading-6 text-slate-500">{request.detail}</p>
                            </div>
                            <Badge className={statusClass[request.priority]}>{request.priority}</Badge>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-[#0B8F47]">{request.type}</span>
                            <Button className="h-9" variant="outline">Review</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card id="prescription">
                    <CardHeader>
                      <CardTitle>Prescription Builder</CardTitle>
                      <CardDescription>Medicine, dosage, duration, frequency, instructions and follow-up.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {["Medicine Name", "Dosage", "Duration", "Frequency", "Special Instructions", "Follow Up Date"].map((field) => (
                          <label className="grid gap-2 text-sm font-semibold text-slate-700" key={field}>
                            {field}
                            <Input placeholder={field} />
                          </label>
                        ))}
                        <Button>
                          <Download size={16} />
                          Download Prescription PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <Card id="cases">
                  <CardHeader>
                    <CardTitle>Recent Cases</CardTitle>
                    <CardDescription>Animal details, history, uploads and consultation notes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 lg:grid-cols-3">
                      {cases.map(([id, animal, breed, age, weight, symptoms, notes]) => (
                        <div className="rounded-xl border border-slate-200 bg-white p-4" key={id}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-black text-slate-950">{id}</p>
                              <p className="mt-1 text-sm text-slate-500">{animal} • {breed}</p>
                            </div>
                            <HeartPulse className="text-[#0B8F47]" size={22} />
                          </div>
                          <div className="mt-4 grid gap-2 text-sm text-slate-600">
                            <p><strong>Age:</strong> {age}</p>
                            <p><strong>Weight:</strong> {weight}</p>
                            <p><strong>Symptoms:</strong> {symptoms}</p>
                            <p><strong>Images/Videos:</strong> Uploaded</p>
                            <p><strong>Previous History:</strong> Available</p>
                            <p><strong>Notes:</strong> {notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="earnings">
                    <CardHeader>
                      <CardTitle>Vet Earnings Dashboard</CardTitle>
                    <CardDescription>Today&apos;s, weekly, monthly, pending and completed payouts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          ["Today's Earnings", "₹12,400"],
                          ["Weekly Earnings", "₹74,800"],
                          ["Monthly Earnings", "₹1.84L"],
                          ["Pending Payout", "₹38,200"],
                          ["Completed Payouts", "₹1.46L"]
                        ].map(([label, value]) => (
                          <div className="rounded-xl bg-slate-50 p-3" key={label}>
                            <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                            <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <DashboardAreaChart data={earningsData} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card id="analytics">
                    <CardHeader>
                      <CardTitle>Consultation Analytics</CardTitle>
                      <CardDescription>Completed consults, rating, revenue, repeats and recommended products.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashboardBarChart data={analyticsData} />
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="grid gap-6">
                <Card id="recommendations">
                  <CardHeader>
                    <CardTitle>AnimKart Recommendation Engine</CardTitle>
                    <CardDescription>Recommend products and push direct add-to-cart suggestions.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {recommendations.map((item) => (
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3" key={item}>
                        <span className="flex items-center gap-2 font-bold text-slate-800">
                          <Pill className="text-[#0B8F47]" size={17} />{item}
                        </span>
                        <Button className="h-8 px-3" variant="outline">Recommend</Button>
                      </div>
                    ))}
                    <Button>
                      <ShoppingCart size={16} />
                      Direct Add To Cart
                    </Button>
                  </CardContent>
                </Card>

                <Card id="messages">
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Patient communication panel.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {messages.map((message) => (
                      <div className="rounded-xl border border-slate-200 bg-white p-3" key={message.sender}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-bold text-slate-950">{message.sender}</p>
                          <span className="text-xs text-slate-500">{message.time}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{message.text}</p>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline"><MessageCircle size={16} />WhatsApp</Button>
                      <Button variant="outline"><Phone size={16} />Call</Button>
                      <Button variant="outline"><Send size={16} />Message</Button>
                      <Button variant="outline"><Video size={16} />Video Link</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card id="calendar">
                  <CardHeader>
                    <CardTitle>Appointment Calendar</CardTitle>
                    <CardDescription>Available slots, booked slots, block dates and rescheduling.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {[
                      ["Available Slots", "09:00, 11:30, 15:00"],
                      ["Booked Slots", "10:30, 12:00, 14:30"],
                      ["Block Dates", "18 Jun field visit"],
                      ["Reschedule", "2 requests pending"]
                    ].map(([label, value]) => (
                      <div className="rounded-xl bg-slate-50 p-3" key={label}>
                        <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card id="profile">
                  <CardHeader>
                    <CardTitle>Vet Profile</CardTitle>
                    <CardDescription>Public profile controls and trust signals.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="grid size-16 place-items-center rounded-2xl bg-emerald-50 text-2xl font-black text-[#0B8F47]">V</div>
                      <div>
                        <p className="text-lg font-black text-slate-950">Dr. Aditi Sharma</p>
                        <p className="text-sm text-slate-500">BVSc, MVSc • Dairy and poultry specialist</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      {[
                        ["Experience", "12 years"],
                        ["Qualification", "BVSc & AH, MVSc"],
                        ["Specialization", "Dairy, Poultry, Goat & Sheep"],
                        ["Languages", "Hindi, English, Punjabi"],
                        ["Consultation Fees", "₹499 video / ₹299 phone"],
                        ["Availability", "Mon-Sat, 9 AM - 7 PM"]
                      ].map(([label, value]) => (
                        <div className="rounded-lg bg-slate-50 p-3" key={label}>
                          <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trust Badges</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {[
                      ["Verified Vet", ShieldCheck],
                      ["AnimKart Certified", BadgeCheck],
                      ["Top Rated Specialist", Star],
                      ["Emergency Consultant", CheckCircle2]
                    ].map(([label, Icon]) => (
                      <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-[#0B8F47]" key={label as string}>
                        <Icon size={17} />{label as string}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card id="settings">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Realtime-ready clinical alerts.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {["New Appointment", "New Message", "Follow Up Reminder", "Prescription Sent", "Payment Received"].map((item) => (
                      <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700" key={item}>
                        <Bell className="text-[#0B8F47]" size={16} />{item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
