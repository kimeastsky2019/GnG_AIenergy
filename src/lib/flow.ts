/**
 * AI 서비스 거버넌스 플로우 단계 정의
 * flowchart 기준: 요청서 → 프로젝트 생성 → 기획서 → 모델설명서 → 사전검토 요청 → 평가 → 사전검토 결과
 * → 개발계획 → 위험관리 계획 → (위험등급 분기) → 승인 → 개발 의뢰 → 개발 진행 → 운영 전 검증
 * → (위험등급 분기) → 검증/제3자 검증 → 운영 승인 요청 → 배포 승인 → 배포 → 대시보드 → 개선 관리
 */

export const FLOW_STEP_IDS = [
  "request-form",
  //   "project-create",
  //   "planning-doc",
  //   "model-doc",
  "pre-review-request",
  "risk-assessment",
  //   "pre-review-result",
  "dev-plan",
  "risk-plan",
  "risk-level-judge",
  "risk-plan-approval",
  "governance-approval",
  "dev-request",
  "dev-progress",
  "pre-op-verification",
  "verification-branch",
  "verification-adequacy",
  "third-party-verification",
  "op-approval-request",
  "deployment-approval",
  "deployment",
  "dashboard",
  "improvement",
] as const;

export type FlowStepId = (typeof FLOW_STEP_IDS)[number];

export interface FlowStepBranch {
  key: string;
  path: string;
  labelKey: string;
}

export interface FlowStepDef {
  id: FlowStepId;
  path: string;
  titleKey: string;
  descriptionKey: string;
  /** 다음 단계 path (단일). 분기 단계면 nextBranch 사용 */
  nextPath?: string;
  /** 분기 선택지 (위험등급 판단 등) */
  nextBranch?: FlowStepBranch[];
  /** 이전 단계 path (선형일 때) */
  prevPath?: string;
  /** 분기 단계에서만: 이 단계로 올 수 있는 이전 path들 */
  prevPaths?: string[];
}

export const FLOW_STEPS: Record<string, FlowStepDef> = {
  "request-form": {
    id: "request-form",
    path: "/flow/request-form",
    titleKey: "flow.request_form.title",
    descriptionKey: "flow.request_form.description",
    nextPath: "/flow/pre-review-request",
    prevPath: "/",
  },
  //   "project-create": {
  //     id: "project-create",
  //     path: "/flow/project-create",
  //     titleKey: "flow.project_create.title",
  //     descriptionKey: "flow.project_create.description",
  //     nextPath: "/flow/planning-doc",
  //     prevPath: "/flow/request-form",
  //   },
  //   "planning-doc": {
  //     id: "planning-doc",
  //     path: "/flow/planning-doc",
  //     titleKey: "flow.planning_doc.title",
  //     descriptionKey: "flow.planning_doc.description",
  //     nextPath: "/flow/model-doc",
  //     prevPath: "/flow/project-create",
  //   },
  //   "model-doc": {
  //     id: "model-doc",
  //     path: "/flow/model-doc",
  //     titleKey: "flow.model_doc.title",
  //     descriptionKey: "flow.model_doc.description",
  //     nextPath: "/flow/pre-review-request",
  //     prevPath: "/flow/planning-doc",
  //   },
  "pre-review-request": {
    id: "pre-review-request",
    path: "/flow/pre-review-request",
    titleKey: "flow.pre_review_request.title",
    descriptionKey: "flow.pre_review_request.description",
    nextPath: "/flow/risk-assessment",
    prevPath: "/flow/request-form",
  },
  //   "pre-review-result": {
  //     id: "pre-review-result",
  //     path: "/flow/pre-review-result",
  //     titleKey: "flow.pre_review_result.title",
  //     descriptionKey: "flow.pre_review_result.description",
  //     nextBranch: [
  //       { key: "revision", path: "/flow/planning-doc", labelKey: "flow.revision_return" },
  //       { key: "approved", path: "/flow/risk-assessment", labelKey: "flow.pre_review_approved_btn" },
  //     ],
  //     prevPath: "/flow/pre-review-request",
  //   },
  "risk-assessment": {
    id: "risk-assessment",
    path: "/flow/risk-assessment",
    titleKey: "flow.risk_assessment.title",
    descriptionKey: "flow.risk_assessment.description",
    nextPath: "/flow/dev-plan",
    prevPath: "/flow/pre-review-request",
  },
  "dev-plan": {
    id: "dev-plan",
    path: "/flow/dev-plan",
    titleKey: "flow.dev_plan.title",
    descriptionKey: "flow.dev_plan.description",
    nextPath: "/flow/risk-plan",
    prevPath: "/flow/risk-assessment",
  },
  "risk-plan": {
    id: "risk-plan",
    path: "/flow/risk-plan",
    titleKey: "flow.risk_plan.title",
    descriptionKey: "flow.risk_plan.description",
    nextPath: "/flow/risk-level-judge",
    prevPath: "/flow/dev-plan",
  },
  "risk-level-judge": {
    id: "risk-level-judge",
    path: "/flow/risk-level-judge",
    titleKey: "flow.risk_level_judge.title",
    descriptionKey: "flow.risk_level_judge.description",
    nextBranch: [
      { key: "low_medium", path: "/flow/risk-plan-approval", labelKey: "flow.risk_level.low_medium" },
      { key: "high", path: "/flow/governance-approval", labelKey: "flow.risk_level.high" },
    ],
    prevPath: "/flow/risk-plan",
  },
  "risk-plan-approval": {
    id: "risk-plan-approval",
    path: "/flow/risk-plan-approval",
    titleKey: "flow.risk_plan_approval.title",
    descriptionKey: "flow.risk_plan_approval.description",
    nextPath: "/flow/dev-request",
    prevPath: "/flow/risk-level-judge",
  },
  "governance-approval": {
    id: "governance-approval",
    path: "/flow/governance-approval",
    titleKey: "flow.governance_approval.title",
    descriptionKey: "flow.governance_approval.description",
    nextPath: "/flow/dev-request",
    prevPath: "/flow/risk-level-judge",
  },
  "dev-request": {
    id: "dev-request",
    path: "/flow/dev-request",
    titleKey: "flow.dev_request.title",
    descriptionKey: "flow.dev_request.description",
    nextPath: "/flow/dev-progress",
    prevPaths: ["/flow/risk-plan-approval", "/flow/governance-approval"],
  },
  "dev-progress": {
    id: "dev-progress",
    path: "/flow/dev-progress",
    titleKey: "flow.dev_progress.title",
    descriptionKey: "flow.dev_progress.description",
    nextPath: "/flow/pre-op-verification",
    prevPath: "/flow/dev-request",
  },
  "pre-op-verification": {
    id: "pre-op-verification",
    path: "/flow/pre-op-verification",
    titleKey: "flow.pre_op_verification.title",
    descriptionKey: "flow.pre_op_verification.description",
    nextPath: "/flow/verification-branch",
    prevPath: "/flow/dev-progress",
  },
  "verification-branch": {
    id: "verification-branch",
    path: "/flow/verification-branch",
    titleKey: "flow.verification_branch.title",
    descriptionKey: "flow.verification_branch.description",
    nextBranch: [
      { key: "medium", path: "/flow/verification-adequacy", labelKey: "flow.risk_level.medium" },
      { key: "high", path: "/flow/third-party-verification", labelKey: "flow.risk_level.high" },
    ],
    prevPath: "/flow/pre-op-verification",
  },
  "verification-adequacy": {
    id: "verification-adequacy",
    path: "/flow/verification-adequacy",
    titleKey: "flow.verification_adequacy.title",
    descriptionKey: "flow.verification_adequacy.description",
    nextPath: "/flow/op-approval-request",
    prevPath: "/flow/verification-branch",
  },
  "third-party-verification": {
    id: "third-party-verification",
    path: "/flow/third-party-verification",
    titleKey: "flow.third_party_verification.title",
    descriptionKey: "flow.third_party_verification.description",
    nextPath: "/flow/op-approval-request",
    prevPath: "/flow/verification-branch",
  },
  "op-approval-request": {
    id: "op-approval-request",
    path: "/flow/op-approval-request",
    titleKey: "flow.op_approval_request.title",
    descriptionKey: "flow.op_approval_request.description",
    nextPath: "/flow/deployment-approval",
    prevPaths: ["/flow/verification-adequacy", "/flow/third-party-verification"],
  },
  "deployment-approval": {
    id: "deployment-approval",
    path: "/flow/deployment-approval",
    titleKey: "flow.deployment_approval.title",
    descriptionKey: "flow.deployment_approval.description",
    nextPath: "/flow/deployment",
    prevPath: "/flow/op-approval-request",
  },
  "deployment": {
    id: "deployment",
    path: "/flow/deployment",
    titleKey: "flow.deployment.title",
    descriptionKey: "flow.deployment.description",
    nextPath: "/dashboard",
    prevPath: "/flow/deployment-approval",
  },
  "dashboard": {
    id: "dashboard",
    path: "/dashboard",
    titleKey: "flow.dashboard.title",
    descriptionKey: "flow.dashboard.description",
    nextPath: undefined,
    prevPath: "/flow/deployment",
  },
  "improvement": {
    id: "improvement",
    path: "/flow/improvement",
    titleKey: "flow.improvement.title",
    descriptionKey: "flow.improvement.description",
    nextPath: "/dashboard",
    prevPath: "/dashboard",
  },
};

/** path로 step 정의 찾기 */
export function getFlowStepByPath(path: string): FlowStepDef | undefined {
  return Object.values(FLOW_STEPS).find((s) => s.path === path || path.startsWith(s.path + "/"));
}

/** stepId로 step 정의 찾기 */
export function getFlowStepById(stepId: string): FlowStepDef | undefined {
  return FLOW_STEPS[stepId];
}

/** 이전 단계 path 계산 (분기 합류 지점 고려) */
export function getPrevPath(step: FlowStepDef): string | undefined {
  if (step.prevPath) return step.prevPath;
  if (step.prevPaths && step.prevPaths.length) return step.prevPaths[0];
  return undefined;
}
