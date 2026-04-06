"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  UserPlus, 
  ArrowRight, 
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  CreditCard,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ONBOARDING_DATA = [
  {
    id: "ob-1",
    name: "Elena Rodriguez",
    role: "UI Designer",
    startDate: "April 12, 2024",
    progress: 75,
    steps: [
      { id: "s1", title: "Internal Security Training", status: "completed", date: "Mar 28" },
      { id: "s2", title: "Background Verification", status: "completed", date: "Mar 30" },
      { id: "s3", title: "Access Provisioning (Github, Jira, Figma)", status: "completed", date: "Apr 02" },
      { id: "s4", title: "Corporate Policy Sign-off", status: "pending", date: "Due Apr 05" },
      { id: "s5", title: "Hardware Procurement", status: "pending", date: "Due Apr 08" },
    ]
  },
  {
    id: "ob-2",
    name: "Marcus Aurelius",
    role: "Full Stack Engineer",
    startDate: "April 20, 2024",
    progress: 30,
    steps: [
      { id: "s1", title: "Internal Security Training", status: "completed", date: "Apr 04" },
      { id: "s2", title: "Background Verification", status: "pending", date: "Pending Review" },
      { id: "s3", title: "Access Provisioning", status: "pending", date: "Pending" },
      { id: "s4", title: "Corporate Policy Sign-off", status: "pending", date: "Pending" },
      { id: "s5", title: "Hardware Procurement", status: "pending", date: "Pending" },
    ]
  }
];

export default function OnboardingPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white">Onboarding Tracker</h1>
           <p className="text-slate-500 text-sm mt-1">Coordinate and track progress of new resources joining the ecosystem.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
           <UserPlus className="w-4 h-4 mr-2" /> Start New Onboarding
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Summary Sidebar */}
         <div className="space-y-6">
            <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 p-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Pipeline Health</h3>
               <div className="space-y-6 text-sm">
                  <div className="flex items-center justify-between">
                     <span className="text-slate-500">Active Pipeline</span>
                     <span className="font-bold text-white">12 New Hires</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-slate-500">Average Velocity</span>
                     <span className="font-bold text-emerald-500">9.2 Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-slate-500">Blocked Items</span>
                     <span className="font-bold text-red-500 text-xs px-1.5 py-0.5 bg-red-500/10 rounded">3 Critical</span>
                  </div>
               </div>
               <div className="mt-8 pt-8 border-t border-slate-800/50">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-4">Upcoming Arrivals</p>
                  <div className="space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-slate-300">Yuki Tanaka (Apr 15)</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                        <span className="text-xs text-slate-500">David Miller (Apr 22)</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Trackers */}
         <div className="lg:col-span-3 space-y-6">
            {ONBOARDING_DATA.map((resource) => (
              <OnboardingCard key={resource.id} data={resource} />
            ))}
         </div>
      </div>
    </div>
  );
}

function OnboardingCard({ data }: { data: typeof ONBOARDING_DATA[0] }) {
  const [isOpen, setIsOpen] = useState(data.progress > 50);

  return (
    <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden hover:border-slate-700 transition-all">
       <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                <UserPlus className="w-6 h-6 text-blue-500" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-slate-100">{data.name}</h3>
                <p className="text-xs text-slate-500">{data.role} • Starts <span className="text-slate-300 font-semibold">{data.startDate}</span></p>
             </div>
          </div>

          <div className="flex-1 max-w-md px-4">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Overall Readiness</span>
                <span className="text-xs font-bold text-blue-400">{data.progress}%</span>
             </div>
             <Progress value={data.progress} className="h-1.5 bg-slate-800" />
          </div>

          <div className="flex items-center gap-3">
             <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-xs">
                View Profile
             </Button>
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setIsOpen(!isOpen)}
               className="text-slate-500 hover:text-white"
             >
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
             </Button>
          </div>
       </div>

       {isOpen && (
         <motion.div 
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: "auto", opacity: 1 }}
           className="px-6 pb-8 border-t border-slate-800/50 bg-slate-950/20"
         >
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-600 mb-2 pl-1">Requirement Checklist</p>
                  <div className="space-y-2">
                     {data.steps.map((step) => (
                       <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-900 group transition-colors">
                          <div className="mt-1">
                             {step.status === 'completed' ? (
                               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                             ) : (
                               <Circle className="w-4 h-4 text-slate-700 group-hover:text-amber-500 transition-colors" />
                             )}
                          </div>
                          <div className="flex-1">
                             <p className={cn(
                               "text-xs font-semibold",
                               step.status === 'completed' ? "text-slate-400" : "text-slate-200"
                             )}>
                               {step.title}
                             </p>
                             <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-slate-600" />
                                <span className={cn("text-[10px]", step.status === 'completed' ? "text-slate-600" : "text-amber-500/70")}>
                                  {step.date}
                                </span>
                             </div>
                          </div>
                          {step.status === 'pending' && (
                             <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-blue-400 hover:bg-blue-400/5">
                                Complete Now
                             </Button>
                          )}
                       </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-6">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-600 mb-2 pl-1">Infrastructure Provisioning</p>
                  <div className="grid grid-cols-1 gap-3">
                     <ProvisionItem icon={ShieldCheck} title="Active Directory" status="active" />
                     <ProvisionItem icon={CreditCard} title="Payroll Link" status="pending" />
                     <ProvisionItem icon={Laptop} title="Workstation #NX-882" status="shipping" />
                     <ProvisionItem icon={FileText} title="Tax Documents" status="active" />
                  </div>
                  <div className="pt-4 p-4 rounded-xl border border-blue-500/10 bg-blue-900/5">
                     <div className="flex items-center gap-3 mb-2 text-blue-400">
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Next Priority</span>
                     </div>
                     <p className="text-sm text-slate-300">Elena needs corporate credit card approval for software licensing (Figma Pro).</p>
                  </div>
               </div>
            </div>
         </motion.div>
       )}
    </div>
  );
}

function ProvisionItem({ icon: Icon, title, status }: { icon: any, title: string, status: 'active' | 'pending' | 'shipping' }) {
  const statusConfig = {
    active: { label: 'Active', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    pending: { label: 'In Review', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    shipping: { label: 'Transit', color: 'text-blue-500', bg: 'bg-blue-500/10' }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800/50 bg-slate-900/30">
       <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-medium text-slate-300">{title}</span>
       </div>
       <Badge variant="outline" className={cn(
         "border-none text-[9px] uppercase font-black px-2",
         statusConfig[status].bg,
         statusConfig[status].color
       )}>
          {statusConfig[status].label}
       </Badge>
    </div>
  );
}
