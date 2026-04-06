"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  Clock, 
  User, 
  Briefcase, 
  FileText, 
  Calendar,
  ChevronRight,
  History,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Mock data for approvals
const INITIAL_APPROVALS = [
  {
    id: "ap-1",
    contractor: "Sarah Jenkins",
    role: "Senior Frontend Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ",
    engagement: "Phoenix Migration",
    hours: 38.5,
    rate: 120,
    period: "Mar 24 - Mar 30",
    status: "pending",
    submittedAt: "2 hours ago",
    description: "Developed main dashboard components and integrated Framer Motion for page transitions."
  },
  {
    id: "ap-2",
    contractor: "David Miller",
    role: "Backend Architect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidM",
    engagement: "Nexus Core API",
    hours: 42.0,
    rate: 150,
    period: "Mar 24 - Mar 30",
    status: "pending",
    submittedAt: "5 hours ago",
    description: "Refactored authentication middleware and optimized database queries for enterprise clients."
  },
  {
    id: "ap-3",
    contractor: "Elena Rodriguez",
    role: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR",
    engagement: "Phoenix Migration",
    hours: 15.5,
    rate: 95,
    period: "Mar 24 - Mar 30",
    status: "pending",
    submittedAt: "1 day ago",
    description: "Created design system documentation and high-fidelity mockups for the new request module."
  }
];

const HISTORY = [
  { id: "h-1", contractor: "Marcus Aurelius", engagement: "Project Alpha", hours: 40, status: "approved", date: "Mar 22" },
  { id: "h-2", contractor: "Lucius Fox", engagement: "Wayne Tech App", hours: 25, status: "rejected", date: "Mar 21" },
  { id: "h-3", contractor: "Selina Kyle", engagement: "Cat-Eye Security", hours: 12, status: "approved", date: "Mar 20" },
];

export default function ApprovalsPage() {
  const { role } = useAuth();
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS);
  const [history, setHistory] = useState(HISTORY);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    const item = approvals.find(a => a.id === id);
    if (!item) return;

    // Animation delay simulation
    setTimeout(() => {
      setApprovals(prev => prev.filter(a => a.id !== id));
      setHistory(prev => [
        { 
          id: `h-${Date.now()}`, 
          contractor: item.contractor, 
          engagement: item.engagement, 
          hours: item.hours, 
          status: action, 
          date: "Today" 
        }, 
        ...prev 
      ]);
    }, 400);
  };

  if (role === "client") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
         <div className="p-4 rounded-full bg-slate-900 border border-slate-800">
            <ShieldIcon className="w-10 h-10 text-slate-500" />
         </div>
         <h2 className="text-2xl font-bold text-slate-100">Access Restricted</h2>
         <p className="text-slate-500 max-w-sm">Only Host Managers and Internal Admins can access the Time Approval Workflow for cross-client resources.</p>
         <Button variant="outline" className="mt-4 border-slate-800" onClick={() => window.location.href = '/'}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             Time Approvals
             <Badge className="bg-blue-600 text-[11px] h-5 px-1.5">{approvals.length} Pending</Badge>
           </h1>
           <p className="text-slate-500 text-sm mt-1">Review and approve submitted contractor hours for active engagements.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input placeholder="Search approvals..." className="pl-10 w-64 bg-slate-900/50 border-slate-800 focus-visible:ring-blue-500/20" />
           </div>
           <Button variant="outline" size="icon" className="border-slate-800 bg-slate-900/50"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        {/* Main List */}
        <div className="xl:col-span-3 space-y-4">
          <AnimatePresence mode="popLayout">
            {approvals.map((approval) => (
              <motion.div
                key={approval.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden hover:border-slate-700 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                   {/* Left Side: Avatar & Basic Info */}
                   <div className="p-6 md:w-64 border-b md:border-b-0 md:border-r border-slate-800/50 flex flex-col items-center text-center justify-center bg-slate-900/30">
                      <Avatar className="w-16 h-16 border-2 border-slate-800 mb-3 grayscale group-hover:grayscale-0 transition-all duration-500">
                         <AvatarImage src={approval.avatar} />
                         <AvatarFallback>{approval.contractor[0]}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-slate-200">{approval.contractor}</h4>
                      <p className="text-[11px] text-slate-500 mb-3">{approval.role}</p>
                      <Badge variant="outline" className="text-[10px] bg-blue-500/5 text-blue-400 border-none px-2 uppercase tracking-tight">
                        {approval.engagement}
                      </Badge>
                   </div>

                   {/* Center: Details */}
                   <div className="flex-1 p-6 space-y-4">
                      <div className="flex justify-between items-start">
                         <div className="flex gap-6">
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Hours</p>
                               <p className="text-2xl font-bold text-white tracking-tight">{approval.hours}<span className="text-sm font-normal text-slate-500 ml-1">hrs</span></p>
                            </div>
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total</p>
                               <p className="text-2xl font-bold text-white tracking-tight">
                                 ${(approval.hours * approval.rate).toLocaleString()}
                               </p>
                            </div>
                         </div>
                         <div className="text-right">
                             <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Period</p>
                             <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                {approval.period}
                             </div>
                         </div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/50 text-xs text-slate-400 italic leading-relaxed">
                        &ldquo;{approval.description}&rdquo;
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2">
                         <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Submitted {approval.submittedAt}
                         </span>
                         <button className="text-blue-400 hover:text-blue-300 flex items-center font-semibold">
                           View Full Timesheet <ChevronRight className="w-3 h-3 ml-0.5" />
                         </button>
                      </div>
                   </div>

                   {/* Right Side: Actions */}
                   <div className="p-6 border-t md:border-t-0 md:border-l border-slate-800/50 flex md:flex-col justify-center gap-3 bg-slate-900/10">
                      <Button 
                        onClick={() => handleAction(approval.id, 'approved')}
                        className="flex-1 md:flex-none justify-center h-12 md:w-12 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/0 hover:shadow-emerald-500/20"
                        title="Approve"
                      >
                         <Check className="w-6 h-6" />
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => handleAction(approval.id, 'rejected')}
                        className="flex-1 md:flex-none justify-center h-12 md:w-12 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/0 hover:shadow-red-500/20"
                        title="Reject"
                      >
                         <X className="w-6 h-6" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hidden md:flex text-slate-500 hover:text-white">
                         <MoreVertical className="w-5 h-5" />
                      </Button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {approvals.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-20 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 text-slate-500"
             >
                <Check className="w-12 h-12 text-blue-500 mb-4 opacity-20" />
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-sm">No pending approvals remaining in your queue.</p>
             </motion.div>
          )}
        </div>

        {/* History / Timeline Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 p-6">
              <div className="flex items-center gap-2 mb-6">
                 <History className="w-4 h-4 text-blue-500" />
                 <h3 className="font-semibold text-slate-200">Recent History</h3>
              </div>
              <div className="space-y-6 relative ml-2">
                 <div className="absolute left-[-9px] top-2 bottom-4 w-px bg-slate-800" />
                 
                 {history.map((item, idx) => (
                   <div key={item.id} className="relative pl-6">
                      <div className={cn(
                        "absolute left-[-13px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0f172a] ring-2",
                        item.status === 'approved' ? "bg-emerald-500 ring-emerald-500/20" : "bg-red-500 ring-red-500/20"
                      )} />
                      <div className="flex justify-between items-start">
                         <div>
                            <p className="text-[13px] font-semibold text-slate-200 leading-tight">{item.contractor}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.engagement}</p>
                         </div>
                         <span className="text-[10px] text-slate-600 font-mono">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-[10px] text-slate-500">{item.hours}h</span>
                         <span className={cn(
                           "text-[9px] font-bold uppercase tracking-widest",
                           item.status === 'approved' ? "text-emerald-500/70" : "text-red-500/70"
                         )}>
                           {item.status}
                         </span>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-slate-500 hover:text-blue-400 text-xs">
                View Full Audit Logs
              </Button>
           </div>

           {/* Metrics Mini-Widget */}
           <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 animate-pulse-slow">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-4">Total Pending Volume</h4>
              <p className="text-3xl font-bold text-white mb-1">
                ${approvals.reduce((acc, curr) => acc + (curr.hours * curr.rate), 0).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">Scheduled for Apr 5th payout</p>
           </div>
        </div>
      </div>
    </div>
  );
}

const ShieldIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
