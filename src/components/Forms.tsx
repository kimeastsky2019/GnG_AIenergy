import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldCheck,
  AlertCircle,
  Zap,
  Settings,
  Info,
  CheckCircle2,
  Loader2,
  Terminal
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AI_CATEGORIES, cn } from "@/lib/index.ts";

const serviceSchema = z.object({
  name: z.string().min(2, "서비스 명칭은 최소 2자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  description: z.string().min(10, "설명은 최소 10자 이상이어야 합니다."),
  owner: z.string().min(2, "담당자 이름을 입력해주세요."),
});

const assessmentSchema = z.object({
  serviceCategory: z.string(),
  isHighImpact: z.boolean(),
  noticeText: z.string(),
  requirements: z.array(z.string()),
});

const technicalSchema = z.object({
  targetModel: z.string().min(1, "검증 대상 모델명을 입력하세요."),
  scanDepth: z.enum(["STANDARD", "DEEP", "EXTREME"]),
  enableBiasMap: z.boolean().default(true),
  enableXAI: z.boolean().default(true),
  enableRedTeaming: z.boolean().default(true),
  notificationRecipients: z.string(),
});

export function ServiceRegistrationForm({ onSubmit }: { onSubmit: (data: z.infer<typeof serviceSchema>) => void }) {
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      owner: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI 서비스 명칭</FormLabel>
              <FormControl>
                <Input placeholder="예: 2026 하반기 신용평가 모델 v2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>서비스 카테고리</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AI_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>서비스 설명</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="AI 서비스의 목적, 사용되는 데이터, 기대 효과 등을 기술하세요."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>책임 담당자</FormLabel>
              <FormControl>
                <Input placeholder="이름 또는 팀명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-lg font-semibold">
          서비스 등록 및 초기 평가 진행
        </Button>
      </form>
    </Form>
  );
}

export function RiskAssessmentForm({ onSubmit, initialCategory }: { onSubmit: (data: any) => void, initialCategory?: string }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const selectedCat = AI_CATEGORIES.find(c => c.id === initialCategory);
  const isHighImpact = selectedCat?.isHighImpact || false;

  const form = useForm<z.infer<typeof assessmentSchema>>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      serviceCategory: initialCategory || "",
      isHighImpact: isHighImpact,
      noticeText: isHighImpact 
        ? "본 서비스는 고영향 AI 시스템으로 분류되어 관련 법령에 따른 엄격한 관리 감독을 받습니다. 결과에 대한 설명 요청권이 보장됩니다."
        : "본 서비스는 일반 AI 시스템으로 분류됩니다.",
      requirements: [],
    },
  });

  const handleAutoGenerate = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // sLLM Governance Agent가 생성하는 시뮬레이션
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className={cn("border-l-4", isHighImpact ? "border-l-destructive" : "border-l-chart-3")}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className={cn("p-2 rounded-full", isHighImpact ? "bg-destructive/10 text-destructive" : "bg-chart-3/10 text-chart-3")}>
              {isHighImpact ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div>
              <CardTitle>{isHighImpact ? "고영향 AI 판별" : "일반 AI 판별"}</CardTitle>
              <CardDescription>
                {selectedCat?.label} 카테고리에 근거하여 시스템이 자동 판별한 결과입니다.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="noticeText"
            render={({ field }) => (
              <FormItem className="bg-accent/30 p-4 rounded-xl border border-dashed border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    sLLM 추천 자동 고지 문구
                  </FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAutoGenerate}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "문구 재생성"}
                  </Button>
                </div>
                <FormControl>
                  <Textarea className="bg-white dark:bg-card min-h-[100px]" {...field} />
                </FormControl>
                <FormDescription>소비자 고지 의무(AI기본법 제24조)를 준수하기 위한 문구입니다.</FormDescription>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              필수 Compliance 체크리스트
            </h3>
            <div className="grid gap-3">
              {[
                { id: "req1", label: "알고리즘의 투명성 및 설명가능성 확보", law: "AI기본법 12조" },
                { id: "req2", label: "데이터 편향성 제거를 위한 검증 체계 구축", law: "개인정보보호법 28조" },
                { id: "req3", label: "비상 상황 시 즉시 중단 기능(Kill Switch) 구현", law: "금융가이드라인" },
                { id: "req4", label: "정기적인 레드티밍 및 보안 취약점 점검", law: "EU AI Act" },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <Checkbox id={item.id} className="mt-1" />
                  <div className="grid gap-0.5">
                    <label htmlFor={item.id} className="text-sm font-medium cursor-pointer">{item.label}</label>
                    <span className="text-xs text-muted-foreground font-mono">근거 법령: {item.law}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-12">평가 완료 및 기술 검증 단계로 이동</Button>
      </form>
    </Form>
  );
}

export function TechnicalValidationForm({ onSubmit }: { onSubmit: (data: z.infer<typeof technicalSchema>) => void }) {
  const form = useForm<z.infer<typeof technicalSchema>>({
    resolver: zodResolver(technicalSchema),
    defaultValues: {
      targetModel: "",
      scanDepth: "STANDARD",
      enableBiasMap: true,
      enableXAI: true,
      enableRedTeaming: true,
      notificationRecipients: "admin@company.com",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <Terminal className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-bold">자동화 기술 검증 설정 (AI Scanners)</h2>
                <p className="text-sm text-muted-foreground">모델과 데이터셋을 직접 분석하여 위험 요소를 추출합니다.</p>
              </div>
            </div>

            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="targetModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>검증 대상 모델/엔드포인트</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.ai-model.internal/v1/predict" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scanDepth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>스캔 심도</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="심도를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STANDARD">Standard (표준 통계 분석)</SelectItem>
                        <SelectItem value="DEEP">Deep (신경망 가중치 분석)</SelectItem>
                        <SelectItem value="EXTREME">Extreme (적대적 공격 시뮬레이션 포함)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>심도가 높을수록 분석 시간과 비용이 증가합니다.</FormDescription>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="enableBiasMap"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Data Bias Map</FormLabel>
                        <p className="text-xs text-muted-foreground">편향성 시각화</p>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableXAI"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>XAI Heatmap</FormLabel>
                        <p className="text-xs text-muted-foreground">설명 가능성 분석</p>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enableRedTeaming"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Red Teaming</FormLabel>
                        <p className="text-xs text-muted-foreground">적대적 공격 방어</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notificationRecipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이상 징후 알림 수신처</FormLabel>
                    <FormControl>
                      <Input placeholder="쉼표로 구분하여 이메일 입력" {...field} />
                    </FormControl>
                    <FormDescription>검증 실패 또는 긴급 상황 시 즉시 알림이 발송됩니다.</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button">설정 초기화</Button>
          <Button type="submit" className="px-8">
            검증 엔진 가동 시작
          </Button>
        </div>
      </form>
    </Form>
  );
}
