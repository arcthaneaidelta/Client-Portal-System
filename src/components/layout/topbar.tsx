"use client";

import { useAuth, UserRole } from "@/context/auth-context";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Globe,
  Settings,
  LogOut,
  User,
  ShieldIcon,
  HardHat,
  Building2
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { user, role, setRole } = useAuth();

  const roleIcons = {
    client: Building2,
    manager: HardHat,
    admin: ShieldIcon
  };

  const RoleIcon = roleIcons[role];

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-[#020617]/50 border-b border-slate-800/40 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
           <Input 
             placeholder="Search portal (cmd+k)..." 
             className="pl-10 h-9 bg-slate-900/50 border-slate-800 text-sm focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
           />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher (DEMO ONLY) */}
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-900/50 rounded-lg border border-slate-800">
           <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 px-1">Switch Persona</span>
           <div className="flex gap-1">
             {(["client", "manager", "admin"] as UserRole[]).map((r) => (
               <button
                 key={r}
                 onClick={() => setRole(r)}
                 className={cn(
                   "px-2 py-1 text-[10px] font-bold rounded-md uppercase transition-all duration-200",
                   role === r 
                     ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                     : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                 )}
               >
                 {r}
               </button>
             ))}
           </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors">
            <Bell className="w-[18px] h-[18px] text-slate-400" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-3 pl-2 pr-1 h-9 rounded-full hover:bg-slate-800/50 transition-colors outline-none cursor-pointer">
                 <div className="text-right flex flex-col justify-center">
                    <span className="text-xs font-semibold text-slate-200 block leading-tight">{user?.name}</span>
                    <Badge variant="outline" className={cn(
                      "text-[9px] h-3 px-1 border-none bg-transparent uppercase tracking-wider font-bold",
                      role === 'admin' ? "text-blue-400" : role === 'manager' ? "text-purple-400" : "text-emerald-400"
                    )}>
                      {role}
                    </Badge>
                 </div>
                 <Avatar className="w-7 h-7 border border-slate-700">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                 </Avatar>
                 <ChevronDown className="w-3 h-3 text-slate-500 mr-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-slate-300">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
                  <Globe className="w-4 h-4 mr-2" /> Language
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
