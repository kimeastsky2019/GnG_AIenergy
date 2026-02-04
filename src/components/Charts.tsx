import React from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { motion } from "framer-motion";
import { TechnicalValidation, RISK_LEVELS } from "@/lib/index";

// --- Styles ---
const CHART_COLORS = {
  primary: "oklch(0.52 0.18 265)",
  secondary: "oklch(0.65 0.14 195)",
  success: "oklch(0.68 0.16 150)",
  warning: "oklch(0.78 0.15 75)",
  danger: "oklch(0.62 0.17 35)",
  critical: "oklch(0.55 0.18 25)",
  muted: "oklch(0.45 0.03 265 / 0.2)",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl">
        <p className="text-xs font-semibold text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- RiskTrendChart ---
interface RiskTrendChartProps {
  data?: { month: string; risk: number; safety: number }[];
}

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  const { t } = useTranslation();
  const defaultData = [
    { month: "9월", risk: 45, safety: 55 },
    { month: "10월", risk: 52, safety: 48 },
    { month: "11월", risk: 38, safety: 62 },
    { month: "12월", risk: 65, safety: 35 },
    { month: "1월", risk: 42, safety: 58 },
  ];

  const chartData = data || defaultData;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.danger} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.danger} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="risk"
            name={t('charts.risk_index')}
            stroke={CHART_COLORS.danger}
            fillOpacity={1}
            fill="url(#colorRisk)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="safety"
            name={t('charts.safety_index')}
            stroke={CHART_COLORS.success}
            fill="transparent"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- BiasHeatmap (Implemented as Horizontal Bar for clarity) ---
interface BiasHeatmapProps {
  data: TechnicalValidation["biasMetrics"];
}

export function BiasHeatmap({ data }: BiasHeatmapProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 40 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
          <XAxis
            type="number"
            domain={[0, 0.5]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            type="category"
            dataKey="group"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--foreground)", fontSize: 11, fontWeight: 500 }}
            tickFormatter={(val) => t(val)}
            width={100}
          />
          <Tooltip
            cursor={{ fill: 'var(--muted)', opacity: 0.1 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border p-2 rounded shadow-lg text-xs">
                    <p className="font-bold">{t(payload[0].payload.group)}</p>
                    <p className="text-destructive">{t('charts.bias')}: {(payload[0].value as number * 100).toFixed(1)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="biasScore"
            radius={[0, 4, 4, 0]}
            barSize={24}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.biasScore > 0.15 ? CHART_COLORS.danger : CHART_COLORS.primary}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- PerformanceChart (Drift Monitoring) ---
export function PerformanceChart() {
  const { t } = useTranslation();
  const data = [
    { time: "00:00", accuracy: 98, drift: 0.01 },
    { time: "04:00", accuracy: 97, drift: 0.02 },
    { time: "08:00", accuracy: 98, drift: 0.01 },
    { time: "12:00", accuracy: 94, drift: 0.08 },
    { time: "16:00", accuracy: 92, drift: 0.12 },
    { time: "20:00", accuracy: 95, drift: 0.05 },
    { time: "24:00", accuracy: 96, drift: 0.03 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <Tooltip />
          <Legend iconType="circle" verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="accuracy"
            name={t('charts.accuracy')}
            stroke={CHART_COLORS.primary}
            strokeWidth={3}
            dot={{ r: 4, fill: CHART_COLORS.primary }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="drift"
            name={t('charts.drift')}
            stroke={CHART_COLORS.warning}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- ComplianceChart (Radial Progress) ---
interface ComplianceChartProps {
  data: { lawName: string; complianceRate: number }[];
}

export function ComplianceChart({ data }: ComplianceChartProps) {
  const { t } = useTranslation();
  const sortedData = [...data].sort((a, b) => b.complianceRate - a.complianceRate);

  const chartData = sortedData.map((item, index) => ({
    name: t(item.lawName),
    uv: item.complianceRate,
    fill: index === 0 ? CHART_COLORS.success : index === 1 ? CHART_COLORS.primary : CHART_COLORS.secondary,
  }));

  return (
    <div className="w-full h-[350px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={chartData}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
            background
            dataKey="uv"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{
              top: '50%',
              right: 0,
              transform: 'translate(0, -50%)',
              lineHeight: '24px',
              fontSize: '12px'
            }}
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
