import React from "react";
import { motion } from "framer-motion";
import { Shield, Activity, FileCheck, Zap, ArrowRight, CheckCircle2, AlertTriangle, Search, ShieldCheck, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { MetricCard, RiskStatusCard } from "@/components/Cards";
import { IMAGES } from "@/assets/images";
import { ROUTE_PATHS } from "@/lib/index";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function Home() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border">
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.DASHBOARD_HERO_ILLUSTRATION}
              alt="AI Risk Management Dashboard"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>{t('hero.tagline')}</span>
                <button onClick={toggleLanguage} className="ml-4 flex items-center gap-1 hover:underline">
                  <Globe className="w-3 h-3" /> {i18n.language.toUpperCase()}
                </button>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                {t('hero.title_1')} <br />
                <span className="text-primary">{t('hero.title_2')}</span>{t('hero.title_3')}
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 max-w-2xl">
                {t('hero.description')}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to={ROUTE_PATHS.DEMO}>
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                    {t('hero.cta_demo')} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold border border-border hover:bg-accent transition-all">
                  {t('hero.cta_download')}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3-Layer Architecture Section */}
        <section className="py-24 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('architecture.title')}</h2>
              <p className="text-muted-foreground">{t('architecture.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('architecture.governance.title'),
                  desc: t('architecture.governance.desc'),
                  icon: FileCheck,
                  features: t('architecture.governance.features', { returnObjects: true }) as string[]
                },
                {
                  title: t('architecture.technical.title'),
                  desc: t('architecture.technical.desc'),
                  icon: ShieldCheck,
                  features: t('architecture.technical.features', { returnObjects: true }) as string[]
                },
                {
                  title: t('architecture.monitoring.title'),
                  desc: t('architecture.monitoring.desc'),
                  icon: Activity,
                  features: t('architecture.monitoring.features', { returnObjects: true }) as string[]
                }
              ].map((layer, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                    <layer.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{layer.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{layer.desc}</p>
                  <ul className="mt-auto space-y-3">
                    {layer.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights with Real UI components */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('command_center.title')}</h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {t('command_center.description')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MetricCard
                    title={t('command_center.active_services')}
                    value={42}
                    unit={t('units.count')}
                    trend="UP"
                    trendValue="12%"
                    icon={Activity}
                    color="primary"
                  />
                  <MetricCard
                    title={t('command_center.avg_risk_score')}
                    value={24}
                    unit={t('units.pts')}
                    trend="DOWN"
                    trendValue="5%"
                    icon={AlertTriangle}
                    color="destructive"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl" />
                <div className="relative space-y-4">
                  <RiskStatusCard
                    title={t('home.risk_card.title')}
                    description={t('home.risk_card.desc')}
                    level="HIGH"
                    serviceCount={1}
                  />
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-lg">
                    <img
                      src={IMAGES.DATA_VIZ_ILLUSTRATION}
                      alt="Data Visualization Preview"
                      className="w-full h-48 object-cover rounded-lg mb-4 opacity-80"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">{t('command_center.compliance_rate')}</span>
                      <span className="text-primary font-bold">94.2%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-primary h-full w-[94.2%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Automation Section (Body Logic) */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          {/* Background Illustration */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-3/4 opacity-10 pointer-events-none">
            <img src={IMAGES.BODY_LOGIC_ILLUSTRATION} className="w-full h-full object-contain" alt="" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8 text-foreground">{t('automation.title')}</motion.h2>
              <div className="space-y-12">
                <motion.div variants={fadeInUp} className="flex gap-6 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{t('automation.scanner.title')}</h4>
                    <p className="text-muted-foreground">{t('automation.scanner.desc')}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-6 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{t('automation.agent.title')}</h4>
                    <p className="text-muted-foreground">{t('automation.agent.desc')}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-6 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{t('automation.escalation.title')}</h4>
                    <p className="text-muted-foreground">{t('automation.escalation.desc')}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-6 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-foreground">{t('automation.sllm.title')}</h4>
                    <p className="text-muted-foreground">{t('automation.sllm.desc')}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[2rem] p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('cta_footer.title')}</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                {t('cta_footer.description')}
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to={ROUTE_PATHS.SLLM_AUTOMATION} className="px-10 py-5 bg-white text-primary rounded-2xl font-bold hover:bg-white/90 transition-all">
                  {t('cta_footer.cta_sllm')}
                </Link>
                <button className="px-10 py-5 bg-primary-foreground/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all">
                  {t('cta_footer.cta_consult')}
                </button>
                <button className="px-10 py-5 bg-primary-foreground/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all">
                  {t('cta_footer.cta_trial')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-xl">AI Sentinel</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.terms')}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('footer.support')}</a>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
