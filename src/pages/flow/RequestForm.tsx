import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function RequestForm() {
  const currentStep = 1;
  const totalSteps = 22;

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen">
        {/* Header Section - Step 순서 (1~5) */}
        <section className="py-3 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center justify-between gap-2 max-w-4xl mx-auto">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      step === currentStep
                        ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                        : step < currentStep
                        ? "bg-primary/30 border-primary text-primary"
                        : "border-muted text-muted-foreground bg-background"
                    }`}
                  >
                    <span className="text-sm font-bold">{step}</span>
                  </div>
                  {step === currentStep && (
                    <div className="text-xs font-medium text-primary mt-2 text-center whitespace-nowrap">
                      요청서 작성
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Title & Description - 가로 레이아웃 */}
        <section className="py-6 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* 상단 헤더: 제목과 설명을 가로로 배치 */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2">요청서 작성/처리</h1>
                <p className="text-sm text-muted-foreground">
                  AI 서비스 도입·변경 요청서를 작성하고 접수·처리합니다.
                </p>
              </div>

              {/* 플로우 진행률 - 가로로 표시 */}
              <div className="flex flex-row items-center gap-3 mb-3">
                <span className="text-sm font-semibold">플로우 진행률</span>
                <span className="text-sm font-bold text-primary">
                  {currentStep} of {totalSteps}
                </span>
              </div>

              {/* 진행률 바 */}
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            </div>
          </div>
        </section>

        {/* Main Content - 중앙 정렬 (60-70% 너비) */}
        <section className="flex-1 py-8 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 메인 콘텐츠 영역 - 중앙 정렬 (9컬럼) */}
                <div className="lg:col-span-9">
                  <Card>
                    <CardHeader>
                      <CardTitle>요청서 작성/처리</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* 여기에 요청서 작성 폼 내용이 들어갑니다 */}
                      <div className="space-y-6">
                        <div className="p-6 border-2 border-dashed border-muted rounded-lg text-center">
                          <p className="text-muted-foreground mb-4">
                            요청서 작성 내용을 입력하세요
                          </p>
                          <div className="space-y-4 text-left">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <label className="text-sm font-medium mb-2 block">서비스명</label>
                              <input 
                                type="text" 
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="AI 서비스명을 입력하세요"
                              />
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <label className="text-sm font-medium mb-2 block">서비스 목적</label>
                              <textarea 
                                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                                placeholder="서비스 목적을 입력하세요"
                              />
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <label className="text-sm font-medium mb-2 block">처리 데이터</label>
                              <input 
                                type="text" 
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="처리하는 데이터 유형을 입력하세요"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI 파트너 섹션 - 고정 사이드바 (3컬럼) */}
                <div className="lg:col-span-3">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sparkles className="w-5 h-5 text-primary" />
                        AI 파트너
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          AI 컨설팅 및 자동화 기능을 제공합니다.
                        </p>
                        <Button className="w-full" variant="outline">
                          <Sparkles className="w-4 h-4 mr-2" />
                          AI 컨설팅
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Action Bar - 하단 고정 (Sticky) */}
        <section className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground">Demo View</div>
              <div className="flex flex-row items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  임시 저장
                </Button>
                <Button className="flex items-center gap-2">
                  다음
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
