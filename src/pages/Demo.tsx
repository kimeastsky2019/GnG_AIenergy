import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Shield, 
  FileCheck, 
  Activity, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  Eye,
  Zap
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskStatusCard, MetricCard } from "@/components/Cards";
import { RiskTrendChart, BiasHeatmap, PerformanceChart } from "@/components/Charts";
import { IMAGES } from "@/assets/images";
import { springPresets, fadeInUp } from "@/lib/motion";

const DEMO_STEPS = [
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

const DEMO_SCENARIOS = [
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
    title: "에너지 컴설팅 추천 AI",
    description: "사용자 데이터 기반 맞춤형 에너지 컴설팅 서비스",
    category: "고영향 AI",
    riskLevel: "HIGH",
    icon: "📊",
    details: {
      purpose: "사용자의 에너지 사용 패턴과 선호도를 분석하여 개인화된 에너지 컴설팅 제공",
      dataTypes: ["에너지 사용 이력", "사용자 선호도", "건물 정보"],
      regulations: ["개인정보보호법", "에너지이용합리화법", "AI기본법"],
      stakeholders: ["에너지 소비자", "에너지 컴설팅 업체", "에너지공단"]
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

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentStep(1);
    setCompletedSteps(["scenario"]);
  };

  const handleNextStep = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      setIsProcessing(true);
      setTimeout(() => {
        setCompletedSteps([...completedSteps, DEMO_STEPS[currentStep].id]);
        setCurrentStep(currentStep + 1);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedScenarioData = DEMO_SCENARIOS.find(s => s.id === selectedScenario);

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Play className="w-4 h-4" />
                <span>인터랙티브 데모</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI 거버넌스 오케스트레이터 <span className="text-primary">체험하기</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                실제 업무 시나리오를 통해 AI 위험 관리 솔루션의 핵심 기능을 직접 체험해보세요.
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {DEMO_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      completedSteps.includes(step.id) 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : currentStep === index
                        ? "border-primary text-primary bg-primary/10"
                        : "border-muted text-muted-foreground"
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-center mt-2 max-w-24">
                      <div className="text-xs font-medium">{step.title}</div>
                    </div>
                  </div>
                  {index < DEMO_STEPS.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-all ${
                      completedSteps.includes(step.id) ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Content */}
        <section className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {/* Step 0: Scenario Selection */}
              {currentStep === 0 && (
                <motion.div
                  key="scenario"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springPresets.gentle}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">데모 시나리오를 선택하세요</h2>
                    <p className="text-muted-foreground">
                      실제 기업에서 사용하는 AI 서비스 유형을 선택하여 맞춤형 데모를 체험하세요.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {DEMO_SCENARIOS.map((scenario) => (
                      <motion.div
                        key={scenario.id}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => handleScenarioSelect(scenario.id)}
                      >
                        <Card className="h-full border-2 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl">
                          <CardHeader className="text-center pb-4">
                            <div className="text-4xl mb-4">{scenario.icon}</div>
                            <CardTitle className="text-xl mb-2">{scenario.title}</CardTitle>
                            <Badge variant={scenario.riskLevel === "HIGH" ? "destructive" : "secondary"}>
                              {scenario.category}
                            </Badge>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {scenario.description}
                            </p>
                            <div className="space-y-3">
                              <div>
                                <div className="text-xs font-semibold text-muted-foreground mb-1">목적</div>
                                <div className="text-sm">{scenario.details.purpose}</div>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-muted-foreground mb-1">관련 규제</div>
                                <div className="flex flex-wrap gap-1">
                                  {scenario.details.regulations.map((reg) => (
                                    <Badge key={reg} variant="outline" className="text-xs">
                                      {reg}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Button className="w-full mt-6">
                              이 시나리오로 시작하기 <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Risk Assessment */}
              {currentStep === 1 && selectedScenarioData && (
                <motion.div
                  key="assessment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springPresets.gentle}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">AI 서비스 위험성 평가</h2>
                    <p className="text-muted-foreground">
                      선택하신 <strong>{selectedScenarioData.title}</strong>에 대한 위험성 평가를 진행합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-primary" />
                            고영향 AI 판별 결과
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                            <div>
                              <div className="font-semibold text-destructive">고영향 AI로 분류됨</div>
                              <div className="text-sm text-muted-foreground">
                                에너지 공급 안정성과 전력그리드에 중대한 영향을 미칠 수 있는 AI 시스템
                              </div>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="text-sm font-semibold">분류 근거:</div>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>전력그리드 안정성에 직접적 영향</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>에너지 공급 자동 제어 시스템</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>중요 인프라 운영 데이터 처리</span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>자동 생성된 고지 문구</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                            <div className="text-sm leading-relaxed">
                              "본 에너지 관리 시스템은 인공지능을 활용하여 {selectedScenarioData.details.purpose}을(를) 수행합니다. 
                              AI 시스템의 에너지 제어 결정에 대해 설명을 요구할 권리가 있으며, 
                              비상 상황 시 수동 제어로 전환할 수 있습니다. 
                              자세한 내용은 에너지 관리 시스템 이용약관을 참조하시기 바랍니다."
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>규제 준수 체크리스트</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {(() => {
                              if (selectedScenario === "energy_user_behavior") {
                                return [
                                  { law: "AI기본법", requirement: "고영향 AI 신고 의무", status: "pending" },
                                  { law: "개인정보보호법", requirement: "개인정보 수집·이용 동의", status: "completed" },
                                  { law: "개인정보보호법", requirement: "행동 분석 결과 통지", status: "pending" },
                                  { law: "에너지이용합리화법", requirement: "에너지 절약 권고 기준", status: "completed" },
                                ];
                              } else if (selectedScenario === "energy_consulting") {
                                return [
                                  { law: "AI기본법", requirement: "고영향 AI 신고 의무", status: "pending" },
                                  { law: "개인정보보호법", requirement: "개인정보 수집·이용 동의", status: "completed" },
                                  { law: "전자상거래법", requirement: "컴설팅 서비스 약관 고지", status: "completed" },
                                  { law: "에너지이용합리화법", requirement: "에너지 컴설팅 자격 기준", status: "pending" },
                                ];
                              } else if (selectedScenario === "energy_demand_supply_matching") {
                                return [
                                  { law: "AI기본법", requirement: "고영향 AI 신고 의무", status: "pending" },
                                  { law: "전기사업법", requirement: "전력거래 안전성 기준", status: "completed" },
                                  { law: "에너지이용합리화법", requirement: "수급 균형 유지 의무", status: "completed" },
                                  { law: "전기사업법", requirement: "전력시장 운영 규칙", status: "pending" },
                                ];
                              } else {
                                return [
                                  { law: "AI기본법", requirement: "고영향 AI 신고 의무", status: "pending" },
                                  { law: "전기사업법", requirement: "전력설비 안전기준 준수", status: "completed" },
                                  { law: "신에너지법", requirement: "신에너지 발전설비 신고", status: "completed" },
                                  { law: "에너지이용합리화법", requirement: "에너지 효율 기준 준수", status: "pending" },
                                ];
                              }
                            })().map((item, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                  <div className="font-medium text-sm">{item.requirement}</div>
                                  <div className="text-xs text-muted-foreground">{item.law}</div>
                                </div>
                                {item.status === "completed" ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Clock className="w-5 h-5 text-yellow-500" />
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm">
                              <AlertCircle className="w-4 h-4" />
                              조치 필요 사항
                            </div>
                            <div className="text-sm text-yellow-700 mt-1">
                              {(() => {
                                if (selectedScenario === "energy_user_behavior") {
                                  return "고영향 AI 신고 및 개인정보 행동 분석 결과 통지 방안 수립이 필요합니다.";
                                } else if (selectedScenario === "energy_consulting") {
                                  return "고영향 AI 신고 및 에너지 컴설팅 자격 기준 준수 방안 수립이 필요합니다.";
                                } else if (selectedScenario === "energy_demand_supply_matching") {
                                  return "고영향 AI 신고 및 전력시장 운영 규칙 준수 방안 수립이 필요합니다.";
                                } else {
                                  return "고영향 AI 신고 및 에너지이용합리화법 준수 방안 수립이 필요합니다.";
                                }
                              })()
                              }
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>위험도 평가 결과</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">전체 위험도</span>
                              <Badge variant="destructive">HIGH</Badge>
                            </div>
                            <Progress value={75} className="h-2" />
                            <div className="text-xs text-muted-foreground">
                              75/100 점 (즉시 조치 필요)
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-between mt-12">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전 단계
                    </Button>
                    <Button onClick={handleNextStep} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          기술 검증 준비 중...
                        </>
                      ) : (
                        <>
                          기술 검증 시작
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Technical Validation */}
              {currentStep === 2 && selectedScenarioData && (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springPresets.gentle}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">기술 검증 실행</h2>
                    <p className="text-muted-foreground">
                      AI 모델의 편향성, 설명가능성, 보안성을 종합적으로 분석합니다.
                    </p>
                  </div>

                  <Tabs defaultValue="bias" className="w-full">
                    <TabsList className={`grid w-full ${selectedScenario === "energy_user_behavior" || selectedScenario === "energy_consulting" ? "grid-cols-4" : "grid-cols-3"}`}>
                      <TabsTrigger value="bias">편향성 분석</TabsTrigger>
                      <TabsTrigger value="xai">설명가능성</TabsTrigger>
                      <TabsTrigger value="security">보안 검증</TabsTrigger>
                      {(selectedScenario === "energy_user_behavior" || selectedScenario === "energy_consulting") && (
                        <TabsTrigger value="feedback">사용자 피드백</TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="bias" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>Data Bias Map</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <BiasHeatmap data={(() => {
                              if (selectedScenario === "energy_user_behavior") {
                                return [
                                  { group: "연령대", biasScore: 0.18 },
                                  { group: "소득수준", biasScore: 0.15 },
                                  { group: "가구원수", biasScore: 0.12 },
                                  { group: "주거형태", biasScore: 0.09 },
                                  { group: "지역", biasScore: 0.07 }
                                ];
                              } else if (selectedScenario === "energy_consulting") {
                                return [
                                  { group: "소득수준", biasScore: 0.22 },
                                  { group: "연령대", biasScore: 0.16 },
                                  { group: "건물유형", biasScore: 0.13 },
                                  { group: "에너지 사용량", biasScore: 0.08 },
                                  { group: "지역", biasScore: 0.06 }
                                ];
                              } else if (selectedScenario === "energy_demand_supply_matching") {
                                return [
                                  { group: "지역별", biasScore: 0.20 },
                                  { group: "산업군", biasScore: 0.17 },
                                  { group: "시간대", biasScore: 0.14 },
                                  { group: "계절", biasScore: 0.10 },
                                  { group: "전력수요규모", biasScore: 0.08 }
                                ];
                              } else {
                                return [
                                  { group: "지역별", biasScore: 0.15 },
                                  { group: "시간대", biasScore: 0.12 },
                                  { group: "계절", biasScore: 0.08 },
                                  { group: "빌딩타입", biasScore: 0.06 },
                                  { group: "용량규모", biasScore: 0.04 }
                                ];
                              }
                            })()} />
                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="text-sm font-medium text-yellow-800 mb-2">발견된 편향성</div>
                              <ul className="text-sm text-yellow-700 space-y-1">
                                {(() => {
                                  if (selectedScenario === "energy_user_behavior") {
                                    return [
                                      <li key="1">• 연령대: 60대 이상 사용자 예측 정확도 18% 낮음</li>,
                                      <li key="2">• 소득수준: 고소득층 대비 저소득층 예측 오차 15% 높음</li>,
                                      <li key="3">• 가구원수: 1인 가구 대비 대가족 행동 예측 오차 12% 높음</li>
                                    ];
                                  } else if (selectedScenario === "energy_consulting") {
                                    return [
                                      <li key="1">• 소득수준: 고소득층 대비 저소득층 컴설팅 효과 22% 낮음</li>,
                                      <li key="2">• 연령대: 50대 이상 사용자 컴설팅 수용도 16% 낮음</li>,
                                      <li key="3">• 건물유형: 아파트 대비 단독주택 컴설팅 효과 13% 높음</li>
                                    ];
                                  } else if (selectedScenario === "energy_demand_supply_matching") {
                                    return [
                                      <li key="1">• 지역별: 수도권 vs 지방 수급 매칭 정확도 20% 격차</li>,
                                      <li key="2">• 산업군: 제조업 대비 서비스업 수요 예측 오차 17% 높음</li>,
                                      <li key="3">• 시간대: 피크시간 매칭 알고리즘 편향 14% 발생</li>
                                    ];
                                  } else {
                                    return [
                                      <li key="1">• 지역별: 수도권 vs 지방 예측 정확도 격차 15%</li>,
                                      <li key="2">• 시간대: 피크시간 예측 오차 12% 높음</li>,
                                      <li key="3">• 계절: 겨울철 대비 여름철 예측 오차 8% 높음</li>
                                    ];
                                  }
                                })()
                                }
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>편향성 완화 권고사항</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="p-3 border rounded-lg">
                                <div className="font-medium text-sm mb-1">데이터 재균형</div>
                                <div className="text-xs text-muted-foreground">
                                  지역별, 시간대별, 계절별 데이터 비율 조정 필요
                                </div>
                              </div>
                              <div className="p-3 border rounded-lg">
                                <div className="font-medium text-sm mb-1">공정성 제약 조건 추가</div>
                                <div className="text-xs text-muted-foreground">
                                  모델 학습 시 공정성 메트릭 최적화
                                </div>
                              </div>
                              <div className="p-3 border rounded-lg">
                                <div className="font-medium text-sm mb-1">후처리 보정</div>
                                <div className="text-xs text-muted-foreground">
                                  예측 결과에 대한 편향성 보정 알고리즘 적용
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="xai" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>XAI Heatmap (SHAP 분석)</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {(() => {
                                if (selectedScenario === "energy_user_behavior") {
                                  return [
                                    { feature: "과거사용량", impact: 0.38, color: "bg-red-500" },
                                    { feature: "생활패턴", impact: 0.25, color: "bg-orange-500" },
                                    { feature: "가전기기", impact: 0.18, color: "bg-yellow-500" },
                                    { feature: "주거형태", impact: 0.12, color: "bg-green-500" },
                                    { feature: "계절요인", impact: 0.07, color: "bg-blue-500" },
                                  ];
                                } else if (selectedScenario === "energy_consulting") {
                                  return [
                                    { feature: "에너지사용량", impact: 0.35, color: "bg-red-500" },
                                    { feature: "건물특성", impact: 0.28, color: "bg-orange-500" },
                                    { feature: "사용자선호", impact: 0.20, color: "bg-yellow-500" },
                                    { feature: "비용예산", impact: 0.12, color: "bg-green-500" },
                                    { feature: "지역특성", impact: 0.05, color: "bg-blue-500" },
                                  ];
                                } else if (selectedScenario === "energy_demand_supply_matching") {
                                  return [
                                    { feature: "수요예측", impact: 0.40, color: "bg-red-500" },
                                    { feature: "공급예측", impact: 0.32, color: "bg-orange-500" },
                                    { feature: "전력가격", impact: 0.15, color: "bg-yellow-500" },
                                    { feature: "날씨요인", impact: 0.08, color: "bg-green-500" },
                                    { feature: "시간대", impact: 0.05, color: "bg-blue-500" },
                                  ];
                                } else {
                                  return [
                                    { feature: "일사량", impact: 0.42, color: "bg-red-500" },
                                    { feature: "기온", impact: 0.28, color: "bg-orange-500" },
                                    { feature: "습도", impact: 0.15, color: "bg-yellow-500" },
                                    { feature: "풍속", impact: 0.10, color: "bg-green-500" },
                                    { feature: "구름량", impact: 0.05, color: "bg-blue-500" },
                                  ];
                                }
                              })().map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <div className="w-24 text-sm font-medium">{item.feature}</div>
                                  <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                                    <div 
                                      className={`h-full ${item.color} transition-all duration-1000`}
                                      style={{ width: `${item.impact * 100}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                                      {(item.impact * 100).toFixed(1)}%
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>설명가능성 점수</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-primary mb-2">78/100</div>
                              <div className="text-sm text-muted-foreground">전체 설명가능성 점수</div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>특성 중요도 명확성</span>
                                  <span>85/100</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>의사결정 경로 추적</span>
                                  <span>72/100</span>
                                </div>
                                <Progress value={72} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>반사실적 설명</span>
                                  <span>76/100</span>
                                </div>
                                <Progress value={76} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                          <CardHeader>
                            <CardTitle>Red Teaming 결과</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { scenario: "전력그리드 사이버 공격", status: "PASSED", details: "99.1% 방어 성공" },
                                { scenario: "센서 데이터 조작", status: "PASSED", details: "이상 데이터 탐지 성공" },
                                { scenario: "에너지 예측 모델 탈취", status: "FAILED", details: "API 호출 패턴 분석 취약" },
                                { scenario: "전력 사용량 추론 공격", status: "PASSED", details: "개인정보 유출 방지" },
                              ].map((test, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div>
                                    <div className="font-medium text-sm">{test.scenario}</div>
                                    <div className="text-xs text-muted-foreground">{test.details}</div>
                                  </div>
                                  <Badge variant={test.status === "PASSED" ? "default" : "destructive"}>
                                    {test.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>보안 취약점 스캔</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-2 text-red-800 font-medium text-sm mb-2">
                                <AlertCircle className="w-4 h-4" />
                                심각한 취약점 발견
                              </div>
                              <div className="text-sm text-red-700">
                                에너지 예측 API 응답 패턴을 통한 모델 구조 추론 가능
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">전력 사용량 데이터 노출</span>
                                <Badge variant="default">안전</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">그리드 연결 보안</span>
                                <Badge variant="default">안전</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">API 보안</span>
                                <Badge variant="destructive">취약</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">데이터 암호화</span>
                                <Badge variant="default">안전</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* User Feedback Analysis Tab */}
                    {(selectedScenario === "energy_user_behavior" || selectedScenario === "energy_consulting") && (
                      <TabsContent value="feedback" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <Card>
                            <CardHeader>
                              <CardTitle>사용자 행동 패턴 분석</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {(() => {
                                  if (selectedScenario === "energy_user_behavior") {
                                    return [
                                      { pattern: "주말 에너지 사용량 증가", accuracy: 94, trend: "UP" },
                                      { pattern: "야간 대기전력 증가", accuracy: 87, trend: "UP" },
                                      { pattern: "계절별 냉난방 패턴", accuracy: 91, trend: "STABLE" },
                                      { pattern: "재택근무 시 전력 사용 패턴", accuracy: 89, trend: "UP" }
                                    ];
                                  } else {
                                    return [
                                      { pattern: "에너지 절약 권고 수용도", accuracy: 78, trend: "UP" },
                                      { pattern: "스마트 기기 도입 선호도", accuracy: 85, trend: "UP" },
                                      { pattern: "에너지 요금 민감도", accuracy: 92, trend: "STABLE" },
                                      { pattern: "컴설팅 후 행동 변화율", accuracy: 73, trend: "UP" }
                                    ];
                                  }
                                })().map((item, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                      <div className="font-medium text-sm">{item.pattern}</div>
                                      <div className="text-xs text-muted-foreground">예측 정확도: {item.accuracy}%</div>
                                    </div>
                                    <Badge variant={item.trend === "UP" ? "default" : item.trend === "STABLE" ? "secondary" : "destructive"}>
                                      {item.trend === "UP" ? "상승" : item.trend === "STABLE" ? "안정" : "하락"}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>사용자 피드백 분석</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 text-green-800 font-medium text-sm mb-2">
                                  <CheckCircle2 className="w-4 h-4" />
                                  긍정적 피드백
                                </div>
                                <div className="text-sm text-green-700">
                                  {selectedScenario === "energy_user_behavior" 
                                    ? "사용자의 87%가 에너지 사용 패턴 분석 결과에 만족하며, 절약 방안을 실제로 적용하고 있습니다."
                                    : "사용자의 82%가 맞춤형 에너지 컴설팅 서비스에 만족하며, 평균 15% 에너지 비용 절감 효과를 보고했습니다."
                                  }
                                </div>
                              </div>

                              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm mb-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  개선 요청 사항
                                </div>
                                <div className="text-sm text-yellow-700">
                                  {selectedScenario === "energy_user_behavior"
                                    ? "사용자의 23%가 더 세밀한 기기별 에너지 사용량 분석을 요청하고 있습니다."
                                    : "사용자의 31%가 더 다양한 에너지 절약 옵션과 비용 비교 기능을 요청하고 있습니다."
                                  }
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">주요 피드백 지표</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">사용자 만족도</span>
                                    <span className="text-sm font-medium">{selectedScenario === "energy_user_behavior" ? "4.3/5.0" : "4.1/5.0"}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">서비스 재이용 의향</span>
                                    <span className="text-sm font-medium">{selectedScenario === "energy_user_behavior" ? "89%" : "85%"}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">추천 의향</span>
                                    <span className="text-sm font-medium">{selectedScenario === "energy_user_behavior" ? "76%" : "78%"}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Data Privacy & Ethics Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle>데이터 프라이버시 및 윤리성 평가</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h4 className="font-semibold">개인정보 보호 수준</h4>
                                <div className="space-y-3">
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">데이터 익명화</div>
                                    <div className="text-xs text-muted-foreground">
                                      개인 식별 정보 완전 제거 및 k-익명성 적용
                                    </div>
                                  </div>
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">동의 관리</div>
                                    <div className="text-xs text-muted-foreground">
                                      사용자 동의 철회 및 데이터 삭제 요청 시스템 구축
                                    </div>
                                  </div>
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">데이터 보안</div>
                                    <div className="text-xs text-muted-foreground">
                                      종단간 암호화 및 접근 권한 관리 시스템 적용
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <h4 className="font-semibold">알고리즘 윤리성</h4>
                                <div className="space-y-3">
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">투명성</div>
                                    <div className="text-xs text-muted-foreground">
                                      AI 결정 과정에 대한 사용자 설명 요구 권리 보장
                                    </div>
                                  </div>
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">공정성</div>
                                    <div className="text-xs text-muted-foreground">
                                      인구통계학적 특성에 따른 차별 방지 알고리즘 적용
                                    </div>
                                  </div>
                                  <div className="p-3 border rounded-lg">
                                    <div className="font-medium text-sm mb-1">사용자 제어권</div>
                                    <div className="text-xs text-muted-foreground">
                                      AI 추천 수용/거부 선택권 및 수동 설정 옵션 제공
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}
                  </Tabs>

                  <div className="flex justify-between mt-12">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전 단계
                    </Button>
                    <Button onClick={handleNextStep} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          모니터링 시스템 준비 중...
                        </>
                      ) : (
                        <>
                          실시간 모니터링 시작
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Real-time Monitoring */}
              {currentStep === 3 && selectedScenarioData && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springPresets.gentle}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">실시간 모니터링</h2>
                    <p className="text-muted-foreground">
                      에너지 예측 AI 모델의 성능 변화와 전력그리드 이상 징후를 실시간으로 감시합니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <MetricCard 
                      title="예측 정확도"
                      value={92.1}
                      unit="%"
                      trend="DOWN"
                      trendValue="1.8%"
                      icon={TrendingUp}
                      color="destructive"
                    />
                    <MetricCard 
                      title="예측 지연시간"
                      value={1.2}
                      unit="초"
                      trend="UP"
                      trendValue="15%"
                      icon={Clock}
                      color="warning"
                    />
                    <MetricCard 
                      title="일일 예측량"
                      value={8640}
                      unit="회"
                      trend="UP"
                      trendValue="5%"
                      icon={Activity}
                      color="primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          에너지 예측 드리프트 탐지
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PerformanceChart />
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800 font-medium text-sm mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            예측 성능 저하 감지
                          </div>
                          <div className="text-sm text-red-700">
                            지난 7일간 태양광 발전량 예측 정확도가 1.8% 하락했습니다. 모델 재학습이 필요할 수 있습니다.
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>실시간 알림 로그</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {[
                            { time: "14:23", type: "warning", message: "예측 지연시간 임계값 초과 (>1.5초)" },
                            { time: "14:15", type: "info", message: "일일 예측 목표 달성 (8,640회)" },
                            { time: "13:45", type: "error", message: "지역별 예측 편향 악화 감지 (수도권 격차 +5%)" },
                            { time: "13:30", type: "warning", message: "비정상적 기상 데이터 패턴 탐지" },
                            { time: "12:58", type: "info", message: "에너지 시스템 정기 헬스체크 완료" },
                            { time: "12:45", type: "error", message: "태양광 예측 정확도 임계값 하회 (90%)" },
                          ].map((log, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                log.type === "error" ? "bg-red-500" :
                                log.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                              }`} />
                              <div className="flex-1">
                                <div className="text-sm">{log.message}</div>
                                <div className="text-xs text-muted-foreground">{log.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-destructive" />
                        자동 대응 시스템
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold">설정된 자동 대응 규칙</h4>
                          <div className="space-y-3">
                            <div className="p-3 border rounded-lg">
                              <div className="font-medium text-sm">예측 정확도 &lt; 90%</div>
                              <div className="text-xs text-muted-foreground">→ 에너지팀 즉시 알림 + 모델 재학습 권고</div>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <div className="font-medium text-sm">지역별 편향 &gt; 10%</div>
                              <div className="text-xs text-muted-foreground">→ 예측 서비스 일시 중단 + 검토 요청</div>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <div className="font-medium text-sm">그리드 보안 위협 탐지</div>
                              <div className="text-xs text-muted-foreground">→ 시스템 긴급 정지 + 보안팀 알림</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold">최근 자동 대응 이력</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="text-sm font-medium text-yellow-800">13:45 - 지역별 편향 경고</div>
                              <div className="text-xs text-yellow-700">에너지팀에 알림 발송됨</div>
                            </div>
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="text-sm font-medium text-red-800">12:45 - 예측 성능 저하</div>
                              <div className="text-xs text-red-700">모델 재학습 프로세스 자동 시작</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between mt-12">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전 단계
                    </Button>
                    <Button onClick={handleNextStep} disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          대시보드 준비 중...
                        </>
                      ) : (
                        <>
                          통합 대시보드 보기
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Integrated Dashboard */}
              {currentStep === 4 && selectedScenarioData && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={springPresets.gentle}
                  className="max-w-6xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">통합 위험 대시보드</h2>
                    <p className="text-muted-foreground">
                      전사 AI 서비스의 위험 현황을 한눈에 파악할 수 있는 종합 대시보드입니다.
                    </p>
                  </div>

                  {/* Risk Status Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-green-700 mb-1">23</div>
                        <div className="text-sm text-green-600">정상 서비스</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertTriangle className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-700 mb-1">8</div>
                        <div className="text-sm text-yellow-600">주의 필요</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-red-700 mb-1">3</div>
                        <div className="text-sm text-red-600">위험 상태</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard 
                      title="전체 서비스"
                      value={34}
                      unit="개"
                      trend="UP"
                      trendValue="3"
                      icon={Activity}
                      color="primary"
                    />
                    <MetricCard 
                      title="규제 준수율"
                      value={91.2}
                      unit="%"
                      trend="UP"
                      trendValue="2.3%"
                      icon={Shield}
                      color="primary"
                    />
                    <MetricCard 
                      title="평균 위험도"
                      value={24}
                      unit="pts"
                      trend="DOWN"
                      trendValue="5%"
                      icon={AlertTriangle}
                      color="destructive"
                    />
                    <MetricCard 
                      title="월간 알림"
                      value={127}
                      unit="건"
                      trend="DOWN"
                      trendValue="12%"
                      icon={Eye}
                      color="warning"
                    />
                  </div>

                  {/* Risk Services List */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>위험 서비스 현황</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <RiskStatusCard 
                          title={selectedScenarioData.title}
                          description="지역별 예측 편향 악화 및 예측 성능 저하 감지"
                          level="HIGH"
                          serviceCount={1}
                        />
                        <RiskStatusCard 
                          title="ESS 에너지 저장 관리 AI v2.3"
                          description="배터리 안전 기준 준수 검토 필요"
                          level="MEDIUM"
                          serviceCount={1}
                        />
                        <RiskStatusCard 
                          title="스마트 그리드 밸런싱 AI"
                          description="수급 균형 알고리즘 설명가능성 개선 권고"
                          level="MEDIUM"
                          serviceCount={1}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>규제 대응 현황</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">AI기본법</span>
                              <span className="text-sm text-muted-foreground">94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">전기사업법</span>
                              <span className="text-sm text-muted-foreground">96%</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">신에너지법</span>
                              <span className="text-sm text-muted-foreground">91%</span>
                            </div>
                            <Progress value={91} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">에너지이용합리화법</span>
                              <span className="text-sm text-muted-foreground">88%</span>
                            </div>
                            <Progress value={88} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-12 text-center">
                    <div className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-4">데모 완료!</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        AI 거버넌스 오케스트레이터의 핵심 기능을 모두 체험해보셨습니다. 
                        실제 도입을 위한 상담을 원하시면 전문가와 연결해드리겠습니다.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="lg">
                          전문가 상담 신청
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => {
                          setCurrentStep(0);
                          setSelectedScenario(null);
                          setCompletedSteps([]);
                        }}>
                          다른 시나리오 체험
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </Layout>
  );
}