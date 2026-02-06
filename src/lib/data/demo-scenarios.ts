export const DEMO_STEPS = [
    {
        id: "scenario",
        title: "데모 시나리오 선택",
        description: "실제 업무 상황을 기반으로 한 데모 시나리오를 선택하세요"
    },
    {
        id: "assessment",
        title: "AI 서비스 위험성 평가",
        description: "고영향 AI 판별 및 규제 준수 체크"
    },
    {
        id: "technical",
        title: "기술 검증 실행",
        description: "편향성 분석, XAI, Red Teaming 수행"
    },
    {
        id: "monitoring",
        title: "실시간 모니터링",
        description: "운영 중 위험 탐지 및 자동 대응"
    },
    {
        id: "dashboard",
        title: "통합 대시보드",
        description: "전사 AI 위험 현황 종합 분석"
    }
];

export const DEMO_SCENARIOS = [
    {
        id: "energy_supply_solar",
        title: "태양광 발전 예측 AI",
        description: "스마트 그리드의 태양광 발전량 예측 시스템",
        category: "고영향 AI",
        riskLevel: "HIGH",
        icon: "☀️",
        details: {
            purpose: "일사량, 기상 데이터 기반 태양광 발전량 예측",
            dataTypes: ["기상 데이터", "일사량 정보", "발전 이력"],
            regulations: ["전기사업법", "신에너지법", "AI기본법"],
            stakeholders: ["전력거래소", "발전사업자", "전력소비자"]
        }
    },
    {
        id: "energy_supply_ess",
        title: "ESS 에너지 저장 관리 AI",
        description: "에너지 저장 시스템의 충방전 최적화 시스템",
        category: "고영향 AI",
        riskLevel: "HIGH",
        icon: "🔋",
        details: {
            purpose: "ESS 충전 상태, 전력 수급 기반 최적 충방전 전략 수립",
            dataTypes: ["배터리 상태", "전력 수급 데이터", "전력 가격"],
            regulations: ["전기사업법", "신에너지법", "AI기본법"],
            stakeholders: ["ESS 운영자", "전력거래소", "전력소비자"]
        }
    },
    {
        id: "energy_demand_hvac",
        title: "스마트 공조 제어 AI",
        description: "빌딩 내 공조 시스템의 에너지 효율 최적화",
        category: "일반 AI",
        riskLevel: "MEDIUM",
        icon: "🌡️",
        details: {
            purpose: "실내 온도, 습도, 재실자 수 기반 공조 자동 제어",
            dataTypes: ["온도 센서", "습도 센서", "재실자 감지"],
            regulations: ["에너지이용합리화법", "건축물 에너지효율등급 인증제"],
            stakeholders: ["빌딩 관리자", "재실자", "에너지공단"]
        }
    },
    {
        id: "energy_user_behavior",
        title: "사용자 에너지 행동 분석 AI",
        description: "개인 에너지 사용 패턴 분석 및 맞춤형 피드백 시스템",
        category: "고영향 AI",
        riskLevel: "HIGH",
        icon: "📈",
        details: {
            purpose: "개인 에너지 사용 패턴, 생활 패턴 분석을 통한 맞춤형 절약 방안 제시",
            dataTypes: ["전력 사용량", "생활 패턴", "기기 사용 데이터"],
            regulations: ["개인정보보호법", "에너지이용합리화법", "AI기본법"],
            stakeholders: ["에너지 소비자", "전력회사", "에너지공단"]
        }
    },
    {
        id: "energy_consulting",
        title: "에너지 컨설팅 추천 AI",
        description: "사용자 데이터 기반 맞춤형 에너지 컨설팅 서비스",
        category: "고영향 AI",
        riskLevel: "HIGH",
        icon: "📊",
        details: {
            purpose: "사용자의 에너지 사용 패턴과 선호도를 분석하여 개인화된 에너지 컨설팅 제공",
            dataTypes: ["에너지 사용 이력", "사용자 선호도", "건물 정보"],
            regulations: ["개인정보보호법", "에너지이용합리화법", "AI기본법"],
            stakeholders: ["에너지 소비자", "에너지 컨설팅 업체", "에너지공단"]
        }
    },
    {
        id: "energy_demand_supply_matching",
        title: "수요-공급 최적 매칭 AI",
        description: "실시간 에너지 수요와 공급을 최적으로 매칭하는 시스템",
        category: "고영향 AI",
        riskLevel: "CRITICAL",
        icon: "⚖️",
        details: {
            purpose: "실시간 에너지 수요 예측과 공급 예측을 기반으로 최적 매칭 전략 수립",
            dataTypes: ["수요 예측 데이터", "공급 예측 데이터", "전력 가격", "날씨 정보"],
            regulations: ["전기사업법", "에너지이용합리화법", "AI기본법"],
            stakeholders: ["전력거래소", "발전사업자", "전력소비자", "에너지공단"]
        }
    }
];
