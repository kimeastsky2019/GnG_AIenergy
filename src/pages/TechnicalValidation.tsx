import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/Layout';
import { BiasHeatmap } from '@/components/Charts';
import { MetricCard } from '@/components/Cards';
import {
  ShieldCheck,
  Eye,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Search,
  Database,
  Cpu
} from 'lucide-react';
import {
  mockAIServices,
  mockTechnicalValidations
} from '@/data/index';
import { IMAGES } from '@/assets/images';
import { motion } from 'framer-motion';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function TechnicalValidation() {
  const { t } = useTranslation();
  // Default to the first high-risk service for demonstration
  const [selectedServiceId, setSelectedServiceId] = useState(mockAIServices[0].id);

  const selectedService = mockAIServices.find(s => s.id === selectedServiceId) || mockAIServices[0];
  const validationData = mockTechnicalValidations.find(v => v.serviceId === selectedServiceId) || mockTechnicalValidations[0];

  const redTeamingSuccessRate = Math.round(
    (validationData.redTeamingLog.filter(log => log.status === 'PASSED').length /
      validationData.redTeamingLog.length) * 100
  );

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        {/* Hero Section */}
        <section className="relative h-64 rounded-3xl overflow-hidden flex items-end p-8 group">
          <img
            src={IMAGES.RISK_TECH_6}
            alt="Technical Validation"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('tech_val.hero.title')}</h1>
              <p className="text-muted-foreground">
                {t('tech_val.hero.desc')}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-md p-3 rounded-2xl border border-border/50 shadow-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <select
                className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
              >
                {mockAIServices.map(service => (
                  <option key={service.id} value={service.id}>
                    {t(service.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Key Metrics Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('tech_val.metrics.security')}
              value={validationData.securityScore}
              unit="/100"
              icon={ShieldCheck}
              trend="UP"
              trendValue="2.4%"
              color="primary"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('tech_val.metrics.explainability')}
              value={validationData.explainabilityScore}
              unit="/100"
              icon={Eye}
              trend="STABLE"
              color="chart-2"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('tech_val.metrics.red_teaming')}
              value={redTeamingSuccessRate}
              unit="%"
              icon={Target}
              trend="DOWN"
              trendValue="1.2%"
              color="chart-3"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('tech_val.metrics.bias')}
              value={Math.max(...validationData.biasMetrics.map(b => b.biasScore))}
              unit="pt"
              icon={AlertTriangle}
              trend="UP"
              trendValue="0.05"
              color="destructive"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Bias Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springPresets.gentle}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-chart-3/10">
                  <Database className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t('tech_val.bias_map.title')}</h3>
                  <p className="text-xs text-muted-foreground">{t('tech_val.bias_map.desc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-chart-3" /> {t('tech_val.bias_map.safe')}
                  <span className="w-2 h-2 rounded-full bg-destructive ml-2" /> {t('tech_val.bias_map.high')}
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <BiasHeatmap data={validationData.biasMetrics} />
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border/50 text-sm">
              <p className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 text-primary" />
                <span dangerouslySetInnerHTML={{ __html: t('tech_val.bias_map.insight') }} />
              </p>
            </div>
          </motion.div>

          {/* XAI Heatmap / Feature Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springPresets.gentle}
            className="bg-card border border-border rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-chart-1/10">
                  <Eye className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t('tech_val.xai.title')}</h3>
                  <p className="text-xs text-muted-foreground">{t('tech_val.xai.desc')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {validationData.xaiHeatmap.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="font-mono">{t(item.feature)}</span>
                    <span className="text-primary">{(item.impact * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.impact * 100}%` }}
                      transition={{ ...springPresets.gentle, delay: idx * 0.1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center">
              <img
                src={IMAGES.DATA_VIZ_6}
                alt="XAI Visualization"
                className="w-full h-32 object-cover rounded-2xl opacity-80 border border-border/30"
              />
            </div>
          </motion.div>
        </div>

        {/* Red Teaming Log */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-destructive/10">
                <Target className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('tech_val.log.title')}</h3>
                <p className="text-xs text-muted-foreground">{t('tech_val.log.desc')}</p>
              </div>
            </div>
            <div className="text-sm font-medium px-3 py-1 bg-muted rounded-full border border-border">
              {t('tech_val.log.last_run')}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4 font-semibold">{t('tech_val.log.th_scenario')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('tech_val.log.th_status')}</th>
                  <th className="px-6 py-4 font-semibold">{t('tech_val.log.th_details')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {validationData.redTeamingLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-mono text-[10px] text-muted-foreground">
                          0{idx + 1}
                        </div>
                        <span className="text-sm font-medium">{t(log.scenario)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {log.status === 'PASSED' ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-chart-3/10 text-chart-3 text-xs font-bold">
                            <CheckCircle2 className="w-3 h-3" /> {t('tech_val.log.status_passed')}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                            <XCircle className="w-3 h-3" /> {t('tech_val.log.status_failed')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {t(log.details)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-muted/10 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                <AlertTriangle className="w-4 h-4" />
                {t('tech_val.log.alert')}
              </div>
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]">
                {t('tech_val.log.btn_guide')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Orchestrator Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6" />
                <h4 className="text-xl font-bold">{t('tech_val.agent.title')}</h4>
              </div>
              <p className="text-primary-foreground/80 mb-6">
                {t('tech_val.agent.desc')}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-background flex items-center justify-center text-[10px] text-primary font-bold">
                      Agent
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
                  {t('tech_val.agent.last_sync')}
                </span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-card border-2 border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-bold mb-2">{t('tech_val.scan.title')}</h4>
            <p className="text-sm text-muted-foreground mb-6">
              {t('tech_val.scan.desc')}
            </p>
            <button className="w-full py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
              {t('tech_val.scan.btn_start')}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
