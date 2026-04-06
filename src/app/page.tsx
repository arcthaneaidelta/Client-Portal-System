"use client";

import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as any 
    } 
  }
};

export default function DashboardPage() {
  const { role, user } = useAuth();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex items-center justify-between">
        <div>
           <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-3xl font-bold tracking-tight text-white mb-1"
           >
             Welcome back, {user?.name?.split(' ')[0]}
           </motion.h2>
           <p className="text-slate-500 text-sm">
             Here&apos;s what&apos;s happening with your projects today.
           </p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800">
             Download Report
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
             <Plus className="w-4 h-4 mr-2" /> New Request
           </Button>
        </div>
      </section>

      {/* KPI Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KpiCard 
          title="Active Engagements" 
          value="12" 
          change="+2.5%" 
          trend="up" 
          icon={BarChart3} 
        />
        <KpiCard 
          title="Total Resource Count" 
          value="48" 
          change="+12%" 
          trend="up" 
          icon={Users} 
        />
        <KpiCard 
          title="Avg. Approval Time" 
          value="4.2h" 
          change="-18%" 
          trend="up" 
          icon={Clock} 
          description="18% faster than last month"
        />
        <KpiCard 
          title="Monthly Budget" 
          value="$128.4k" 
          change="+4.3%" 
          trend="down" 
          icon={BarChart3} 
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 space-y-8"
        >
          {/* Active Engagements Table Mock */}
          <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden">
             <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Active Engagements</h3>
                  <p className="text-xs text-slate-500">Overview of current projects and their status.</p>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/5">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
             </div>
             <div className="p-0">
                <EngagementRow 
                  name="Phoenix System Migration" 
                  client="Acme Corp" 
                  status="In Progress"
                  progress={65}
                  team={["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2"]}
                />
                <EngagementRow 
                  name="Quantum Data Warehouse" 
                  client="Global Tech" 
                  status="Planning"
                  progress={12}
                  team={["https://i.pravatar.cc/150?u=3"]}
                />
                <EngagementRow 
                  name="Enterprise ERP Setup" 
                  client="Stark Ind." 
                  status="Delayed"
                  progress={88}
                  team={["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"]}
                />
             </div>
          </div>

          {/* Productivity Chart Visual Simulation */}
          <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col">
             <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Velocity Tracking</h3>
                  <p className="text-xs text-slate-500">Resource output vs scheduled milestones.</p>
                </div>
                <div className="flex gap-2">
                   <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Planned</Badge>
                   <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700">Actual</Badge>
                </div>
             </div>
             <div className="flex-1 flex items-end justify-between gap-2 px-2">
                {[40, 65, 45, 90, 60, 75, 85, 45, 60, 95, 70, 80].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: `${h}%` }}
                       transition={{ delay: 0.6 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                       className={cn(
                        "w-full rounded-t-sm transition-all duration-300",
                        i === 9 ? "bg-blue-500" : "bg-slate-700 group-hover:bg-slate-600"
                       )}
                     />
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Sidebar Widgets */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          {/* Pending Approvals Widget */}
          <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 p-6">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-100">Action Required</h3>
                <Badge className="bg-red-500/10 text-red-500 border-none">4 Alerts</Badge>
             </div>
             <div className="space-y-4">
                <ActionItem 
                  icon={AlertCircle}
                  color="text-yellow-500"
                  bg="bg-yellow-500/10"
                  title="Timesheet Approval"
                  desc="Alex Thompson (Acme Corp)"
                  time="2h ago"
                />
                <ActionItem 
                  icon={CheckCircle2}
                  color="text-blue-500"
                  bg="bg-blue-500/10"
                  title="Contract Extended"
                  desc="Sarah J. migration project"
                  time="5h ago"
                />
                <ActionItem 
                  icon={AlertCircle}
                  color="text-red-500"
                  bg="bg-red-500/10"
                  title="Payment Overdue"
                  desc="Inv #Nexus-2024-001"
                  time="1d ago"
                />
             </div>
             <Button variant="outline" className="w-full mt-6 bg-transparent border-slate-800 text-slate-400 hover:text-slate-200">
                View All Notifications
             </Button>
          </div>

          {/* Quick Stats / Feedback */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
             <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Upgrade to Nexus+</h4>
                <p className="text-blue-100 text-xs mb-4 leading-relaxed">Unlock advanced reporting, AI resource allocation, and priority support.</p>
                <Button size="sm" className="bg-white text-blue-600 hover:bg-slate-100 font-bold px-6">Explore Pro</Button>
             </div>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, change, trend, icon: Icon, description }: any) {
  return (
    <motion.div variants={item}>
      <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 p-6 hover:border-slate-700 transition-colors group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] pointer-events-none" />
        <div className="flex justify-between items-start mb-4">
           <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
             <Icon className="w-5 h-5" />
           </div>
           <Badge variant="outline" className={cn(
             "border-none",
             trend === 'up' ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
           )}>
             {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
             {change}
           </Badge>
        </div>
        <div>
           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
           <h4 className="text-2xl font-bold text-slate-100">{value}</h4>
           {description && <p className="text-[10px] text-slate-600 mt-1">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
}

function EngagementRow({ name, client, status, progress, team }: any) {
  return (
    <div className="flex items-center justify-between p-4 px-6 hover:bg-slate-800/30 transition-colors group cursor-pointer border-b border-slate-800/30 last:border-0">
       <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
             <Briefcase className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{name}</h4>
            <p className="text-[11px] text-slate-500">{client}</p>
          </div>
       </div>

       <div className="flex items-center gap-8 flex-1 justify-end">
          <div className="hidden md:block w-32">
             <div className="flex justify-between mb-1">
                <span className="text-[10px] text-slate-500">Progress</span>
                <span className="text-[10px] text-slate-300">{progress}%</span>
             </div>
             <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-blue-500" 
                />
             </div>
          </div>

          <div className="w-24 px-2">
             <Badge variant="outline" className={cn(
               "text-[10px] border-none font-bold uppercase",
               status === 'Delayed' ? "text-red-400 bg-red-400/5" : "text-blue-400 bg-blue-400/5"
             )}>
               {status}
             </Badge>
          </div>

          <div className="flex -space-x-2">
             {team.map((img: string, i: number) => (
               <Avatar key={i} className="w-6 h-6 border-2 border-[#0f172a]">
                  <AvatarImage src={img} />
                  <AvatarFallback>?</AvatarFallback>
               </Avatar>
             ))}
          </div>

          <button className="text-slate-600 hover:text-slate-300">
             <MoreHorizontal className="w-5 h-5" />
          </button>
       </div>
    </div>
  );
}

function ActionItem({ icon: Icon, color, bg, title, desc, time }: any) {
  return (
    <div className="flex items-start gap-4 group cursor-pointer">
       <div className={cn("mt-1 p-2 rounded-lg shrink-0", bg)}>
          <Icon className={cn("w-4 h-4", color)} />
       </div>
       <div className="flex-1 border-b border-slate-800/50 pb-4 group-last:border-0">
          <div className="flex justify-between items-start mb-0.5">
             <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{title}</p>
             <span className="text-[10px] text-slate-500 whitespace-nowrap">{time}</span>
          </div>
          <p className="text-xs text-slate-500">{desc}</p>
       </div>
    </div>
  );
}

const Briefcase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
