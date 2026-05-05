"use client";

import React, { useState, useEffect } from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from "recharts";
import { Users, CreditCard, Activity, DollarSign, ArrowUpRight, Briefcase, CheckSquare, TrendingUp } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

import { useAdminDashboard } from "../hooks/useAdminDashboard";

export function AdminAnalytics() {
  const { stats, analytics, loading } = useAdminDashboard();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) return <div className="h-96 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading System Data...</span>
    </div>
  </div>;

  // Use real data or fallback to 0
  const kpis = [
    {
      title: "Total Revenue",
      value: analytics?.total_revenue ? `$${analytics.total_revenue.toLocaleString()}` : "$0.00",
      change: analytics?.revenue_today ? `+$${analytics.revenue_today}` : "No change",
      icon: <DollarSign size={18} />,
      positive: true
    },
    {
      title: "Total Users",
      value: analytics?.total_users?.toLocaleString() || "0",
      change: analytics?.new_users_today ? `+${analytics.new_users_today}` : "0 today",
      icon: <Users size={18} />,
      positive: true
    },
    {
      title: "Technicians",
      value: stats?.technicians?.toLocaleString() || "0",
      change: "Active",
      icon: <Briefcase size={18} />,
      positive: true
    },
    {
      title: "Pending Review",
      value: analytics?.pending_verifications?.toLocaleString() || "0",
      change: analytics?.pending_verifications ? "Action Required" : "Clean",
      icon: <CheckSquare size={18} />,
      positive: (analytics?.pending_verifications || 0) === 0
    }
  ];

  // Chart data fallbacks (will be replaced by real data if available)
  const chartRevenueData = analytics?.revenue_history || [
    { name: "Jan", total: 0, trend: 0 },
    { name: "Feb", total: 0, trend: 0 },
    { name: "Mar", total: 0, trend: 0 },
    { name: "Apr", total: 0, trend: 0 },
    { name: "May", total: 0, trend: 0 },
    { name: "Jun", total: 0, trend: 0 },
    { name: "Jul", total: 0, trend: 0 },
  ];

  const chartUserActivityData = analytics?.user_activity || [
    { name: "Mon", active: 0, new: 0 },
    { name: "Tue", active: 0, new: 0 },
    { name: "Wed", active: 0, new: 0 },
    { name: "Thu", active: 0, new: 0 },
    { name: "Fri", active: 0, new: 0 },
    { name: "Sat", active: 0, new: 0 },
    { name: "Sun", active: 0, new: 0 },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 md:space-y-10 pb-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-slate-400 uppercase mt-1 md:mt-2">
            Platform Analytics & System Metrics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <KpiCard 
            key={idx}
            title={kpi.title} 
            value={kpi.value} 
            change={kpi.change} 
            icon={kpi.icon} 
            positive={kpi.positive}
            index={idx}
          />
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Revenue Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-900/10 group-hover:bg-slate-900 transition-colors" />
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Revenue Performance</h3>
              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Growth analytics over last 6 months</p>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <TrendingUp size={16} className="text-slate-400" />
            </div>
          </div>
          <div className="h-[250px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartRevenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  fontSize={9} 
                  tickMargin={10} 
                  tick={{ fill: '#94A3B8', fontWeight: 700 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  fontSize={9} 
                  tickFormatter={(value) => `$${value}`} 
                  tick={{ fill: '#94A3B8', fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '10px', 
                    border: '1px solid #F1F5F9', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#0F172A" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Activity Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-900/10 group-hover:bg-slate-900 transition-colors" />
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Engagement Flow</h3>
              <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Weekly registration metrics</p>
            </div>
          </div>
          <div className="h-[250px] md:h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartUserActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  fontSize={9} 
                  tickMargin={10} 
                  tick={{ fill: '#94A3B8', fontWeight: 700 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  fontSize={9} 
                  tick={{ fill: '#94A3B8', fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ 
                    borderRadius: '10px', 
                    border: '1px solid #F1F5F9', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}
                />
                <Bar dataKey="active" fill="#0F172A" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="new" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function KpiCard({ title, value, change, icon, positive, index }: { title: string, value: string, change: string, icon: React.ReactNode, positive: boolean, index: number }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4 md:p-6 flex flex-col justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 relative group"
    >
      <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-800/50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between space-y-0 pb-3 md:pb-6 relative z-10">
        <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <div className="p-1.5 md:p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg md:rounded-xl text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1 truncate">{value}</div>
        <div className="flex items-center gap-2 flex-wrap">
          {positive ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800/50 rounded-md shrink-0">
              <ArrowUpRight size={10} className="text-slate-600 dark:text-slate-400" />
              <span className="text-[8px] md:text-[9px] font-black text-slate-600 dark:text-slate-400">{change}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md shrink-0">
              <span className="text-[8px] md:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{change}</span>
            </div>
          )}
          <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">MTD</span>
        </div>
      </div>
    </motion.div>
  );
}
