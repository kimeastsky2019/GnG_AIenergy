import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  Activity,
  FileText,
  User,
  Calendar,
  ExternalLink,
  ShieldAlert,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import {
  RiskStatusCard,
  MetricCard,
  ComplianceCard
} from '@/components/Cards';
import {
  RiskTrendChart,
  BiasHeatmap,
  PerformanceChart,
  ComplianceChart
} from '@/components/Charts';
import {
  mockAIServices,
  mockRiskAssessments,
  mockTechnicalValidations,
  complianceData
} from '@/data/index';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { IMAGES } from '@/assets/images';
import { useTranslation } from 'react-i18next';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Find related data based on ID
  const service = mockAIServices.find(s => s.id === id) || mockAIServices[0];
  const assessment = mockRiskAssessments.find(a => a.serviceId === service.id) || mockRiskAssessments[0];
  const validation = mockTechnicalValidations.find(v => v.serviceId === service.id) || mockTechnicalValidations[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPERATING': return 'bg-chart-3 text-white';
      case 'DEVELOPING': return 'bg-chart-2 text-white';
      case 'PLANNING': return 'bg-muted text-muted-foreground';
      case 'EMERGENCY_STOP': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-destructive';
      case 'HIGH': return 'text-orange-500';
      case 'MEDIUM': return 'text-yellow-500';
      case 'LOW': return 'text-chart-3';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
                <Badge className={getStatusColor(service.status)}>
                  {t(`service_detail.status.${service.status.toLowerCase()}`)}
                </Badge>
              </div>
              <p className="text-muted-foreground">ID: {service.id} • {t('service_detail.header.manager')}: {t(service.owner)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" /> {t('service_detail.header.btn_report')}
            </Button>
            {service.status !== 'EMERGENCY_STOP' && (
              <Button variant="destructive" className="gap-2">
                <ShieldAlert className="w-4 h-4" /> {t('service_detail.header.btn_stop')}
              </Button>
            )}
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title={t('service_detail.metrics.risk_level')}
            value={service.riskLevel}
            unit=""
            icon={AlertTriangle}
            color={getRiskColor(service.riskLevel)}
          />
          <MetricCard
            title={t('service_detail.metrics.compliance_rate')}
            value={service.complianceRate}
            unit="%"
            trend="UP"
            trendValue="4.2%"
            icon={ShieldCheck}
          />
          <MetricCard
            title={t('service_detail.metrics.security_score')}
            value={validation.securityScore}
            unit="/100"
            icon={ShieldAlert}
          />
          <MetricCard
            title={t('service_detail.metrics.explainability_score')}
            value={validation.explainabilityScore}
            unit="%"
            icon={Activity}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">{t('service_detail.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="governance">{t('service_detail.tabs.governance')}</TabsTrigger>
            <TabsTrigger value="technical">{t('service_detail.tabs.technical')}</TabsTrigger>
            <TabsTrigger value="monitoring">{t('service_detail.tabs.monitoring')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{t('service_detail.overview.service_risk_summary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed">{t(service.description)}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">{t('service_detail.overview.category')}</span>
                      <p className="font-semibold">{t('data.cat_' + service.category)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">{t('service_detail.overview.last_updated')}</span>
                      <p className="font-semibold">{new Date(service.lastUpdated).toLocaleDateString('ko-KR')}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" /> {t('service_detail.overview.risk_points_title')}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <Badge variant="outline" className="text-destructive border-destructive">{t('service_detail.overview.risk_high_impact')}</Badge>
                        <span>{t('service_detail.overview.risk_high_impact_desc')}</span>
                      </li>
                      <li className="flex gap-2">
                        <Badge variant="outline" className="text-orange-500 border-orange-500">{t('service_detail.overview.risk_data_sensitivity')}</Badge>
                        <span>{t('service_detail.overview.risk_data_sensitivity_desc')}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/50">
                <CardHeader>
                  <CardTitle>{t('service_detail.overview.risk_trend_title')}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <RiskTrendChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <img src={IMAGES.RISK_TECH_4} alt="Technical Detail" className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{t('service_detail.overview.algo_integrity_title')}</CardTitle>
                  <CardDescription>{t('service_detail.overview.algo_integrity_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('service_detail.overview.accuracy')}</span>
                        <span className="font-bold">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('service_detail.overview.recall')}</span>
                        <span className="font-bold">89.5%</span>
                      </div>
                      <Progress value={89.5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <img src={IMAGES.DATA_VIZ_7} alt="Monitoring" className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{t('service_detail.overview.op_visibility_title')}</CardTitle>
                  <CardDescription>{t('service_detail.overview.op_visibility_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-chart-3" />
                        <div>
                          <p className="text-sm font-medium">{t('service_detail.overview.process_speed')}</p>
                          <p className="text-xs text-muted-foreground">{t('service_detail.overview.process_speed_val')}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{t('service_detail.overview.status_normal')}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 text-destructive" />
                        <div>
                          <p className="text-sm font-medium">{t('service_detail.overview.security_threats')}</p>
                          <p className="text-xs text-muted-foreground">{t('service_detail.overview.security_threats_val')}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-chart-3 border-chart-3">{t('service_detail.overview.status_clear')}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> {t('service_detail.governance.checklist_title')}
                  </CardTitle>
                  <CardDescription>{t('service_detail.governance.checklist_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessment.checklist.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border bg-background/50">
                        {item.isMet ? (
                          <CheckCircle2 className="w-5 h-5 text-chart-3 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{t(item.requirement)}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t('service_detail.governance.ref_law')}: {item.lawReference}</p>
                        </div>
                        <Badge variant={item.isMet ? "secondary" : "destructive"}>
                          {item.isMet ? t('service_detail.governance.status_met') : t('service_detail.governance.status_unmet')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('service_detail.governance.auto_notice_title')}</CardTitle>
                    <CardDescription>{t('service_detail.governance.auto_notice_desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="bg-primary/5 p-6 rounded-lg border-primary/20 border">
                    <p className="text-sm italic leading-relaxed text-foreground">
                      "{t(assessment.automaticNotice)}"
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" variant="link" className="text-primary">
                        {t('service_detail.governance.btn_edit')} <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('service_detail.governance.compliance_status_title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ComplianceChart data={complianceData} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Technical Validation Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('service_detail.technical.bias_map_title')}</CardTitle>
                  <CardDescription>{t('service_detail.technical.bias_map_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <BiasHeatmap data={validation.biasMetrics} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('service_detail.technical.xai_title')}</CardTitle>
                  <CardDescription>{t('service_detail.technical.xai_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {validation.xaiHeatmap.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-mono text-xs">{item.feature}</span>
                          <span className="font-bold">{(item.impact * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.impact * 100}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full bg-chart-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('service_detail.technical.red_teaming_title')}</CardTitle>
                <CardDescription>{t('service_detail.technical.red_teaming_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {validation.redTeamingLog.map((log, idx) => (
                    <div key={idx} className="p-4 rounded-xl border bg-background space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant={log.status === 'PASSED' ? 'outline' : 'destructive'} className={log.status === 'PASSED' ? 'text-chart-3 border-chart-3' : ''}>
                          {log.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm">{log.scenario}</h4>
                      <p className="text-xs text-muted-foreground">{log.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{t('service_detail.monitoring.drift_title')}</CardTitle>
                  <CardDescription>{t('service_detail.monitoring.drift_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <PerformanceChart />
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('service_detail.monitoring.alert_log_title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{t('service_detail.monitoring.alert_1_title')}</p>
                        <p className="text-xs text-muted-foreground">{t('service_detail.monitoring.alert_1_desc')}</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block">{t('service_detail.monitoring.time_now')}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
                      <CheckCircle2 className="w-5 h-5 text-chart-3 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{t('service_detail.monitoring.alert_2_title')}</p>
                        <p className="text-xs text-muted-foreground">{t('service_detail.monitoring.alert_2_desc')}</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block">{t('service_detail.monitoring.time_2h')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader>
                    <CardTitle className="text-destructive">{t('service_detail.monitoring.emergency_title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{t('service_detail.monitoring.emergency_desc')}</p>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full justify-start text-destructive hover:bg-destructive/10">
                        <ShieldAlert className="w-4 h-4 mr-2" /> {t('service_detail.monitoring.btn_block')}
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" /> {t('service_detail.monitoring.btn_manual')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
