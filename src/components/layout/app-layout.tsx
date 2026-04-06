"use client";

import { AuthProvider, useAuth } from "@/context/auth-context";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { LoadingScreen } from "../loading-screen";
import { motion, AnimatePresence } from "framer-motion";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading, role } = useAuth();

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={role} // Re-animate when role switches
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 max-w-[1600px] mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Grain/Noise Overlay for depth */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </main>
    </div>
  );
}
