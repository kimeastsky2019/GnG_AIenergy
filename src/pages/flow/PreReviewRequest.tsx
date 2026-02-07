import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Save } from "lucide-react";

export default function PreReviewRequest() {
  const currentStep = 5;
  const totalSteps = 22;

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen">
        {/* Header Section - 가로 레이아웃 */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center justify-between gap-6">
              {/* 플로우 진행률 - 가로로 표시 */}
              <div className="flex flex-row items-center gap-4">
                <div className="text-lg font-semibold whitespace-nowrap">플로우 진행률</div>
                <div className="text-lg font-bold text-primary whitespace-nowrap">
                  {currentStep} of {totalSteps}
                </div>
              </div>

              {/* 제목과 설명 - 가로로 표시 */}
              <div className="flex-1 flex flex-row items-center gap-6">
                <h1 className="text-2xl font-bold whitespace-nowrap">사전검토 요청 화면</h1>
                <p className="text-muted-foreground text-sm whitespace-nowrap">
                  사전검토를 요청하고 검토 범위를 설정합니다.
                </p>
              </div>
            </div>

            {/* 진행률 바 */}
            <div className="mt-4">
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            </div>
          </div>
        </section>

        {/* Progress Steps - 가로 레이아웃 */}
        <section className="py-4 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center justify-between gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      step === currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : step < currentStep
                        ? "bg-primary/20 border-primary text-primary"
                        : "border-muted text-muted-foreground bg-background"
                    }`}
                  >
                    <span className="text-sm font-bold">{step}</span>
                  </div>
                  {step === currentStep && (
                    <div className="text-xs font-medium text-primary mt-2 text-center">
                      데모 시나리오 선택
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>사전검토 요청</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 여기에 사전검토 요청 폼 내용이 들어갑니다 */}
                <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                  사전검토 요청 내용을 입력하세요
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bottom Action Bar - 가로 레이아웃 */}
        <section className="py-4 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-row items-center justify-between">
              <div className="text-sm text-muted-foreground">Demo View</div>
              <div className="flex flex-row items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  임시 저장
                </Button>
                <Button className="flex items-center gap-2">
                  다음 단계 &gt;
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
