"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  CheckSquare, 
  FileText, 
  MessageSquare, 
  Clock, 
  ChevronLeft,
  Settings,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", roles: ["client", "manager", "admin"] },
  { icon: Briefcase, label: "Engagements", href: "/engagements", roles: ["client", "manager", "admin"] },
  { icon: CheckSquare, label: "Approvals", href: "/approvals", roles: ["manager", "admin"] },
  { icon: Clock, label: "Time Tracking", href: "/time", roles: ["client", "manager", "admin"] },
  { icon: Users, label: "Contractors", href: "/contractors", roles: ["manager", "admin"] },
  { icon: ShieldCheck, label: "Onboarding", href: "/onboarding", roles: ["manager", "admin"] },
  { icon: FileText, label: "Documents", href: "/documents", roles: ["client", "manager", "admin"] },
  { icon: MessageSquare, label: "Requests", href: "/requests", roles: ["client", "manager", "admin"] },
  { icon: Settings, label: "Settings", href: "/settings", roles: ["client", "manager", "admin"] },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { role } = useAuth();

  const filteredMenu = MENU_ITEMS.filter(item => item.roles.includes(role));

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-screen bg-[#0f172a] border-r border-slate-800/50 text-slate-400 z-30"
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-semibold text-slate-100 tracking-tight whitespace-nowrap"
            >
              Nexus Portal
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "group relative flex items-center h-10 px-3 rounded-lg transition-all duration-200 cursor-pointer",
                isActive ? "bg-blue-600/10 text-blue-400" : "hover:bg-slate-800/50 hover:text-slate-200"
              )}>
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-blue-400" : "group-hover:text-slate-200")} />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="ml-3 text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                   <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-[-12px] w-1 h-6 bg-blue-500 rounded-r-full"
                   />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Support / Feedback */}
       <div className="p-3 border-t border-slate-800/50">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/50",
            isCollapsed && "justify-center px-0"
          )}>
             <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-slate-400" />
             </div>
             {!isCollapsed && (
               <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-slate-200">Support Context</span>
                  <span className="text-[10px] text-slate-500">Need help? Chat now</span>
               </div>
             )}
          </div>
       </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-6 right-[-12px] w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors z-40"
      >
        <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
          <ChevronLeft className="w-3 h-3 text-slate-300" />
        </motion.div>
      </button>
    </motion.aside>
  );
}
