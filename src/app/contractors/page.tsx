"use client";

import { useAuth } from "@/context/auth-context";
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  ExternalLink, 
  Mail, 
  ShieldCheck,
  Star,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CONTRACTORS = [
  { id: "C01", name: "Sarah Jenkins", role: "Frontend Lead", email: "sarah.j@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ", status: "Active", engagement: "Phoenix Migration", rating: 4.9, location: "London, UK", tags: ["React", "Next.js", "Framer"] },
  { id: "C02", name: "David Miller", role: "Backend Architect", email: "d.miller@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidM", status: "Active", engagement: "Nexus Core API", rating: 5.0, location: "Berlin, DE", tags: ["Node.js", "PostgreSQL", "AWS"] },
  { id: "C03", name: "Elena Rodriguez", role: "UI Designer", email: "elena@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR", status: "Onboarding", engagement: "Phoenix Migration", rating: 4.8, location: "Madrid, ES", tags: ["Figma", "Design Ops"] },
  { id: "C04", name: "Alex Thompson", role: "QA Engineer", email: "alex.t@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexT", status: "Idle", engagement: "N/A", rating: 4.5, location: "Toronto, CA", tags: ["Playwright", "Jest"] },
  { id: "C05", name: "Yuki Tanaka", role: "DevOps Specialist", email: "yuki@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=YukiT", status: "Active", engagement: "Cloud Migration", rating: 4.9, location: "Tokyo, JP", tags: ["Terraform", "Kubernetes"] },
  { id: "C06", name: "Samuel Green", role: "Full Stack Dev", email: "samuel@nexus.io", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SamuelG", status: "Offboarding", engagement: "Legacy Clean", rating: 4.3, location: "New York, US", tags: ["Vue.js", "PHP"] },
];

export default function ContractorsPage() {
  const { role } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             Contractors
             <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[10px] font-bold tracking-widest">{CONTRACTORS.length} RESOURCES</Badge>
           </h1>
           <p className="text-slate-500 text-sm mt-1">Directory of specialized external talent managed across all host engagements.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
              <ShieldCheck className="w-4 h-4 mr-2" /> Verify New Talent
           </Button>
        </div>
      </div>

       {/* Search Bar */}
       <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Search contractors by name, skill, or engagement..." className="pl-10 bg-slate-900/50 border-slate-800 focus-visible:ring-blue-500/20" />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               <Filter className="w-4 h-4 mr-2" /> Skills
            </Button>
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               Location: All
            </Button>
         </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {CONTRACTORS.map((c, i) => (
           <motion.div
             key={c.id}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.05 }}
             className="group bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden hover:border-slate-600 transition-all duration-300 relative"
           >
              {/* Header Gradient */}
              <div className="h-24 bg-gradient-to-br from-slate-800/50 to-slate-900/10 border-b border-slate-800/50 flex justify-end p-4 relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white rounded-full bg-slate-950/20">
                     <MoreVertical className="w-4 h-4" />
                  </Button>
              </div>

              {/* Profile Wrapper */}
              <div className="px-6 pb-6 relative">
                 <div className="flex justify-between items-end -mt-10 mb-4 px-1">
                    <Avatar className="w-20 h-20 border-4 border-[#0f172a] shadow-xl group-hover:scale-110 transition-transform duration-500">
                       <AvatarImage src={c.avatar} />
                       <AvatarFallback>{c.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-end pb-1">
                       <div className="flex items-center gap-1 text-sm font-bold text-slate-100">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {c.rating}
                       </div>
                       <Badge variant="outline" className={cn(
                          "border-none text-[9px] uppercase font-black tracking-widest mt-1",
                          c.status === 'Active' ? "text-emerald-500 bg-emerald-500/5" :
                          c.status === 'Onboarding' ? "text-blue-500 bg-blue-500/5" :
                          c.status === 'Offboarding' ? "text-red-500 bg-red-500/5" :
                          "text-slate-500 bg-slate-800"
                       )}>
                          {c.status}
                       </Badge>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div>
                       <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{c.name}</h3>
                       <p className="text-sm font-medium text-slate-500">{c.role}</p>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-slate-400">
                       <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-blue-500/70" />
                          <span className="font-semibold text-slate-300">{c.engagement === 'N/A' ? 'Available now' : c.engagement}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {c.location}
                       </div>
                       <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {c.email}
                       </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                       {c.tags.map(t => (
                         <Badge key={t} variant="secondary" className="bg-slate-800/50 hover:bg-slate-700 text-[10px] text-slate-400 border-none transition-colors">
                           {t}
                         </Badge>
                       ))}
                    </div>

                    <div className="pt-2 grid grid-cols-2 gap-2">
                       <Button variant="outline" className="w-full border-slate-800 bg-transparent text-slate-400 hover:text-slate-200 text-xs">
                          View History
                       </Button>
                       <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs">
                          Contact
                       </Button>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Stats Mini Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-blue-600/5 border border-blue-500/20 rounded-xl items-center">
          <div className="flex items-center gap-3">
             <CheckCircle className="w-6 h-6 text-emerald-500" />
             <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Utilization</p>
                <p className="text-lg font-bold text-slate-100">82.4%</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <Clock className="w-6 h-6 text-blue-500" />
             <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Avg. Tenure</p>
                <p className="text-lg font-bold text-slate-100">14.2 Mo</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <AlertCircle className="w-6 h-6 text-red-500" />
             <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Renewal Alerts</p>
                <p className="text-lg font-bold text-slate-100">3 Pending</p>
             </div>
          </div>
          <div className="flex justify-end pr-4">
             <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-widest">
               Deep Audit Report <ChevronRight className="w-4 h-4 ml-1" />
             </Button>
          </div>
      </div>
    </motion.div>
  );
}
