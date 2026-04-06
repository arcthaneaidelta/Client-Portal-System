"use client";

import { useAuth } from "@/context/auth-context";
import { 
  Briefcase, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronRight, 
  Plus,
  Users,
  Calendar,
  DollarSign,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ENGAGEMENTS = [
  { id: "ENG-001", name: "Phoenix Migration", client: "Acme Corp", status: "In Progress", type: "Fixed Fee", budget: "$120,000", resources: 4, deadline: "July 20, 2024" },
  { id: "ENG-002", name: "Quantum API Dev", client: "Global Tech", status: "Planning", type: "T&M", budget: "$45,000", resources: 2, deadline: "Aug 15, 2024" },
  { id: "ENG-003", name: "Enterprise ERP", client: "Stark Ind.", status: "Delayed", type: "Fixed Fee", budget: "$250,000", resources: 8, deadline: "June 05, 2024" },
  { id: "ENG-004", name: "UI Design System", client: "Nexus Labs", status: "Completed", type: "Retainer", budget: "$15,000/mo", resources: 1, deadline: "N/A" },
  { id: "ENG-005", name: "Security Audit", client: "Cyberdyne", status: "In Progress", type: "Audit", budget: "$32,000", resources: 3, deadline: "May 22, 2024" },
];

export default function EngagementsPage() {
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
             Engagements
           </h1>
           <p className="text-slate-500 text-sm mt-1">Manage and track all active client engagements and project health.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-slate-800 bg-slate-900/50">Export Data</Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
             <Plus className="w-4 h-4 mr-2" /> New Engagement
           </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Search by name, client, or ID..." className="pl-10 bg-slate-900/50 border-slate-800 focus-visible:ring-blue-500/20" />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               <Filter className="w-4 h-4 mr-2" /> All Clients
            </Button>
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               Status: All
            </Button>
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               Sort: Recent
            </Button>
         </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden">
         <Table>
            <TableHeader className="bg-slate-900/50">
               <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12">Engagement</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12">Client</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12">Status</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12 hidden md:table-cell">Budget</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12 hidden lg:table-cell">Resources</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12 hidden xl:table-cell">Deadline</TableHead>
                  <TableHead className="text-slate-400 text-xs uppercase tracking-wider font-bold h-12 text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {ENGAGEMENTS.map((eng, idx) => (
                 <TableRow 
                   key={eng.id} 
                   className="border-slate-800/50 hover:bg-slate-800/30 transition-colors group cursor-pointer"
                 >
                    <TableCell>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                             <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{eng.name}</p>
                             <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{eng.id}</p>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">{eng.client}</TableCell>
                    <TableCell>
                       <Badge variant="outline" className={cn(
                          "border-none text-[10px] uppercase font-bold tracking-wider px-2",
                          eng.status === 'In Progress' ? "bg-blue-500/10 text-blue-400" :
                          eng.status === 'Planning' ? "bg-slate-800 text-slate-400" :
                          eng.status === 'Delayed' ? "bg-red-500/10 text-red-500" :
                          "bg-emerald-500/10 text-emerald-500"
                       )}>
                          {eng.status}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm font-medium hidden md:table-cell">{eng.budget}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                       <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                          <Users className="w-3.5 h-3.5" /> {eng.resources}
                       </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                       <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                          <Calendar className="w-3.5 h-3.5" /> {eng.deadline}
                       </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white h-8 w-8">
                             <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white h-8 w-8">
                             <MoreHorizontal className="w-4 h-4" />
                          </Button>
                       </div>
                    </TableCell>
                 </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
         <p>Showing 5 of 12 active engagements across 4 client organizations</p>
         <div className="flex gap-2">
            <Button variant="ghost" size="sm" disabled className="text-slate-600">Previous</Button>
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">Next</Button>
         </div>
      </div>
    </motion.div>
  );
}
