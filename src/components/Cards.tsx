import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";
import {
  AIService,
  RISK_LEVELS,
  RiskLevel,
  getRiskLevelInfo,
  formatDate,
  cn
} from "@/lib/index";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

// 1. 통합 위험 상태 카드 (Risk Traffic Light)
interface RiskStatusCardProps {
  level: RiskLevel;
  title: string;
  description: string;
  serviceCount: number;
}

export function RiskStatusCard({ level, title, description, serviceCount }: RiskStatusCardProps) {
  const { t } = useTranslation();
  const risk = getRiskLevelInfo(level);

  const getIcon = () => {
    switch (level) {
      case "LOW": return <ShieldCheck className="w-8 h-8 text-chart-3" />;
      case "MEDIUM": return <ShieldAlert className="w-8 h-8 text-chart-4" />;
      case "HIGH": return <ShieldX className="w-8 h-8 text-chart-5" />;
      case "CRITICAL": return <ShieldX className="w-8 h-8 text-destructive" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative h-full"
    >
      <Card className="h-full border-l-4 overflow-hidden shadow-sm" style={{ borderLeftColor: risk.color }}>
        <div
          className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: risk.color }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-xl" style={{ backgroundColor: risk.bg }}>
              {getIcon()}
            </div>
            <Badge variant="outline" className="font-mono">
              {serviceCount} {t('cards.services')}
            </Badge>
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: risk.color }} />
            <span className="text-xs font-semibold tracking-wider" style={{ color: risk.color }}>
              {t(risk.label)} {t('cards.state')}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 2. AI 서비스 카드 (Service Overview)
interface ServiceCardProps {
  service: AIService;
  onClick?: () => void;
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const { t } = useTranslation();
  const risk = getRiskLevelInfo(service.riskLevel);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="group transition-all border-border/40 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-tighter opacity-70">
              {t('data.cat_' + service.category)}
            </Badge>
            <div
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{ backgroundColor: risk.bg, color: risk.color }}
            >
              {t(risk.label)}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {t(service.name)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {t(service.description)}
          </p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{t('cards.compliance_rate')}</span>
              <span className="font-mono font-bold">{service.complianceRate}%</span>
            </div>
            <Progress value={service.complianceRate} className="h-1.5" />
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-[11px] text-muted-foreground flex justify-between border-t border-border/20 mt-2 py-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{formatDate(service.lastUpdated).split(" ").slice(0, 3).join(" ")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3" />
            <span>{t(service.owner)}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// 3. 메트릭 카드 (Key Performance/Risk Indicators)
interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: "UP" | "DOWN" | "STABLE";
  trendValue?: string;
  icon: React.ElementType;
  color?: string;
}

export function MetricCard({ title, value, unit, trend, trendValue, icon: Icon, color }: MetricCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
          </div>
          <div
            className="p-3 rounded-2xl"
            style={{ backgroundColor: color ? `${color}15` : "var(--secondary)" }}
          >
            <Icon className="w-6 h-6" style={{ color: color || "var(--primary)" }} />
          </div>
        </div>

        {trend && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "flex items-center text-xs font-bold px-1.5 py-0.5 rounded",
              trend === "UP" ? "bg-emerald-500/10 text-emerald-500" :
                trend === "DOWN" ? "bg-rose-500/10 text-rose-500" :
                  "bg-blue-500/10 text-blue-500"
            )}>
              {trend === "UP" ? <ArrowUpRight className="w-3 h-3 mr-1" /> :
                trend === "DOWN" ? <ArrowDownRight className="w-3 h-3 mr-1" /> :
                  <Activity className="w-3 h-3 mr-1" />}
              {trendValue}
            </div>
            <span className="text-[11px] text-muted-foreground">{t('cards.vs_last_month')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 4. 컴플라이언스 관리 카드 (Compliance Detail)
interface ComplianceCardProps {
  lawName: string;
  complianceRate: number;
  mandatoryCount: number;
  completedCount: number;
  trend: "UP" | "DOWN" | "STABLE";
}

export function ComplianceCard({ lawName, complianceRate, mandatoryCount, completedCount, trend }: ComplianceCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="group hover:border-primary/40 transition-colors border-border/60">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">{lawName}</CardTitle>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">{complianceRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('cards.compliance_items_status', { mandatory: mandatoryCount, completed: completedCount })}
            </p>
          </div>
          <div className={cn(
            "text-xs font-medium flex items-center",
            trend === "UP" ? "text-emerald-500" : "text-muted-foreground"
          )}>
            {trend === "UP" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {t('cards.rate_rising')}
          </div>
        </div>
        <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${complianceRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-primary"
          />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary/50 p-2 rounded">
            <CheckCircle2 className="w-3 h-3 text-chart-3" />
            <span>{t('cards.docs_complete')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary/50 p-2 rounded">
            <AlertTriangle className="w-3 h-3 text-chart-4" />
            <span>{mandatoryCount - completedCount} {t('cards.review_needed')}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
