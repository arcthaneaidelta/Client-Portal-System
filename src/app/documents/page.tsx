"use client";

import { useAuth } from "@/context/auth-context";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  FileCode, 
  FileImage, 
  FileAudio,
  Eye,
  Trash2,
  Share2,
  Lock,
  ChevronRight,
  UploadCloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DOCUMENTS = [
  { id: "DOC-001", name: "Contract_Acme_Final.pdf", type: "pdf", size: "2.4 MB", owner: "Nexus Admin", date: "Mar 20, 2024", access: "private" },
  { id: "DOC-002", name: "SOW_Phoenix_Migration.docx", type: "doc", size: "1.1 MB", owner: "Sarah Jenkins", date: "Mar 22, 2024", access: "shared" },
  { id: "DOC-003", name: "Architecture_V2.figma", type: "fig", size: "14.8 MB", owner: "Elena Rodriguez", date: "Apr 01, 2024", access: "internal" },
  { id: "DOC-004", name: "Budget_Allocation_Q2.xlsx", type: "xls", size: "850 KB", owner: "Nexus Finance", date: "Mar 15, 2024", access: "private" },
  { id: "DOC-005", name: "Profile_Photography.zip", type: "zip", size: "45.2 MB", owner: "Marketing Dept", date: "Feb 28, 2024", access: "shared" },
];

export default function DocumentsPage() {
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
             Secure Documents
           </h1>
           <p className="text-slate-500 text-sm mt-1">Access contracts, SOWs, and shared project assets with enterprise-grade encryption.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-slate-800 bg-slate-900/50">Manage Permissions</Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
              <UploadCloud className="w-4 h-4 mr-2" /> Upload File
           </Button>
        </div>
      </div>

       {/* Search & Filters */}
       <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input placeholder="Search files, owners, or extensions..." className="pl-10 bg-slate-900/50 border-slate-800 focus-visible:ring-blue-500/20" />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               <Filter className="w-4 h-4 mr-2" /> File Type
            </Button>
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-400">
               Sort: Latest
            </Button>
         </div>
      </div>

      {/* Folders View Mock */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <FolderCard title="Legal & Compliance" count={42} />
         <FolderCard title="Resource Profiles" count={128} />
         <FolderCard title="Project Assets" count={56} />
         <FolderCard title="Invoices & Finance" count={18} />
      </div>

      {/* Files List */}
      <div className="bg-[#0f172a] rounded-xl border border-slate-800/50 overflow-hidden shadow-2xl shadow-blue-900/10">
         <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-800">
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Name</th>
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Owner</th>
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Date Modified</th>
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Access</th>
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-right">Size</th>
                     <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50">
                  {DOCUMENTS.map((doc, i) => (
                    <motion.tr 
                      key={doc.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-slate-800/20 transition-all cursor-pointer"
                    >
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                                <FileIcon type={doc.type} />
                             </div>
                             <div>
                                <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">{doc.name}</p>
                                <p className="text-[10px] text-slate-500 font-mono">{doc.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-400">{doc.owner}</td>
                       <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                       <td className="px-6 py-4">
                          <Badge variant="outline" className={cn(
                             "border-none text-[9px] uppercase font-bold tracking-widest px-1.5",
                             doc.access === 'private' ? "bg-red-500/10 text-red-400" :
                             doc.access === 'internal' ? "bg-blue-500/10 text-blue-400" :
                             "bg-emerald-500/10 text-emerald-500"
                          )}>
                             {doc.access === 'private' && <Lock className="w-2.5 h-2.5 mr-1" />}
                             {doc.access}
                          </Badge>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-400 text-right font-mono">{doc.size}</td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <Download className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                <Share2 className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                             </Button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}

function FolderCard({ title, count }: { title: string, count: number }) {
   return (
      <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800/50 hover:border-slate-600 transition-all group cursor-pointer relative overflow-hidden">
         <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-blue-500/5 blur-3xl pointer-events-none" />
         <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
               <FileCode className="w-5 h-5" />
            </div>
            <MoreVertical className="w-4 h-4 text-slate-600" />
         </div>
         <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors leading-tight">{title}</h4>
         <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">{count} Files</p>
      </div>
   );
}

function FileIcon({ type }: { type: string }) {
   switch(type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'fig': return <FileImage className="w-5 h-5" />;
      case 'xls': return <FileCode className="w-5 h-5 text-emerald-500" />;
      case 'zip': return <FileAudio className="w-5 h-5 text-amber-500" />;
      default: return <FileText className="w-5 h-5" />;
   }
}
