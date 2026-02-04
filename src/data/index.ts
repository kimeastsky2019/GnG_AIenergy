import { AIService, RiskAssessment, TechnicalValidation } from "../lib/index";

export const mockAIServices: AIService[] = [
  {
    id: "svc-001",
    name: "data.svc_001_name",
    category: "finance_loan",
    description: "data.svc_001_desc",
    riskLevel: "HIGH",
    status: "OPERATING",
    complianceRate: 92,
    lastUpdated: "2026-01-25T14:30:00Z",
    owner: "data.svc_001_owner"
  },
  {
    id: "svc-002",
    name: "data.svc_002_name",
    category: "hr_recruitment",
    description: "data.svc_002_desc",
    riskLevel: "MEDIUM",
    status: "DEVELOPING",
    complianceRate: 78,
    lastUpdated: "2026-01-29T10:15:00Z",
    owner: "data.svc_002_owner"
  },
  {
    id: "svc-003",
    name: "data.svc_003_name",
    category: "customer_service",
    description: "data.svc_003_desc",
    riskLevel: "LOW",
    status: "OPERATING",
    complianceRate: 98,
    lastUpdated: "2026-01-30T09:00:00Z",
    owner: "data.svc_003_owner"
  },
  {
    id: "svc-004",
    name: "data.svc_004_name",
    category: "medical_diag",
    description: "data.svc_004_desc",
    riskLevel: "CRITICAL",
    status: "PLANNING",
    complianceRate: 45,
    lastUpdated: "2026-01-28T16:45:00Z",
    owner: "data.svc_004_owner"
  },
  {
    id: "svc-005",
    name: "data.svc_005_name",
    category: "logistics_opt",
    description: "data.svc_005_desc",
    riskLevel: "LOW",
    status: "EMERGENCY_STOP",
    complianceRate: 85,
    lastUpdated: "2026-01-30T22:10:00Z",
    owner: "data.svc_005_owner"
  }
];

export const mockRiskAssessments: RiskAssessment[] = [
  {
    id: "ra-001",
    serviceId: "svc-001",
    isHighImpact: true,
    assessmentDate: "2026-01-20T11:00:00Z",
    complianceScore: 92,
    automaticNotice: "data.ra_001_notice",
    checklist: [
      { id: "chk-1", requirement: "data.chk_1_req", isMet: true, lawReference: "AI기본법 제12조" },
      { id: "chk-2", requirement: "data.chk_2_req", isMet: true, lawReference: "개인정보보호법 제33조" },
      { id: "chk-3", requirement: "data.chk_3_req", isMet: true, lawReference: "소비자보호법 제15조" },
      { id: "chk-4", requirement: "data.chk_4_req", isMet: false, lawReference: "EU AI Act Art.14" }
    ]
  }
];

export const mockTechnicalValidations: TechnicalValidation[] = [
  {
    id: "tv-001",
    serviceId: "svc-001",
    validationDate: "2026-01-24T15:00:00Z",
    biasMetrics: [
      { group: "data.group_gender", biasScore: 0.02 },
      { group: "data.group_age", biasScore: 0.15 },
      { group: "data.group_region", biasScore: 0.05 },
      { group: "data.group_job", biasScore: 0.21 }
    ],
    xaiHeatmap: [
      { feature: "data.feat_income", impact: 0.45 },
      { feature: "data.feat_credit", impact: 0.38 },
      { feature: "data.feat_loans", impact: 0.12 },
      { feature: "data.feat_housing", impact: 0.05 }
    ],
    redTeamingLog: [
      { scenario: "data.rt_scen_adv", status: "PASSED", details: "data.rt_det_adv" },
      { scenario: "data.rt_scen_ext", status: "PASSED", details: "data.rt_det_ext" },
      { scenario: "data.rt_scen_poi", status: "FAILED", details: "data.rt_det_poi" }
    ],
    securityScore: 88,
    explainabilityScore: 94
  }
];

export const complianceData = [
  {
    lawName: "data.law_kr",
    complianceRate: 85,
    trend: "UP",
    mandatoryCount: 12,
    completedCount: 10
  },
  {
    lawName: "data.law_eu",
    complianceRate: 62,
    trend: "STABLE",
    mandatoryCount: 24,
    completedCount: 15
  },
  {
    lawName: "data.law_fin",
    complianceRate: 95,
    trend: "UP",
    mandatoryCount: 8,
    completedCount: 8
  },
  {
    lawName: "data.law_priv",
    complianceRate: 100,
    trend: "STABLE",
    mandatoryCount: 15,
    completedCount: 15
  }
];
