"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Edit3, Lock, Users, LogOut, Eye, BarChart3, Sparkles, Info } from "lucide-react";

function SettingItem({ icon: Icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-[#1a1a1c] rounded-[20px] px-6 py-5 flex items-center justify-between hover:bg-[#222] transition-colors border border-white/5"
    >
      <div className="flex items-center gap-4">
        <div className="text-[#00e5a0]">
          {Icon}
        </div>
        <span className="text-white">{label}</span>
      </div>
      <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
        <path d="M7.5 15L12.5 10L7.5 5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

export default function ProfilePage() {
  const [name, setName] = useState("Mia Anderson");
  const [email, setEmail] = useState("mia.anderson@email.com");

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#231f20] to-[#1c191a] overflow-auto pb-28">
      {/* Top Section - User Info */}
      <div className="px-5 pt-16 pb-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-full bg-gradient-to-b from-[#00e5a0] to-[#00a076] p-1 mb-4 shadow-[0px_8px_24px_0px_rgba(0,229,160,0.3)]"
          >
            <div className="w-full h-full rounded-full bg-[#1c191a] flex items-center justify-center">
              <User className="w-12 h-12 text-[#00e5a0]" />
            </div>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-[#1a1a1c] rounded-full border border-white/5 hover:bg-[#222] transition-colors"
          >
            <span className="text-[#00e5a0] text-sm tracking-[-0.15px]">Change Profile Picture</span>
          </motion.button>
        </div>

        {/* User Name */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-white text-[28px] leading-[32px] tracking-[-0.5px]">{name}</h1>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4 text-[#00e5a0]" />
            </motion.button>
          </div>
          <p className="text-white/60">{email}</p>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-5 space-y-8">
        {/* Account Settings */}
        <div>
          <h2 className="text-white/50 text-xs uppercase tracking-[1px] mb-4 px-2">Account Settings</h2>
          <div className="space-y-3">
            <SettingItem 
              icon={<Edit3 className="w-5 h-5" />}
              label="Edit Name"
            />
            <SettingItem 
              icon={<Mail className="w-5 h-5" />}
              label="Change Email"
            />
            <SettingItem 
              icon={<Lock className="w-5 h-5" />}
              label="Change Password"
            />
            <SettingItem 
              icon={<Users className="w-5 h-5" />}
              label="Switch Account"
            />
          </div>
        </div>

        {/* Learning Settings */}
        <div>
          <h2 className="text-white/50 text-xs uppercase tracking-[1px] mb-4 px-2">Learning Settings</h2>
          <div className="space-y-3">
            <SettingItem 
              icon={<BarChart3 className="w-5 h-5" />}
              label="Learning Stats"
            />
            <SettingItem 
              icon={<Sparkles className="w-5 h-5" />}
              label="Customize Marlos"
            />
            <SettingItem 
              icon={<Eye className="w-5 h-5" />}
              label="Theme & Accessibility"
            />
          </div>
        </div>

        {/* App Info */}
        <div>
          <h2 className="text-white/50 text-xs uppercase tracking-[1px] mb-4 px-2">App Info</h2>
          <div className="space-y-3">
            <SettingItem 
              icon={<Info className="w-5 h-5" />}
              label="App Version"
            />
          </div>
        </div>

        {/* Log Out */}
        <div className="pt-2 pb-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#1a1a1c] rounded-[20px] px-6 py-5 flex items-center justify-center gap-3 hover:bg-[#222] transition-colors border border-white/5"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
