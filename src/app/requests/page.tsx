"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Paperclip, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  History,
  MessageSquare,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function RequestsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    type: "Resource",
    priority: "Standard",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <section className="text-center space-y-4">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2"
         >
            <Sparkles className="w-3 h-3" /> Concierge Support
         </motion.div>
         <h1 className="text-4xl font-bold tracking-tight text-white">Center of Excellence</h1>
         <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed text-balance">
           Submit requests for new resources, engagement adjustments, or technical support directly to your dedicated Nexus Manager.
         </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         {/* Form Section */}
         <div className="md:col-span-2">
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800/50 p-8 shadow-2xl relative overflow-hidden">
               <AnimatePresence mode="wait">
                 {!isSubmitted ? (
                   <motion.form 
                     key="form"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0, y: -20 }}
                     onSubmit={handleSubmit} 
                     className="space-y-8"
                   >
                     {/* Floating Label Style Groups */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="type" className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Request Type</Label>
                           <select 
                             id="type"
                             className="w-full bg-slate-900 border border-slate-800 rounded-lg h-11 px-4 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                             value={formData.type}
                             onChange={(e) => setFormData({...formData, type: e.target.value})}
                           >
                              <option>Resource Allocation</option>
                              <option>Budget Adjustment</option>
                              <option>Technical Support</option>
                              <option>Compliance Audit</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="priority" className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Priority Level</Label>
                           <select 
                             id="priority"
                             className="w-full bg-slate-900 border border-slate-800 rounded-lg h-11 px-4 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                             value={formData.priority}
                             onChange={(e) => setFormData({...formData, priority: e.target.value})}
                           >
                              <option>Standard</option>
                              <option>High (Expedited)</option>
                              <option>Critical (Blocked)</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Subject</Label>
                        <Input 
                          id="subject"
                          placeholder="e.g. Additional Frontend Developer for Phase 2" 
                          className="bg-slate-900 border-slate-800 h-11 px-4 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="description" className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Description & Justification</Label>
                        <textarea 
                          id="description"
                          rows={6}
                          placeholder="Please provide detailed context regarding your request..." 
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-4 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          required
                        />
                     </div>

                     <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-4 text-slate-500">
                           <button type="button" className="flex items-center gap-2 text-xs hover:text-slate-300 transition-colors">
                              <Paperclip className="w-4 h-4" /> Attach Reference
                           </button>
                           <span className="text-slate-800">|</span>
                           <div className="flex items-center gap-2 text-xs">
                              <Info className="w-4 h-4 text-blue-500/50" /> SLA: 24h Response
                           </div>
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full md:w-auto min-w-[160px] bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xl shadow-blue-900/20 h-12 rounded-xl group transition-all"
                        >
                           {isSubmitting ? (
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                             </div>
                           ) : (
                             <div className="flex items-center gap-2">
                                Submit Request <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                             </div>
                           )}
                        </Button>
                     </div>
                   </motion.form>
                 ) : (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="py-20 flex flex-col items-center text-center space-y-6"
                   >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 relative">
                         <CheckCircle2 className="w-10 h-10" />
                         <motion.div 
                           initial={{ scale: 0.5, opacity: 0 }}
                           animate={{ scale: 1.5, opacity: 0 }}
                           transition={{ duration: 0.8, repeat: Infinity }}
                           className="absolute inset-0 rounded-full border-2 border-emerald-500"
                         />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-bold text-white tracking-tight">Request Received</h3>
                         <p className="text-slate-500 text-sm max-w-sm mx-auto">Your request has been prioritized and assigned to a manager. Reference ID: <span className="font-mono text-blue-400">#REQ-2024-88A</span></p>
                      </div>
                      <Button variant="outline" className="border-slate-800" onClick={() => setIsSubmitted(false)}>Submit Another</Button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
         </div>

         {/* Info Sidebar */}
         <div className="space-y-8">
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800/50 p-6">
               <div className="flex items-center gap-3 mb-6">
                  <History className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-slate-200">Active Threads</h3>
               </div>
               <div className="space-y-4">
                  <RequestThreadItem title="Azure Instance Upgrade" status="Active" time="12m ago" />
                  <RequestThreadItem title="Developer Extension" status="Resolved" time="1d ago" />
                  <RequestThreadItem title="Compliance Certificate" status="Pending" time="3d ago" />
               </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border border-blue-500/20">
               <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">Guidelines</h4>
               </div>
               <ul className="text-xs text-slate-400 space-y-3 leading-relaxed">
                  <li className="flex gap-2"><ArrowRight className="w-3 h-3 shrink-0 text-slate-600" /> Provide clear business justification for resource increases.</li>
                  <li className="flex gap-2"><ArrowRight className="w-3 h-3 shrink-0 text-slate-600" /> Specify expected engagement duration if temporary.</li>
                  <li className="flex gap-2"><ArrowRight className="w-3 h-3 shrink-0 text-slate-600" /> Upload signed SOWs for any budget overhead exceeding 10%.</li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
}

function RequestThreadItem({ title, status, time }: { title: string, status: string, time: string }) {
   return (
      <div className="group cursor-pointer">
         <div className="flex justify-between items-start mb-1">
            <p className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors leading-tight">{title}</p>
            <span className="text-[10px] text-slate-600 whitespace-nowrap font-mono">{time}</span>
         </div>
         <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn(
               "text-[9px] h-4 border-none px-1 uppercase tracking-tighter font-bold",
               status === 'Active' ? "text-blue-500 bg-blue-500/10" :
               status === 'Pending' ? "text-amber-500 bg-amber-500/10" :
               "text-emerald-500 bg-emerald-500/10"
            )}>
               {status}
            </Badge>
            <MessageSquare className="w-3 h-3 text-slate-700 group-hover:text-slate-400" />
         </div>
      </div>
   );
}
