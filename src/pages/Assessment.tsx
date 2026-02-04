import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/Layout";
import { RiskAssessmentForm } from "@/components/Forms";
import { MetricCard, ComplianceCard } from "@/components/Cards";
import { complianceData, mockRiskAssessments } from "@/data/index";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Info,
  Zap,
  Gavel
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Assessment() {
  const { t } = useTranslation();
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = (data: any) => {
    setIsProcessing(true);
    // 시뮬레이션: 고영향 AI 판별 로직 (금융, 채용, 의료 등은 고영향으로 분류)
    setTimeout(() => {
      const highImpactCategories = ["finance_loan", "hr_recruitment", "medical_diag"];
      const isHigh = highImpactCategories.includes(data.category);

      setAssessmentResult({
        ...data,
        isHighImpact: isHigh,
        score: isHigh ? 65 : 95,
        notice: isHigh
          ? t('assessment.result.notice_high', { serviceName: data.serviceName })
          : t('assessment.result.notice_low'),
        checklist: [
          { id: "c1", label: t('assessment.checklist.c1'), status: isHigh ? "pending" : "completed", law: t('data.law_kr') },
          { id: "c2", label: t('assessment.checklist.c2'), status: "completed", law: t('data.law_priv') },
          { id: "c3", label: t('assessment.checklist.c3'), status: "pending", law: t('data.law_fin') },
          { id: "c4", label: t('assessment.checklist.c4'), status: isHigh ? "pending" : "not_applicable", law: t('data.law_eu') }
        ]
      });
      setIsProcessing(false);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 800);
  };

  return (
    <Layout>
      <div className="space-y-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('assessment.title')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('assessment.description')}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-primary">
              <Zap className="w-3 h-3 mr-1" /> {t('assessment.sllm_agent_active')}
            </Badge>
          </div>
        </div>

        {/* Dashboard Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title={t('assessment.metrics.waiting')}
            value={3}
            unit={t('units.count')}
            icon={FileText}
            color="text-primary"
          />
          <MetricCard
            title={t('assessment.metrics.high_impact_rate')}
            value={42}
            unit="%"
            trend="UP"
            trendValue="5%"
            icon={AlertTriangle}
            color="text-destructive"
          />
          <MetricCard
            title={t('assessment.metrics.avg_score')}
            value={88}
            unit={t('units.pts')}
            trend="STABLE"
            icon={ShieldCheck}
            color="text-chart-3"
          />
          <MetricCard
            title={t('assessment.metrics.updates_24h')}
            value={12}
            unit={t('units.count')}
            icon={CheckCircle2}
            color="text-chart-2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Assessment Form (Left) */}
          <div className="lg:col-span-7">
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  {t('assessment.wizard.title')}
                </CardTitle>
                <CardDescription>
                  {t('assessment.wizard.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <RiskAssessmentForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </div>

          {/* Compliance Info (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('assessment.regulation_status.title')}</CardTitle>
                <CardDescription>{t('assessment.regulation_status.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceData.map((item) => (
                  <ComplianceCard key={item.lawName} {...(item as any)} lawName={t(item.lawName)} />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  {t('assessment.guidelines.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                {(t('assessment.guidelines.items', { returnObjects: true }) as string[]).map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assessment Result Display (Bottom) */}
        <AnimatePresence>
          {assessmentResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Separator className="my-8" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Impact Determination Result */}
                <Card className={assessmentResult.isHighImpact ? "border-destructive/30 bg-destructive/5" : "border-chart-3/30 bg-chart-3/5"}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{t('assessment.result.title')}</span>
                      <Badge variant={assessmentResult.isHighImpact ? "destructive" : "outline"} className="uppercase">
                        {assessmentResult.isHighImpact ? t('assessment.result.high_risk') : t('assessment.result.low_risk')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-background rounded-lg border border-border/50">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        {t('assessment.result.notice_title')}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{assessmentResult.notice}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex-1">
                        <p className="text-muted-foreground mb-1">컴플라이언스 점수</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${assessmentResult.score}%` }}
                            className={`h-full ${assessmentResult.score > 80 ? 'bg-chart-3' : 'bg-destructive'}`}
                          />
                        </div>
                      </div>
                      <span className="font-bold text-lg">{assessmentResult.score}점</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Checklist */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('assessment.result.checklist_title')}</CardTitle>
                    <CardDescription>{t('assessment.result.checklist_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-3">
                        {assessmentResult.checklist.map((item: any) => (
                          <div key={item.id} className="flex items-start justify-between p-3 rounded-md bg-muted/20 border border-border/30">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{item.label}</p>
                              <p className="text-xs text-muted-foreground font-mono">{t('assessment.checklist.law_basis')}: {item.law}</p>
                            </div>
                            <Badge
                              variant={item.status === 'completed' ? 'outline' : item.status === 'pending' ? 'destructive' : 'secondary'}
                              className="text-[10px]"
                            >
                              {t(`assessment.checklist.status.${item.status}`)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-3">
                <Badge variant="secondary" className="cursor-pointer">{t('assessment.actions.download_report')}</Badge>
                <Badge variant="default" className="cursor-pointer">{t('assessment.actions.request_approval')}</Badge>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
