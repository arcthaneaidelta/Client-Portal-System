"use client";

import { useAuth } from "@/context/auth-context";
import { 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  Plus, 
  History, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function TimeTrackingPage() {
  const { role } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             Time Tracking
           </h1>
           <p className="text-slate-500 text-sm mt-1">Log and manage billable hours across multiple engagements.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-slate-800 bg-slate-900/50">Export Logs</Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
             <Plus className="w-4 h-4 mr-2" /> Log Manually
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            {/* Active Timer Widget */}
             <Card className="bg-[#0f172a] border-blue-500/30 overflow-hidden relative group shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
                <CardHeader>
                   <CardTitle className="text-blue-400 uppercase tracking-widest font-black text-xs">Dynamic Tracker</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="space-y-2">
                         <h2 className="text-5xl font-mono font-black text-white tracking-tighter">04:32:18</h2>
                         <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest pl-1">Target: Phoenix Migration System</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <Button variant="outline" className="h-16 w-16 rounded-full border-slate-800 bg-slate-900 text-slate-400">
                            <Pause className="w-6 h-6" />
                         </Button>
                         <Button className="h-20 w-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/40 border-4 border-blue-500/50">
                            <Play className="w-8 h-8 ml-1" />
                         </Button>
                      </div>
                   </div>
                </CardContent>
             </Card>

             {/* Recent Logs Table Mock */}
             <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden">
                <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                   <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                      <History className="w-4 h-4 text-blue-500" />
                      Current Week Logs
                   </h3>
                   <span className="text-[11px] text-slate-500">Mar 24 - Mar 30</span>
                </div>
                <div className="p-0">
                   <TimeLogItem day="Monday" hours="8.5" engagement="Phoenix Migration" task="Frontend Component Design" />
                   <TimeLogItem day="Tuesday" hours="7.2" engagement="Nexus Core API" task="Middleware Optimization" />
                   <TimeLogItem day="Wednesday" hours="9.0" engagement="Phoenix Migration" task="Integration and Testing" />
                   <TimeLogItem day="Thursday" hours="4.5" engagement="Quantum API Dev" task="Stakeholder Meeting" />
                </div>
             </div>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
               <CardHeader className="pb-2">
                  <CardTitle className="text-slate-500 uppercase font-bold text-[10px] tracking-widest">Weekly Goal</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold text-white mb-2">29.2 <span className="text-sm font-normal text-slate-500">/ 40h</span></p>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} animate={{ width: '73%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full bg-emerald-500" />
                  </div>
               </CardContent>
            </Card>

            <div className="p-6 rounded-xl border border-slate-800/50 bg-[#0f172a]">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-semibold text-slate-200">Efficiency Insights</h3>
                   <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="space-y-4">
                   <p className="text-xs text-slate-500 leading-relaxed">You are tracking <span className="text-blue-400 font-bold">+12%</span> more hours than last week. Your focus time has increased by <span className="text-emerald-400 font-bold">2.4h</span> per day.</p>
                   <Button variant="ghost" className="w-full text-xs text-blue-500 hover:text-blue-400 hover:bg-blue-400/5 group">
                      View Full Analytics <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function TimeLogItem({ day, hours, engagement, task }: any) {
  return (
    <div className="p-4 px-6 flex items-center justify-between border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
       <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
             <span className="text-[10px] uppercase font-bold text-slate-500">{day.substring(0, 3)}</span>
             <span className="text-xs font-bold text-slate-300">24</span>
          </div>
          <div>
             <h4 className="text-xs font-bold text-slate-200">{task}</h4>
             <p className="text-[10px] text-slate-500">{engagement}</p>
          </div>
       </div>
       <div className="flex items-center gap-4">
          <Badge variant="outline" className="h-5 px-1.5 text-[9px] uppercase font-bold border-slate-800 text-slate-500">{hours}h</Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:text-white">
             <Plus className="w-4 h-4" />
          </Button>
       </div>
    </div>
  );
}
