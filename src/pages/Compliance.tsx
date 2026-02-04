import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import {
  MetricCard,
  ComplianceCard,
} from "../components/Cards";
import { ComplianceChart } from "../components/Charts";
import { complianceData } from "../data/index";
import { IMAGES } from "../assets/images";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Globe,
  History,
  ExternalLink,
  Scale,
  Gavel,
} from "lucide-react";
import { motion } from "framer-motion";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "../lib/motion";

const Compliance = () => {
  const { t } = useTranslation();
  const totalCompliance = Math.round(
    complianceData.reduce((acc, curr) => acc + curr.complianceRate, 0) / complianceData.length
  );

  const totalMandatory = complianceData.reduce((acc, curr) => acc + curr.mandatoryCount, 0);
  const totalCompleted = complianceData.reduce((acc, curr) => acc + curr.completedCount, 0);

  return (
    <Layout>
      <div className="space-y-8 p-6 lg:p-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 lg:p-12">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={springPresets.gentle}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('compliance.hero.tag')}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t('compliance.hero.title')}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t('compliance.hero.desc')}
                </p>
              </motion.div>
            </div>
            <div className="hidden lg:block w-72 h-48">
              <img
                src={IMAGES.COMPLIANCE_8}
                alt="Compliance"
                className="w-full h-full object-cover rounded-2xl shadow-2xl transform rotate-3"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </section>

        {/* Top Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('compliance.metrics.rate')}
              value={totalCompliance}
              unit="%"
              trend="UP"
              trendValue="3.2%"
              icon={ShieldCheck}
              color="oklch(0.68 0.16 150)"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('compliance.metrics.items')}
              value={`${totalCompleted}/${totalMandatory}`}
              unit="개"
              trend="STABLE"
              icon={Scale}
              color="oklch(0.52 0.18 265)"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('compliance.metrics.issues')}
              value={totalMandatory - totalCompleted}
              unit="건"
              trend="DOWN"
              trendValue="2건"
              icon={AlertTriangle}
              color="oklch(0.55 0.18 25)"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <MetricCard
              title={t('compliance.metrics.updates')}
              value="12"
              unit="건"
              trend="UP"
              trendValue="최근 30일"
              icon={History}
              color="oklch(0.65 0.14 195)"
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Compliance Chart & Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold">{t('compliance.chart.title')}</h2>
                  <p className="text-sm text-muted-foreground">{t('compliance.chart.desc')}</p>
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="h-[400px] w-full">
                <ComplianceChart data={complianceData} />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceData.map((data, idx) => (
                <motion.div
                  key={data.lawName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springPresets.gentle, delay: idx * 0.1 }}
                >
                  <ComplianceCard {...(data as any)} lawName={t(data.lawName)} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Guidelines & Updates */}
          <div className="space-y-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-6 overflow-hidden relative"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-primary" />
                  {t('compliance.report.title')}
                </h3>
                <div className="space-y-4">
                  {[
                    { title: t('compliance.report.items.1.title'), date: "2026-01-28", category: t('compliance.report.items.1.cat') },
                    { title: t('compliance.report.items.2.title'), date: "2026-01-25", category: t('compliance.report.items.2.cat') },
                    { title: t('compliance.report.items.3.title'), date: "2026-01-15", category: t('compliance.report.items.3.cat') },
                    { title: t('compliance.report.items.4.title'), date: "2026-01-05", category: t('compliance.report.items.4.cat') }
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer p-3 rounded-xl hover:bg-muted transition-all border border-transparent hover:border-border">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">{item.category}</span>
                        <span className="text-[10px] text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{item.title}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-accent transition-colors">
                  {t('compliance.report.btn_all')}
                </button>
              </div>
              <img src={IMAGES.DATA_VIZ_9} className="absolute bottom-0 right-0 w-32 opacity-5 pointer-events-none" alt="decoration" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold mb-2">{t('compliance.agent.title')}</h3>
              <p className="text-sm opacity-90 mb-6">
                {t('compliance.agent.desc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs">{t('compliance.agent.monitoring')}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <FileText className="w-4 h-4 opacity-70" />
                  <span className="text-xs">{t('compliance.agent.update')}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-xl bg-white text-primary text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg">
                {t('compliance.agent.btn_start')}
              </button>
            </motion.div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">{t('compliance.alert.title')}</h3>
                  <p className="text-xs text-muted-foreground">{t('compliance.alert.desc')}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {t('compliance.alert.content')}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">
                  {t('compliance.alert.btn_plan')}
                </button>
                <button className="px-4 py-2 rounded-lg border border-border text-xs font-medium">
                  {t('compliance.alert.btn_detail')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Footer Message */}
        <footer className="text-center py-10 opacity-50">
          <p className="text-sm italic">
            {t('compliance.footer.disclaimer')}
          </p>
          <p className="text-xs mt-2">© 2026 AI Governance Orchestrator Sentinel. All Rights Reserved.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default Compliance;
