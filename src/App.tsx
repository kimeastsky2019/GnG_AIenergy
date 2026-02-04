import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib";

import Home from "@/pages/Home";
import Demo from "@/pages/Demo";
import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import TechnicalValidation from "@/pages/TechnicalValidation";
import Monitoring from "@/pages/Monitoring";
import Compliance from "@/pages/Compliance";
import SLLMAutomation from "@/pages/SLLMAutomation";
import ServiceDetail from "@/pages/ServiceDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

/**
 * AI 위험 관리 솔루션 (AI Governance Orchestrator) App Entry Point
 * © 2026 AI Risk Management Solution. All rights reserved.
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" expand={false} richColors />
        <HashRouter>
          <Routes>
            {/* 랜딩 페이지 */}
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            
            {/* 인터랙티브 데모 페이지 */}
            <Route path={ROUTE_PATHS.DEMO} element={<Demo />} />
            
            {/* 통합 위험 대시보드 (Risk Command Center) */}
            <Route path={ROUTE_PATHS.DASHBOARD} element={<Dashboard />} />
            
            {/* AI 서비스 위험성 평가서 (고영향 AI 판별 마법사) */}
            <Route path={ROUTE_PATHS.ASSESSMENT} element={<Assessment />} />
            
            {/* 기술 검증 보고서 (Bias Map, XAI Heatmap) */}
            <Route 
              path={ROUTE_PATHS.TECHNICAL_VALIDATION} 
              element={<TechnicalValidation />} 
            />
            
            {/* 실시간 모니터링 및 성능 저하 탐지 */}
            <Route path={ROUTE_PATHS.MONITORING} element={<Monitoring />} />
            
            {/* 규제 준수 및 가이드라인 관리 */}
            <Route path={ROUTE_PATHS.COMPLIANCE} element={<Compliance />} />
            
            {/* sLLM 자동화 시스템 */}
            <Route path={ROUTE_PATHS.SLLM_AUTOMATION} element={<SLLMAutomation />} />
            
            {/* 개별 서비스 상세 분석 */}
            <Route path={ROUTE_PATHS.SERVICE_DETAIL} element={<ServiceDetail />} />
            
            {/* Catch-all: 잘못된 경로 접근 시 홈으로 리다이렉트 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
