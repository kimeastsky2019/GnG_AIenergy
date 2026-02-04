export const ROUTE_PATHS = {
  HOME: "/",
  DEMO: "/demo",
  DASHBOARD: "/dashboard",
  ASSESSMENT: "/assessment",
  TECHNICAL_VALIDATION: "/technical-validation",
  MONITORING: "/monitoring",
  COMPLIANCE: "/compliance",
  SLLM_AUTOMATION: "/sllm-automation",
  SERVICE_DETAIL: "/service/:id",
} as const;

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ServiceStatus = "PLANNING" | "DEVELOPING" | "OPERATING" | "EMERGENCY_STOP";

export const RISK_LEVELS = {
  LOW: {
    label: "risk.low",
    color: "oklch(0.72 0.15 150)",
    bg: "oklch(0.72 0.15 150 / 0.1)",
    status: "success",
  },
  MEDIUM: {
    label: "risk.medium",
    color: "oklch(0.82 0.14 75)",
    bg: "oklch(0.82 0.14 75 / 0.1)",
    status: "warning",
  },
  HIGH: {
    label: "risk.high",
    color: "oklch(0.68 0.18 35)",
    bg: "oklch(0.68 0.18 35 / 0.1)",
    status: "destructive",
  },
  CRITICAL: {
    label: "risk.critical",
    color: "oklch(0.55 0.18 25)",
    bg: "oklch(0.55 0.18 25 / 0.1)",
    status: "destructive",
  },
} as const;

export const AI_CATEGORIES = [
  { id: "energy_supply_solar", label: "에너지 공급 (태양광 예측)", isHighImpact: true },
  { id: "energy_supply_ess", label: "에너지 저장 (ESS 관리)", isHighImpact: true },
  { id: "energy_demand_equipment", label: "에너지 수요 (기기 제어)", isHighImpact: true },
  { id: "energy_demand_standby", label: "에너지 수요 (항시대기 최적화)", isHighImpact: false },
  { id: "energy_demand_hvac", label: "에너지 수요 (공조 시스템)", isHighImpact: false },
  { id: "energy_grid_balance", label: "그리드 밸런싱 (수급 균형)", isHighImpact: true },
] as const;

export interface AIService {
  id: string;
  name: string;
  category: string;
  description: string;
  riskLevel: RiskLevel;
  status: ServiceStatus;
  complianceRate: number;
  lastUpdated: string;
  owner: string;
}

export interface RiskAssessment {
  id: string;
  serviceId: string;
  isHighImpact: boolean;
  assessmentDate: string;
  complianceScore: number;
  automaticNotice: string;
  checklist: {
    id: string;
    requirement: string;
    isMet: boolean;
    lawReference: string;
  }[];
}

export interface TechnicalValidation {
  id: string;
  serviceId: string;
  validationDate: string;
  biasMetrics: {
    group: string;
    biasScore: number;
  }[];
  xaiHeatmap: {
    feature: string;
    impact: number;
  }[];
  redTeamingLog: {
    scenario: string;
    status: "PASSED" | "FAILED";
    details: string;
  }[];
  securityScore: number;
  explainabilityScore: number;
}

export function getRiskLevelInfo(level: RiskLevel) {
  return RISK_LEVELS[level];
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
