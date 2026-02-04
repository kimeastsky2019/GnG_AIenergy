import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Brain,
  ArrowUpRight,
  AlertTriangle,
  Layers,
  FileCheck,
  Search
} from "lucide-react";
import { Layout } from "@/components/Layout";
import {
  RiskStatusCard,
  ServiceCard,
  MetricCard,
  ComplianceCard
} from "@/components/Cards";
import {
  RiskTrendChart,
  ComplianceChart
} from "@/components/Charts";
import {
  mockAIServices,
  complianceData
} from "@/data/index";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
  const { t } = useTranslation();
  // 통계 계산
  const totalServices = mockAIServices.length;
  const highRiskCount = mockAIServices.filter(s => s.riskLevel === "HIGH" || s.riskLevel === "CRITICAL").length;
  const avgCompliance = Math.round(complianceData.reduce((acc, curr) => acc + curr.complianceRate, 0) / complianceData.length);
  const activeMonitoring = mockAIServices.filter(s => s.status === "OPERATING").length;

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-12">
        {/* 상단 헤더 및 검색 */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('dashboard.description')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('dashboard.search_placeholder')}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <FileCheck className="h-4 w-4" />
              {t('dashboard.btn_report')}
            </Button>
          </div>
        </header>

        {/* 핵심 메트릭 그리드 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title={t('dashboard.metrics.total_services')}
            value={totalServices}
            unit={t('units.count')}
            icon={Brain}
            color="text-primary"
          />
          <MetricCard
            title={t('dashboard.metrics.high_risk_detected')}
            value={highRiskCount}
            unit={t('units.count')}
            trend="UP"
            trendValue="12%"
            icon={ShieldAlert}
            color="text-destructive"
          />
          <MetricCard
            title={t('dashboard.metrics.avg_compliance')}
            value={avgCompliance}
            unit="%"
            trend="UP"
            trendValue="3%"
            icon={ShieldCheck}
            color="text-chart-3"
          />
          <MetricCard
            title={t('dashboard.metrics.realtime_monitoring')}
            value={activeMonitoring}
            unit={t('units.count')}
            icon={Activity}
            color="text-chart-2"
          />
        </section>

        {/* 전사 AI 위험 신호등 및 주요 트렌드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RiskStatusCard
              level="MEDIUM"
              title={t('dashboard.risk_overview.title')}
              description={t('dashboard.risk_overview.description')}
              serviceCount={highRiskCount}
            />
          </div>
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{t('dashboard.risk_overview.chart_title')}</CardTitle>
                  <CardDescription>{t('dashboard.risk_overview.chart_desc')}</CardDescription>
                </div>
                <Badge variant="outline">{t('dashboard.risk_overview.live_update')}</Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <RiskTrendChart />
            </CardContent>
          </Card>
        </div>

        {/* 단계별 병목 구간 및 규제 대응 현황 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <CardTitle>{t('dashboard.bottleneck.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { stage: t('dashboard.bottleneck.stages.planning'), status: "COMPLETED", count: 12, color: "bg-chart-3" },
                { stage: t('dashboard.bottleneck.stages.development'), status: "IN_PROGRESS", count: 8, color: "bg-chart-4", active: true },
                { stage: t('dashboard.bottleneck.stages.operation'), status: "PENDING", count: 5, color: "bg-muted" },
                { stage: t('dashboard.bottleneck.stages.maintenance'), status: "PENDING", count: 2, color: "bg-muted" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.stage}</span>
                    <span className="text-muted-foreground">{t('dashboard.bottleneck.waiting_count', { count: item.count })}</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / 27) * 100}%` }}
                      className={`h-full ${item.color} ${item.active ? 'animate-pulse' : ''}`}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground italic">
                {t('dashboard.bottleneck.note')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                <CardTitle>{t('dashboard.global_compliance.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ComplianceChart data={complianceData} />
            </CardContent>
          </Card>
        </div>

        {/* 주요 법령 준수 카드 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceData.map((compliance, idx) => (
            <ComplianceCard key={idx} {...(compliance as any)} lawName={t(compliance.lawName)} />
          ))}
        </section>

        {/* 관리 대상 고위험 서비스 목록 */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {t('dashboard.high_risk_list.title')}
              </h2>
              <p className="text-sm text-muted-foreground">{t('dashboard.high_risk_list.description')}</p>
            </div>
            <Button variant="link" className="gap-1 text-primary">
              {t('dashboard.high_risk_list.view_all')} <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAIServices
              .filter(s => s.riskLevel === "HIGH" || s.riskLevel === "CRITICAL" || s.status === "EMERGENCY_STOP")
              .map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </section>

        {/* 하단 배너: AI 거버넌스 오케스트레이터 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden h-64 flex items-center p-8 mt-4"
        >
          <img
            src={IMAGES.DATA_VIZ_3}
            alt="Governance Orchestrator Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">{t('dashboard.banner.feature_tag')}</Badge>
            <h3 className="text-2xl font-bold mb-2">{t('dashboard.banner.title')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('dashboard.banner.description')}
            </p>
            <div className="flex gap-3">
              <Button>{t('dashboard.banner.btn_run')}</Button>
              <Button variant="outline">{t('dashboard.banner.btn_update')}</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
