import Link from "next/link";
import { Chrome, KeyRound, LockKeyhole, Mail, Phone, ShieldCheck, Smartphone, UserRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginRedirects, userRoles } from "@/lib/rbac-data";

export const metadata = {
  title: "Role-Based Login | AnimKart OS",
  description: "Secure role-based login for AnimKart buyers, suppliers, vets and admin teams."
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto grid min-h-screen max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_520px] lg:items-center">
        <div className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/50">
          <div className="p-6 sm:p-8 xl:p-10">
            <Link className="flex items-center gap-3" href="/">
              <span className="grid size-12 place-items-center rounded-xl bg-[#0B8F47] text-2xl font-black">A</span>
              <span>
                <span className="block text-2xl font-black">AnimKart OS</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Secure access control</span>
              </span>
            </Link>
            <div className="mt-10 max-w-4xl">
              <Badge>Enterprise RBAC</Badge>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                One secure login for admins, suppliers, buyers, vets, support, finance and operations.
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                AnimKart users see only the tools they are allowed to use. Super admins control permissions, sessions,
                audit logs, OTP login, password reset and role-based redirects from the OS.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {userRoles.map((role) => (
                <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={role}>
                  <p className="text-sm font-bold">{role}</p>
                  <p className="mt-1 text-xs text-slate-400">Permission scoped</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-4">
            {loginRedirects.map((item) => (
              <Link className="bg-slate-950/80 p-4 hover:bg-slate-900" href={item.route} key={item.role}>
                <p className="text-sm font-black text-white">{item.role}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.route}</p>
              </Link>
            ))}
          </div>
        </div>

        <Card className="border-0 shadow-xl shadow-slate-300/50">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B8F47]">Login</p>
                <h2 className="mt-2 text-3xl font-black">Welcome back</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Use email/mobile password login or OTP access.</p>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-emerald-50 text-[#0B8F47]">
                <ShieldCheck size={24} />
              </span>
            </div>

            <form className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">Email or mobile</span>
                <span className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="admin@animkart.com or +91 mobile" />
                </span>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-700">Password</span>
                <span className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Enter password" type="password" />
                </span>
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <input className="size-4 accent-[#0B8F47]" type="checkbox" />
                  Keep me signed in
                </label>
                <Link className="text-sm font-bold text-[#0B8F47]" href="#forgot-password">Forgot Password</Link>
              </div>
              <Button className="h-12 bg-[#0B8F47] text-white hover:bg-[#08783c]">
                <KeyRound size={18} />
                Login Securely
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button className="h-11 gap-2" variant="outline">
                  <Smartphone size={17} />
                  OTP Login
                </Button>
                <Button className="h-11 gap-2" variant="outline">
                  <Chrome size={17} />
                  Login With Google
                </Button>
              </div>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-950">Role-Based Redirect</p>
              <div className="mt-3 grid gap-2">
                {loginRedirects.map((item) => (
                  <Link className="flex items-center justify-between rounded-xl bg-white p-3 text-sm hover:bg-emerald-50" href={item.route} key={item.role}>
                    <span className="flex items-center gap-2 font-bold text-slate-950">
                      <UserRound className="text-[#0B8F47]" size={16} />
                      {item.role}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{item.route}</span>
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-slate-500">
              <Phone size={15} />
              OTP, 2FA, session management and audit logs are structured for Supabase Auth integration.
            </p>
          </CardContent>
        </Card>
      </section>
      <SiteFooter />
    </main>
  );
}
