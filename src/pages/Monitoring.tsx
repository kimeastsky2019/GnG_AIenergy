import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  Zap,
  Play,
  Square,
  RefreshCw,
  Clock,
  ChevronRight,
  Search
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { PerformanceChart } from "@/components/Charts";
import { MetricCard } from "@/components/Cards";
import { mockAIServices } from "@/data/index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";
import { IMAGES } from "@/assets/images";

export default function Monitoring() {
  const { t, i18n } = useTranslation();
  const [isEmergencyStopping, setIsEmergencyStopping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const operatingServices = mockAIServices.filter(s => s.status === "OPERATING");
  const emergencyStopped = mockAIServices.filter(s => s.status === "EMERGENCY_STOP");

  const handleEmergencyStop = (serviceName: string) => {
    setIsEmergencyStopping(true);
    setTimeout(() => {
      setIsEmergencyStopping(false);
      toast.error(t('monitoring.table.toast_stop', { serviceName }), {
        description: t('monitoring.table.toast_desc'),
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('monitoring.title')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('monitoring.description')}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground font-medium">{t('monitoring.system_time')}</span>
              <span className="text-sm font-mono font-bold">
                {currentTime.toLocaleTimeString(i18n.language)}
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title={t('monitoring.metrics.drift')}
            value="12.4"
            unit="%"
            trend="UP"
            trendValue="2.1%"
            icon={Activity}
            color="oklch(0.65 0.14 195)"
          />
          <MetricCard
            title={t('monitoring.metrics.unresolved_alerts')}
            value="3"
            unit={t('units.count')}
            trend="DOWN"
            trendValue="1건"
            icon={AlertTriangle}
            color="oklch(0.62 0.17 35)"
          />
          <MetricCard
            title={t('monitoring.metrics.latency')}
            value="142"
            unit="ms"
            trend="STABLE"
            icon={Zap}
            color="oklch(0.52 0.18 265)"
          />
          <MetricCard
            title={t('monitoring.metrics.uptime')}
            value="99.98"
            unit="%"
            trend="STABLE"
            icon={ShieldAlert}
            color="oklch(0.68 0.16 150)"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Performance Monitoring Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden border-border shadow-md">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{t('monitoring.performance.title')}</CardTitle>
                    <CardDescription>{t('monitoring.performance.subtitle')}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-background">{t('monitoring.performance.live')}</Badge>
                    <Badge variant="secondary">{t('monitoring.performance.integrated')}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px] w-full">
                  <PerformanceChart />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-bold">{t('monitoring.table.title')}</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('monitoring.table.search_placeholder')}
                    className="w-full bg-background border border-input rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('monitoring.table.headers.service_name')}</TableHead>
                      <TableHead>{t('monitoring.table.headers.status')}</TableHead>
                      <TableHead>{t('monitoring.table.headers.accuracy')}</TableHead>
                      <TableHead>{t('monitoring.table.headers.risk_index')}</TableHead>
                      <TableHead className="text-right">{t('monitoring.table.headers.action')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAIServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{t(service.name)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${service.status === 'OPERATING' ? 'bg-emerald-500' : service.status === 'EMERGENCY_STOP' ? 'bg-destructive' : 'bg-amber-500'}`} />
                            <span className="text-xs font-semibold">
                              {service.status === 'OPERATING' ? t('monitoring.table.status.operating') : service.status === 'EMERGENCY_STOP' ? t('monitoring.table.status.emergency_stop') : t('monitoring.table.status.evaluating')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 w-24">
                            <span className="text-xs text-muted-foreground">{service.complianceRate}%</span>
                            <Progress value={service.complianceRate} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={service.riskLevel === 'HIGH' || service.riskLevel === 'CRITICAL' ? 'destructive' : 'outline'}
                            className="text-[10px]"
                          >
                            {service.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {service.status === 'OPERATING' ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-8 px-2"
                                onClick={() => handleEmergencyStop(t(service.name))}
                                disabled={isEmergencyStopping}
                              >
                                <Square className="w-3 h-3 mr-1" /> {t('monitoring.table.actions.stop')}
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-8 px-2">
                                <Play className="w-3 h-3 mr-1" /> {t('monitoring.table.actions.restart')}
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 px-2">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Alerts & Escalation */}
          <div className="space-y-6">
            <Card className="border-destructive/30 shadow-lg">
              <CardHeader className="bg-destructive/5 border-b border-destructive/10">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <CardTitle className="text-lg">{t('monitoring.alerts.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm font-semibold text-destructive mb-1">{t('monitoring.alerts.pii_risk')}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('monitoring.alerts.pii_desc')}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="destructive" size="sm" className="w-full">{t('monitoring.alerts.btn_filter')}</Button>
                    <Button variant="outline" size="sm" className="w-full">{t('monitoring.alerts.btn_detail')}</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30">
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">{t('monitoring.alerts.perf_warning')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('monitoring.alerts.perf_desc')}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-muted-foreground">{t('monitoring.alerts.detected_at')}: 23:25:01</span>
                    <span className="text-amber-600">{t('monitoring.alerts.waiting_action')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {t('monitoring.incidents.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0 border-border">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{t('monitoring.incidents.log_default')}</span>
                        <span className="text-[10px] text-muted-foreground">{t('monitoring.incidents.time_ago')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {i === 1 ? t('monitoring.incidents.log_1') : i === 2 ? t('monitoring.incidents.log_2') : t('monitoring.incidents.log_3')}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  {t('monitoring.incidents.view_all')} <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <div className="relative rounded-xl overflow-hidden group">
              <img
                src={IMAGES.RISK_TECH_5}
                alt="Security Monitoring"
                className="w-full h-40 object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-sm font-bold">AI Security Scan</p>
                <p className="text-[10px] text-muted-foreground">24/7 Red Teaming Active</p>
              </div>
              <div className="absolute top-4 right-4">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
