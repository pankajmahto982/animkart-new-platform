import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarCheck,
  Camera,
  Clock,
  FileText,
  Fish,
  Languages,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  Upload,
  Users,
  Video
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getFeaturedProducts } from "@/lib/products";

const categories = [
  "Poultry Vet",
  "Dairy Vet",
  "Goat & Sheep Vet",
  "Pet Vet",
  "Equine Vet",
  "Aquaculture Expert",
  "Nutrition Consultant",
  "Farm Management Consultant"
];

const consultationTypes = [
  { title: "WhatsApp Consultation", icon: MessageCircle, detail: "Share photos, videos and symptoms quickly." },
  { title: "Phone Consultation", icon: Phone, detail: "Fast guidance for routine farm and pet issues." },
  { title: "Video Consultation", icon: Video, detail: "Useful for visible symptoms, wounds and flock checks." },
  { title: "Farm Visit", icon: Users, detail: "Field support for farms, dairies and poultry units." },
  { title: "Emergency Consultation", icon: AlertTriangle, detail: "Priority routing for urgent animal health cases." }
];

const vets = [
  { name: "Dr. Aditi Sharma", experience: "12 years", specialization: "Dairy cattle and mastitis care", languages: "Hindi, English", fee: "₹499" },
  { name: "Dr. R. Kulkarni", experience: "15 years", specialization: "Poultry flock health", languages: "Hindi, Marathi, English", fee: "₹699" },
  { name: "Dr. Neha Bansal", experience: "9 years", specialization: "Pet and small animal care", languages: "Hindi, English", fee: "₹399" }
];

const knowledge = [
  "Disease Guides",
  "Vaccination Schedules",
  "Nutrition Tips",
  "Farm Management Articles"
];

const testimonials = [
  { name: "Dairy Farmer, Haryana", text: "The vet helped us identify feed and mastitis care quickly. Product recommendation was easy to order." },
  { name: "Poultry Farm, Punjab", text: "Video consultation saved time during flock stress. Follow-up reminders are very useful." },
  { name: "Pet Owner, Bengaluru", text: "Clear guidance, prescription support and product options in one platform." }
];

const recommendedProducts = getFeaturedProducts(4);

export const metadata = {
  title: "Vet Consultation | AnimKart",
  description: "Talk to certified veterinary experts for poultry, dairy, goat, sheep, pet, horse and aquaculture health."
};

export default function VetConsultationPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>AnimKart Vet Desk</Badge>
              <Badge className="bg-emerald-50 text-[#0B8F47]">Verified Experts</Badge>
              <Badge className="bg-amber-50 text-amber-700">24x7 Emergency Support</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Talk To Certified Veterinary Experts
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Get professional advice for Poultry, Dairy, Goat, Sheep, Pet, Horse and Aquaculture health.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0B8F47] px-6 font-bold text-white shadow-sm hover:bg-[#08783c]" href="#booking">
                <CalendarCheck size={18} />Book Consultation
              </a>
              <a className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#0B8F47] bg-white px-6 font-bold text-[#0B8F47]" href="#emergency">
                <MessageCircle size={18} />WhatsApp Vet
              </a>
              <a className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 font-bold text-white" href="#emergency">
                <AlertTriangle size={18} />Emergency Consultation
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {[
                ["100+", "Veterinary Experts"],
                ["10,000+", "Consultations"],
                ["95%", "Satisfaction Rate"],
                ["25", "States Covered"]
              ].map(([value, label]) => (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}>
                  <p className="text-2xl font-black text-[#0B8F47]">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50 shadow-xl">
              <Image
                alt="Veterinarian helping animal health consultation"
                className="h-[520px] w-full object-cover"
                height={720}
                priority
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1000&q=80"
                width={1000}
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 gap-3 rounded-2xl bg-white p-3 shadow-xl">
              {["Cow", "Poultry", "Dog"].map((item) => (
                <div className="rounded-xl bg-slate-50 p-3 text-center" key={item}>
                  <p className="text-sm font-black text-slate-950">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">Expert care</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">Consultation Categories</p>
              <h2 className="mt-2 text-3xl font-black">Choose the right veterinary expert</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Card className="transition hover:-translate-y-0.5 hover:border-[#0B8F47]" key={category}>
                <CardContent className="p-5">
                  <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-[#0B8F47]">
                    {index === 5 ? <Fish size={22} /> : <Stethoscope size={22} />}
                  </div>
                  <p className="mt-4 font-black text-slate-950">{category}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Certified specialist support for diagnosis, care plan and product guidance.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Types</CardTitle>
              <CardDescription>Pick the mode that matches urgency, symptoms and farm context.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {consultationTypes.map((type) => (
                <div className="rounded-xl border border-slate-200 bg-white p-4" key={type.title}>
                  <type.icon className="text-[#0B8F47]" size={22} />
                  <p className="mt-3 font-bold text-slate-950">{type.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{type.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="emergency" className="border-rose-100 bg-rose-50">
            <CardHeader>
              <CardTitle>Emergency Vet Widget</CardTitle>
              <CardDescription>24x7 Emergency Support for urgent farm and animal health issues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl bg-white p-5">
                <AlertTriangle className="text-rose-600" size={34} />
                <p className="mt-4 text-2xl font-black text-slate-950">Need urgent help?</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Use emergency consultation for severe symptoms, sudden mortality, injury, poisoning or respiratory distress.</p>
                <div className="mt-5 grid gap-2">
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-rose-600 font-bold text-white" type="button">
                    <Phone size={17} />Call Now
                  </button>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white font-bold text-rose-700" type="button">
                    <MessageCircle size={17} />WhatsApp Now
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">How It Works</p>
          <h2 className="mt-3 text-3xl font-black">From symptoms to recommendations in six steps</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {["Choose Animal Type", "Describe Problem", "Upload Photos & Videos", "Select Consultation Type", "Talk To Expert", "Receive Recommendations"].map((step, index) => (
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4" key={step}>
                <span className="grid size-9 place-items-center rounded-full bg-[#0B8F47] text-sm font-black">{index + 1}</span>
                <p className="mt-4 text-sm font-bold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">Featured Veterinary Experts</p>
            <h2 className="mt-2 text-3xl font-black">Available today</h2>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {vets.map((vet, index) => (
              <Card key={vet.name}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid size-16 place-items-center rounded-2xl bg-emerald-50 text-2xl font-black text-[#0B8F47]">
                      {vet.name.split(" ")[1]?.slice(0, 1) ?? "V"}
                    </div>
                    <div>
                      <Badge className="bg-emerald-50 text-[#0B8F47]">Available Today</Badge>
                      <h3 className="mt-2 text-xl font-black">{vet.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{vet.specialization}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm">
                    <p className="flex items-center gap-2"><Clock className="text-[#0B8F47]" size={16} />{vet.experience} experience</p>
                    <p className="flex items-center gap-2"><Languages className="text-[#0B8F47]" size={16} />{vet.languages}</p>
                    <p className="flex items-center gap-2"><Star className="text-[#0B8F47]" fill="currentColor" size={16} />{(4.7 + index / 10).toFixed(1)} rating</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-2xl font-black text-slate-950">{vet.fee}</span>
                    <a className="inline-flex h-10 items-center rounded-lg bg-[#0B8F47] px-4 text-sm font-bold text-white" href="#booking">Book</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card id="booking">
            <CardHeader>
              <CardTitle>Consultation Booking Form</CardTitle>
              <CardDescription>Share animal details, symptoms, media and preferred consultation mode.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {["Animal Type", "Breed", "Age", "Preferred Time", "Phone Number", "Location"].map((field) => (
                  <label className="grid gap-2 text-sm font-semibold text-slate-700" key={field}>
                    {field}
                    <Input placeholder={field} />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                  Symptoms
                  <textarea className="min-h-28 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B8F47]" placeholder="Describe symptoms, duration, feed, vaccination history and current medicines..." />
                </label>
                <div className="grid gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Camera className="text-[#0B8F47]" />
                  <p className="font-bold">Upload Images</p>
                  <p className="text-sm text-slate-500">Animal photos, wounds, droppings, packaging labels.</p>
                </div>
                <div className="grid gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <Upload className="text-[#0B8F47]" />
                  <p className="font-bold">Upload Videos</p>
                  <p className="text-sm text-slate-500">Movement, breathing, flock behavior, feeding issue.</p>
                </div>
                <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                  Consultation Type
                  <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
                    {consultationTypes.map((type) => <option key={type.title}>{type.title}</option>)}
                  </select>
                </label>
              </div>
              <button className="mt-5 h-12 rounded-lg bg-[#0B8F47] px-6 font-bold text-white" type="button">Submit Request</button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vet Recommendation Engine</CardTitle>
              <CardDescription>After consultation, vets can recommend marketplace products directly.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {["Medicines", "Supplements", "Feed", "Equipment", "Direct Add To Cart"].map((item) => (
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3" key={item}>
                  <span className="flex items-center gap-2 font-bold text-slate-800">
                    <ShoppingCart className="text-[#0B8F47]" size={17} />{item}
                  </span>
                  <Badge>Ready</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Center</CardTitle>
              <CardDescription>Disease, vaccination, nutrition and farm management education.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {knowledge.map((item) => (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4" key={item}>
                  <span className="flex items-center gap-3 font-bold text-slate-800"><FileText className="text-[#0B8F47]" size={18} />{item}</span>
                  <Link className="text-sm font-bold text-[#0B8F47]" href="/help">Read</Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">Vet Recommended</p>
                <h2 className="mt-2 text-3xl font-black">Products vets often suggest</h2>
              </div>
              <Link className="text-sm font-bold text-[#0B8F47]" href="/products">View catalog</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {recommendedProducts.map((product, index) => (
                <ProductCard index={index} key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <CardContent className="p-5">
                <div className="flex gap-1 text-[#0B8F47]">
                  {[1, 2, 3, 4, 5].map((star) => <Star fill="currentColor" key={star} size={16} />)}
                </div>
                <p className="mt-4 leading-7 text-slate-700">{item.text}</p>
                <p className="mt-4 font-black text-slate-950">{item.name}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {["Verified Experts", "Secure Payments", "Prescription Support", "Follow-up Consultation", "AnimKart Certified"].map((badge) => (
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-[#0B8F47]" key={badge}>
                <ShieldCheck size={18} />{badge}
              </div>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
