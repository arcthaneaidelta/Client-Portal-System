"use client";

import { useAuth } from "@/context/auth-context";
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  ShieldCheck, 
  Globe, 
  Database,
  ChevronRight,
  Save,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { user, role } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div>
         <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
           System Settings
         </h1>
         <p className="text-slate-500 text-sm mt-1">Configure your personal preferences and organization-wide security protocols.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
         <TabsList className="bg-slate-900/50 border border-slate-800 p-1 rounded-xl mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
               <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
               <Lock className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
               <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
               <Database className="w-4 h-4" /> Organization
            </TabsTrigger>
         </TabsList>

         <TabsContent value="profile" key={user?.id || "loading"} className="space-y-6 outline-none">
            <Card className="bg-[#0f172a] border-slate-800/50">
               <CardHeader>
                  <CardTitle className="text-white text-lg">Personal Information</CardTitle>
                  <CardDescription className="text-slate-500">Update your account detail and public profile display.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-center gap-8 py-4 border-b border-slate-800/50">
                     <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center p-1">
                        <img src={user?.avatar} alt="Avatar" className="w-full h-full rounded-full bg-slate-900" />
                     </div>
                     <div className="space-y-2">
                        <p className="text-sm font-bold text-slate-200">Profile Picture</p>
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-8 border-slate-800 text-[10px] uppercase font-black">Change Avatar</Button>
                           <Button variant="ghost" size="sm" className="h-8 text-red-400 hover:text-red-500 text-[10px] uppercase font-black">Remove</Button>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Full Name</Label>
                        <Input defaultValue={user?.name} className="bg-slate-900 border-slate-800 focus-visible:ring-blue-500/20" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Email Address</Label>
                        <Input defaultValue={user?.email} className="bg-slate-900 border-slate-800 focus-visible:ring-blue-500/20" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Display Role</Label>
                        <Input value={role} disabled className="bg-slate-900 border-slate-800 opacity-50 uppercase font-black text-[10px] tracking-widest text-blue-400" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Timezone</Label>
                        <select className="w-full bg-slate-900 border border-slate-800 rounded-lg h-9 px-3 text-xs text-slate-300 outline-none appearance-none">
                           <option>London (GMT +00:00)</option>
                           <option>Berlin (GMT +01:00)</option>
                           <option>New York (GMT -05:00)</option>
                           <option>Tokyo (GMT +09:00)</option>
                        </select>
                     </div>
                  </div>
                  <div className="flex justify-end pt-6 border-t border-slate-800/50">
                     <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-8 rounded-xl shadow-xl shadow-blue-600/20">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </TabsContent>

         <TabsContent value="security" className="space-y-6 outline-none">
            <Card className="bg-[#0f172a] border-slate-800/50">
               <CardHeader>
                  <CardTitle className="text-white text-lg">Protection & Privacy</CardTitle>
                  <CardDescription className="text-slate-500">Manage two-factor authentication and device sessions.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-8">
                  <div className="space-y-4">
                     <SecurityToggle title="Two-Factor Authentication" desc="Require a security code alongside your password for enhanced security." active={true} />
                     <SecurityToggle title="Hardware Key Support" desc="Use biometric or USB keys to bypass standard password entry." active={false} />
                     <SecurityToggle title="Session Persistence" desc="Retain login state across browser restarts for trusted devices only." active={true} />
                  </div>

                  <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                           <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-200">Security Audit Required</p>
                           <p className="text-[11px] text-slate-500">Your organization requires a quarterly security check. Due in 12 days.</p>
                        </div>
                     </div>
                     <Button variant="outline" className="text-xs border-blue-500/20 text-blue-400 hover:bg-blue-400/5">Start Audit</Button>
                  </div>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>
    </div>
  );
}

function SecurityToggle({ title, desc, active }: { title: string, desc: string, active: boolean }) {
   return (
      <div className="flex items-center justify-between py-4 group">
         <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">{title}</p>
            <p className="text-xs text-slate-500">{desc}</p>
         </div>
         <div className={cn(
            "w-10 h-5 rounded-full relative transition-colors cursor-pointer",
            active ? "bg-blue-600" : "bg-slate-800"
         )}>
            <div className={cn(
               "absolute top-1 w-3 h-3 rounded-full bg-white transition-all transform",
               active ? "right-1" : "left-1"
            )} />
         </div>
      </div>
   );
}
