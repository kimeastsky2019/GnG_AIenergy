import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  ShieldAlert,
  LayoutDashboard,
  FileCheck,
  ShieldCheck,
  Activity,
  Scale,
  Menu,
  X,
  ChevronRight,
  Bell,
  Home,
  Search,
  User,
  Settings,
  Database,
  Brain
} from "lucide-react";
import { ROUTE_PATHS, cn } from "@/lib/index";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  description?: string;
}

const mainNavItems: NavItem[] = [
  { name: "홈", path: ROUTE_PATHS.HOME, icon: Home, description: "시스템 개요 및 아키텍처" },
  { name: "통합 대시보드", path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard, description: "전사 AI 위험 커맨드 센터" },
  { name: "위험성 평가", path: ROUTE_PATHS.ASSESSMENT, icon: FileCheck, description: "고영향 AI 판별 및 법률 검토" },
  { name: "기술 검증", path: ROUTE_PATHS.TECHNICAL_VALIDATION, icon: ShieldCheck, description: "데이터 편향 및 XAI 분석" },
  { name: "실시간 모니터링", path: ROUTE_PATHS.MONITORING, icon: Activity, description: "모델 드리프트 및 이상 탐지" },
  { name: "규제 준수 현황", path: ROUTE_PATHS.COMPLIANCE, icon: Scale, description: "글로벌 AI 규제 대응 현황" },
  { name: "sLLM 자동화", path: ROUTE_PATHS.SLLM_AUTOMATION, icon: Brain, description: "소형 언어모델 기반 AI 평가 자동화" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* --- Top Header --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-accent rounded-md text-muted-foreground"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="text-primary-foreground" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight">AI SENTINEL</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Governance Orchestrator</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden md:flex items-center bg-muted/50 border border-border px-3 py-1.5 rounded-full w-64 focus-within:ring-1 ring-primary transition-all">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="AI 서비스 검색..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/60"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:bg-accent rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <div className="h-8 w-[1px] bg-border mx-1"></div>
            <button className="flex items-center gap-2 p-1 pl-1 pr-3 hover:bg-accent rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                AD
              </div>
              <span className="hidden sm:inline text-sm font-medium">관리자</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* --- Sidebar (Desktop) --- */}
        <aside 
          className={cn(
            "hidden lg:flex flex-col fixed left-0 top-16 bottom-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-40",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto px-3">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )
                }
              >
                <item.icon size={20} className={cn("shrink-0", isSidebarOpen ? "" : "mx-auto")} />
                {isSidebarOpen && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold truncate">{item.name}</span>
                    <span className="text-[10px] opacity-70 truncate">{item.description}</span>
                  </div>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-border">
                    {item.name}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          <div className="p-4 border-t border-sidebar-border">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
            >
              <ChevronRight size={18} className={cn("transition-transform", isSidebarOpen ? "rotate-180" : "")} />
            </button>
          </div>
        </aside>

        {/* --- Mobile Sidebar Overlay --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55] lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[280px] bg-sidebar z-[60] lg:hidden border-r border-sidebar-border shadow-2xl p-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <ShieldAlert className="text-primary-foreground" size={20} />
                    </div>
                    <span className="font-bold">AI SENTINEL</span>
                  </Link>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-accent rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                          isActive 
                            ? "bg-primary text-primary-foreground shadow-lg" 
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )
                      }
                    >
                      <item.icon size={22} />
                      <span className="font-medium">{item.name}</span>
                    </NavLink>
                  ))}
                </nav>

                <div className="absolute bottom-8 left-6 right-6">
                   <div className="bg-accent/50 p-4 rounded-2xl border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          AD
                        </div>
                        <div>
                          <p className="text-sm font-bold">홍길동 팀장</p>
                          <p className="text-xs text-muted-foreground">거버넌스 전략팀</p>
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium hover:bg-accent rounded-lg transition-colors">
                        <Settings size={14} /> 설정 및 로그아웃
                      </button>
                   </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* --- Main Content --- */}
        <main 
          className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
          )}
        >
          <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>

          {/* --- Footer --- */}
          <footer className="mt-auto py-8 px-4 lg:px-8 border-t border-border bg-muted/30">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 items-center md:items-start">
                <p className="text-sm text-muted-foreground font-medium">
                  © 2026 AI Sentinel Risk Management System. All rights reserved.
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  이 시스템은 AI 기본법 및 금융 소비자 보호 가이드라인을 준수합니다.
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">서비스 약관</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">개인정보처리방침</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">시스템 가이드</a>
                <div className="flex items-center gap-2 px-3 py-1 bg-chart-3/10 text-chart-3 rounded-full border border-chart-3/20">
                  <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">System Healthy</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
