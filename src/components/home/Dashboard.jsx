import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const heroStatistics = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 10, suffix: '+', label: 'Industries served' },
];

const whyXentroxFeatures = [
  {
    id: 'strategy',
    numeral: '01',
    titleLine1: 'Data-Driven',
    titleLine2: 'Strategy',
    title: 'Data-Driven Strategy',
    description: 'Precision analytics, market intelligence, and conversion architectures designed for sustainable scale.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M5 5v22h22" />
        <path d="m24 11-6.5 6.5-4.5-4.5-4.5 4.5" />
        <path d="M18 11h6v6" />
      </svg>
    ),
  },
  {
    id: 'engineering',
    numeral: '02',
    titleLine1: 'In-House',
    titleLine2: 'Engineering',
    title: 'In-House Engineering',
    description: 'High-velocity web apps, mobile products, and cloud infrastructure engineered by senior developers.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <polyline points="20 23 28 16 20 9" />
        <polyline points="12 9 4 16 12 23" />
      </svg>
    ),
  },
  {
    id: 'reporting',
    numeral: '03',
    titleLine1: 'Transparent',
    titleLine2: 'Reporting',
    title: 'Transparent Reporting',
    description: 'Live client portals, weekly milestone reviews, and clear KPI roadmaps with zero hidden vanity metrics.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M16 28s10-5 10-12.5V7l-10-3.5L6 7v8.5C6 23 16 28 16 28z" />
        <path d="m12 16 3 3 5.5-5.5" />
      </svg>
    ),
  },
  {
    id: 'team',
    numeral: '04',
    titleLine1: 'Dedicated',
    titleLine2: 'Growth Team',
    title: 'Dedicated Growth Team',
    description: 'An agile, cross-functional pod of developers, UI/UX designers, and growth experts aligned with your goals.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-8">
        <path d="M21 26v-2.5a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5V26" />
        <circle cx="12" cy="10" r="4.5" />
        <path d="M28 26v-2.5a5 5 0 0 0-3.8-4.85" />
        <path d="M20 5.65a4.5 4.5 0 0 1 0 8.7" />
      </svg>
    ),
  },
];

const ourProcessSteps = [
  {
    step: '01',
    tag: 'RESEARCH & AUDIT',
    title: 'Discover',
    description: 'Audit your market, audience and existing digital presence to find the real growth levers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4.35-4.35" />
      </svg>
    ),
  },
  {
    step: '02',
    tag: 'ROADMAP & GOALS',
    title: 'Strategize',
    description: 'Build a channel plan and roadmap mapped to specific, trackable business goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
        <path d="M12 21s-6-5.25-6-10a6 6 0 1 1 12 0c0 4.75-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
  {
    step: '03',
    tag: 'BUILD & LAUNCH',
    title: 'Execute',
    description: 'Design, build and launch – campaigns, content and code shipped by one integrated pod.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    step: '04',
    tag: 'SCALE & GROWTH',
    title: 'Optimize',
    description: 'Continuous testing and reporting to compound performance month over month.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 5-6" />
        <path d="M16 7h3v3" />
      </svg>
    ),
  },
];

const chartMonths = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
const chartYAxisTicks = [
  { label: '100%', value: 100 },
  { label: '80%', value: 80 },
  { label: '60%', value: 60 },
  { label: '40%', value: 40 },
  { label: '20%', value: 20 },
  { label: '0', value: 0 },
];

const industriesWeServe = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    chartType: 'smooth-line',
    accentColor: '#2196F3',
    secondaryColor: '#90CAF9',
    accentDark: '#1565C0',
    accentSoft: 'rgba(33, 150, 243, 0.14)',
    metrics: [
      { label: 'Patient Growth:', value: '+148%' },
      { label: 'Appointment Rate:', value: '94.2%' },
      { label: 'Treatment Success:', value: '98.6%' },
    ],
    description:
      'Advanced patient management systems with secure data handling, real-time diagnostic reporting, and automated clinical workflows. Tailored for modern healthcare infrastructure to improve patient outcomes and operational efficiency.',
    chartCaption: 'Patient Growth & Clinical Appointment Velocity (Q1 - Q4)',
    legend: [
      { label: 'Patient Growth', color: '#2196F3' },
      { label: 'Appointment Rate', color: '#90CAF9' },
    ],
    chartValues: [18, 36, 48, 68, 82, 98],
    secondaryValues: [30, 44, 56, 72, 85, 94],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
      </svg>
    ),
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    chartType: 'area',
    accentColor: '#16A34A',
    secondaryColor: '#86EFAC',
    accentDark: '#166534',
    accentSoft: 'rgba(22, 163, 74, 0.14)',
    metrics: [
      { label: 'Conversion Lift:', value: '+142%' },
      { label: 'Checkout Speed:', value: '1.4s' },
      { label: 'Repeat Buyers:', value: '68.5%' },
    ],
    description:
      'High-converting headless storefronts, unified inventory synchronization, and data-led retention journeys engineered to maximize average order value and customer lifetime revenue across channels.',
    chartCaption: 'Omnichannel Conversion Lift & Repeat Buyer Share (Q1 - Q4)',
    legend: [
      { label: 'Conversion Lift', color: '#16A34A' },
      { label: 'Repeat Buyers', color: '#86EFAC' },
    ],
    chartValues: [16, 32, 51, 66, 84, 97],
    secondaryValues: [10, 22, 35, 48, 59, 69],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 7H6.2" />
      </svg>
    ),
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    chartType: 'vertical-bar',
    accentColor: '#F59E0B',
    secondaryColor: '#FDE68A',
    accentDark: '#B45309',
    accentSoft: 'rgba(245, 158, 11, 0.15)',
    metrics: [
      { label: 'Property Sales:', value: '+176%' },
      { label: 'Lead Conversion:', value: '38.4%' },
      { label: 'Booking Growth:', value: '3.8x' },
    ],
    description:
      'Interactive property discovery portals, automated CRM lead routing, and high-intent search acquisition frameworks built for residential developers, commercial brokerages, and property groups.',
    chartCaption: 'Property Sales & Site Booking Growth (Q1 - Q4)',
    legend: [
      { label: 'Property Sales', color: '#F59E0B' },
      { label: 'Booking Growth', color: '#FBBF24' },
    ],
    chartValues: [28, 42, 56, 72, 85, 96],
    secondaryValues: [20, 31, 44, 58, 70, 84],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="m3 10.5 9-7.5 9 7.5" />
        <path d="M5 9v11h14V9" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    id: 'food-hospitality',
    title: 'Food & Hospitality',
    chartType: 'donut',
    accentColor: '#F97316',
    secondaryColor: '#EF4444',
    accentDark: '#C2410C',
    accentSoft: 'rgba(249, 115, 22, 0.15)',
    metrics: [
      { label: 'Customer Visits:', value: '+192%' },
      { label: 'Table Bookings:', value: '88.5%' },
      { label: 'Repeat Customers:', value: '74.0%' },
    ],
    description:
      'Commission-free direct ordering ecosystems, real-time table reservation engines, and hyper-local brand campaigns crafted for multi-location restaurants, cloud kitchens, and hospitality groups.',
    chartCaption: 'Hospitality Revenue & Engagement Distribution (Q1 - Q4)',
    legend: [
      { label: 'Customer Visits', color: '#F97316' },
      { label: 'Table Bookings', color: '#EF4444' },
      { label: 'Repeat Customers', color: '#F59E0B' },
    ],
    donutSegments: [
      { label: 'Customer Visits', share: 45, metricValue: '+192% YoY', color: '#F97316' },
      { label: 'Table Bookings', share: 33, metricValue: '88.5% Fill', color: '#EF4444' },
      { label: 'Repeat Customers', share: 22, metricValue: '74.0% Ret.', color: '#F59E0B' },
    ],
    chartValues: [22, 38, 52, 68, 84, 96],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M4 3v7a3 3 0 0 0 6 0V3" />
        <path d="M7 3v18" />
        <path d="M17 3c-2.2 0-4 2.2-4 5 0 2.2 1.2 4 3 4.7V21h2V3h-1z" />
      </svg>
    ),
  },
  {
    id: 'education',
    title: 'Education',
    chartType: 'horizontal-bar',
    accentColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    accentDark: '#6D28D9',
    accentSoft: 'rgba(139, 92, 246, 0.15)',
    metrics: [
      { label: 'Student Enrolment:', value: '+210%' },
      { label: 'Course Completion:', value: '92.6%' },
      { label: 'Learning Growth:', value: '4.2x' },
    ],
    description:
      'Scalable learning management platforms, live virtual classroom infrastructure, and full-funnel student acquisition systems built for universities, EdTech platforms, and training institutes.',
    chartCaption: 'Academic Enrolment & Completion Benchmarks (Q1 - Q4)',
    legend: [
      { label: 'Current Performance', color: '#8B5CF6' },
      { label: 'Sector Benchmark', color: '#DDD6FE' },
    ],
    horizontalBars: [
      { label: 'Student Enrolment', value: 96, display: '+210%' },
      { label: 'Course Completion', value: 93, display: '92.6%' },
      { label: 'Learning Growth', value: 86, display: '4.2x' },
      { label: 'Cohort Retention', value: 89, display: '89.4%' },
    ],
    chartValues: [15, 35, 53, 67, 86, 98],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12.5v4.5c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
        <path d="M22 10v6" />
      </svg>
    ),
  },
  {
    id: 'finance',
    title: 'Finance',
    chartType: 'multi-line',
    accentColor: '#1E40AF',
    secondaryColor: '#0D9488',
    accentDark: '#1E3A8A',
    accentSoft: 'rgba(30, 64, 175, 0.14)',
    metrics: [
      { label: 'Revenue Growth:', value: '+184%' },
      { label: 'Transaction Volume:', value: '$4.8B' },
      { label: 'Customer Acquisition:', value: '+164%' },
    ],
    description:
      'Enterprise-grade financial analytics dashboards, automated KYC verification workflows, and encrypted reporting architectures designed for fintech platforms, wealth managers, and institutions.',
    chartCaption: 'Revenue Growth vs. Transaction Volume Trajectory (Q1 - Q4)',
    legend: [
      { label: 'Revenue Growth', color: '#1E40AF' },
      { label: 'Transaction Volume', color: '#0D9488' },
    ],
    chartValues: [22, 39, 56, 73, 87, 98],
    secondaryValues: [12, 26, 43, 59, 76, 91],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.4-1-1.3-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.2 0-2.1-.5-2.5-1.5" />
        <path d="M12 6.5v11" />
      </svg>
    ),
  },
  {
    id: 'logistics',
    title: 'Logistics',
    chartType: 'combo-bar-line',
    accentColor: '#2563EB',
    secondaryColor: '#F59E0B',
    accentDark: '#1D4ED8',
    accentSoft: 'rgba(37, 99, 235, 0.14)',
    metrics: [
      { label: 'Delivery Performance:', value: '98.4%' },
      { label: 'Order Volume:', value: '+156%' },
      { label: 'On-Time Delivery:', value: '97.8%' },
    ],
    description:
      'Real-time fleet telemetry dashboards, automated dispatch coordination, and end-to-end shipment tracking portals that eliminate bottlenecks and reduce last-mile operational overhead.',
    chartCaption: 'Order Volume (Columns) & On-Time Delivery Rate (Line)',
    legend: [
      { label: 'Order Volume', color: '#F59E0B' },
      { label: 'On-Time Delivery', color: '#2563EB' },
    ],
    chartValues: [58, 68, 76, 85, 92, 98],
    barValues: [32, 46, 60, 74, 86, 94],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7V9z" />
        <circle cx="7.5" cy="17.5" r="2" />
        <circle cx="17.5" cy="17.5" r="2" />
      </svg>
    ),
  },
  {
    id: 'saas-tech',
    title: 'SaaS & Tech',
    chartType: 'gradient-area',
    accentColor: '#0891B2',
    secondaryColor: '#67E8F9',
    accentDark: '#0E7490',
    accentSoft: 'rgba(8, 145, 178, 0.15)',
    metrics: [
      { label: 'Active Users:', value: '840K+' },
      { label: 'Subscription Growth:', value: '+240%' },
      { label: 'Customer Retention:', value: '118%' },
    ],
    description:
      'Cloud-native product engineering, scalable microservice architectures, and full-funnel B2B demand generation systems that accelerate product-led growth and enterprise adoption.',
    chartCaption: 'Active Users & Subscription Expansion Curve (Q1 - Q4)',
    legend: [
      { label: 'Subscription Growth', color: '#0891B2' },
      { label: 'Net Retention', color: '#06B6D4' },
    ],
    chartValues: [12, 29, 49, 72, 88, 100],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M17.5 19H7a4.5 4.5 0 0 1-.4-8.98A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 9.5z" />
      </svg>
    ),
  },
];

function buildSmoothChartGeometry(values) {
  const startX = 48;
  const endX = 498;
  const topY = 18;
  const bottomY = 182;
  const stepX = (endX - startX) / (values.length - 1);

  const points = values.map((val, idx) => ({
    x: startX + idx * stepX,
    y: bottomY - (Math.max(0, Math.min(100, val)) / 100) * (bottomY - topY),
    value: val,
    month: chartMonths[idx],
  }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = Math.max(topY, Math.min(bottomY, p1.y + (p2.y - p0.y) / 6));
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = Math.max(topY, Math.min(bottomY, p2.y - (p3.y - p1.y) / 6));

    linePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;

  return { points, linePath, areaPath, startX, endX, topY, bottomY };
}

function IndustryChart({ industry, idPrefix = 'desktop' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const primaryGeom = buildSmoothChartGeometry(industry.chartValues);
  const secondaryGeom = industry.secondaryValues
    ? buildSmoothChartGeometry(industry.secondaryValues)
    : null;
  const gradId = `chartGrad-${idPrefix}-${industry.id}`;
  const secGradId = `chartSecGrad-${idPrefix}-${industry.id}`;

  const renderStandardGrid = () => (
    <>
      {chartYAxisTicks.map((tick) => {
        const y =
          primaryGeom.bottomY -
          (tick.value / 100) * (primaryGeom.bottomY - primaryGeom.topY);
        return (
          <g key={tick.label}>
            <text
              x={primaryGeom.startX - 10}
              y={y + 3.5}
              textAnchor="end"
              className="fill-[#64748b] text-[10px] font-medium"
            >
              {tick.label}
            </text>
            <line
              x1={primaryGeom.startX}
              y1={y}
              x2={primaryGeom.endX}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {primaryGeom.points.map((pt) => (
        <g key={pt.month}>
          <line
            x1={pt.x}
            y1={primaryGeom.topY}
            x2={pt.x}
            y2={primaryGeom.bottomY}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
          <text
            x={pt.x}
            y={primaryGeom.bottomY + 20}
            textAnchor="middle"
            className="fill-[#475569] text-[10.5px] font-semibold"
          >
            {pt.month}
          </text>
        </g>
      ))}

      <line
        x1={primaryGeom.startX}
        y1={primaryGeom.topY}
        x2={primaryGeom.startX}
        y2={primaryGeom.bottomY}
        stroke="#cbd5e1"
        strokeWidth="1"
      />
      <line
        x1={primaryGeom.startX}
        y1={primaryGeom.bottomY}
        x2={primaryGeom.endX}
        y2={primaryGeom.bottomY}
        stroke="#cbd5e1"
        strokeWidth="1"
      />
    </>
  );

  return (
    <div className="mt-5 pt-1">
      {/* Legend Row */}
      {industry.legend && (
        <div className="mb-2.5 flex flex-wrap items-center justify-end gap-4">
          {industry.legend.map((item) => (
            <div key={item.label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#475569]">
              <span
                className="size-2.5 rounded-xs"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative w-full rounded-xl bg-white">
        <svg
          viewBox="0 0 520 214"
          className="h-auto w-full overflow-visible select-none"
          role="img"
          aria-label={`${industry.title} – ${industry.chartCaption}`}
        >
          {/* 1. HEALTHCARE: Smooth Line Chart (Blue #2196F3) */}
          {industry.chartType === 'smooth-line' && (
            <>
              {renderStandardGrid()}
              {secondaryGeom && (
                <path
                  d={secondaryGeom.linePath}
                  fill="none"
                  stroke={industry.secondaryColor}
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                />
              )}
              <path
                d={primaryGeom.linePath}
                fill="none"
                stroke={industry.accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="sector-chart-line"
              />
              {primaryGeom.points.map((pt, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <g
                    key={pt.month}
                    className="sector-chart-point cursor-pointer"
                    style={{ animationDelay: `${idx * 75 + 100}ms` }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
                    {isHovered && <circle cx={pt.x} cy={pt.y} r="8" fill={industry.accentSoft} />}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '5.5' : '4.5'}
                      fill="#ffffff"
                      stroke={industry.accentColor}
                      strokeWidth="2.75"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      className="fill-[#1e293b] text-[9.5px] font-bold"
                    >
                      {pt.value}%
                    </text>
                  </g>
                );
              })}
            </>
          )}

          {/* 2. RETAIL & E-COMMERCE: Area Chart (Green #16A34A) */}
          {industry.chartType === 'area' && (
            <>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={industry.accentColor} stopOpacity="0.36" />
                  <stop offset="80%" stopColor={industry.accentColor} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={industry.accentColor} stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id={secGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={industry.secondaryColor} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={industry.secondaryColor} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {renderStandardGrid()}
              {secondaryGeom && (
                <>
                  <path d={secondaryGeom.areaPath} fill={`url(#${secGradId})`} className="sector-chart-area" />
                  <path
                    d={secondaryGeom.linePath}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                </>
              )}
              <path d={primaryGeom.areaPath} fill={`url(#${gradId})`} className="sector-chart-area" />
              <path
                d={primaryGeom.linePath}
                fill="none"
                stroke={industry.accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                pathLength="1"
                className="sector-chart-line"
              />
              {primaryGeom.points.map((pt, idx) => (
                <g
                  key={pt.month}
                  className="sector-chart-point"
                  style={{ animationDelay: `${idx * 75 + 100}ms` }}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.2"
                    fill={industry.accentColor}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              ))}
            </>
          )}

          {/* 3. REAL ESTATE: Vertical Bar Chart (Orange #F59E0B) */}
          {industry.chartType === 'vertical-bar' && (
            <>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
              {renderStandardGrid()}
              {primaryGeom.points.map((pt, idx) => {
                const barWidth = 20;
                const secVal = industry.secondaryValues?.[idx] ?? 0;
                const secY =
                  primaryGeom.bottomY -
                  (secVal / 100) * (primaryGeom.bottomY - primaryGeom.topY);
                const primaryHeight = primaryGeom.bottomY - pt.y;
                const secHeight = primaryGeom.bottomY - secY;

                return (
                  <g key={pt.month} className="sector-chart-bar" style={{ animationDelay: `${idx * 70}ms` }}>
                    {/* Primary Bar: Property Sales */}
                    <rect
                      x={pt.x - barWidth - 2}
                      y={pt.y}
                      width={barWidth}
                      height={primaryHeight}
                      rx="4"
                      fill={`url(#${gradId})`}
                    />
                    {/* Secondary Bar: Booking Growth */}
                    <rect
                      x={pt.x + 2}
                      y={secY}
                      width={barWidth}
                      height={secHeight}
                      rx="4"
                      fill="#FCD34D"
                    />
                    <text
                      x={pt.x - barWidth / 2 - 2}
                      y={pt.y - 6}
                      textAnchor="middle"
                      className="fill-[#B45309] text-[9.5px] font-bold"
                    >
                      {pt.value}%
                    </text>
                  </g>
                );
              })}
            </>
          )}

          {/* 4. FOOD & HOSPITALITY: Donut Chart (Orange & Warm Red) */}
          {industry.chartType === 'donut' && (() => {
            const cx = 128;
            const cy = 104;
            const radius = 64;
            const circumference = 2 * Math.PI * radius;
            let cumulativePercent = 0;

            return (
              <g>
                {/* Background Track Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="24"
                />

                {/* Donut Segments */}
                {industry.donutSegments.map((seg, idx) => {
                  const strokeDasharray = `${(seg.share / 100) * circumference - 4} ${circumference}`;
                  const strokeDashoffset = -((cumulativePercent / 100) * circumference);
                  cumulativePercent += seg.share;

                  return (
                    <circle
                      key={seg.label}
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="24"
                      strokeLinecap="butt"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      transform={`rotate(-90 ${cx} ${cy})`}
                      className="sector-chart-donut"
                      style={{ animationDelay: `${idx * 110}ms` }}
                    />
                  );
                })}

                {/* Center KPI Callout */}
                <text
                  x={cx}
                  y={cy - 4}
                  textAnchor="middle"
                  className="fill-[#0f172a] text-[20px] font-extrabold"
                >
                  +192%
                </text>
                <text
                  x={cx}
                  y={cy + 14}
                  textAnchor="middle"
                  className="fill-[#64748b] text-[9.5px] font-bold uppercase tracking-wider"
                >
                  Total Growth
                </text>

                {/* Right-side Breakdown Panel */}
                {industry.donutSegments.map((seg, idx) => {
                  const rowY = 42 + idx * 54;
                  const barTrackWidth = 230;
                  const barFillWidth = (seg.share / 55) * barTrackWidth;

                  return (
                    <g key={seg.label}>
                      <circle cx="242" cy={rowY} r="5.5" fill={seg.color} />
                      <text
                        x="256"
                        y={rowY + 4}
                        className="fill-[#0f172a] text-[12px] font-bold"
                      >
                        {seg.label}
                      </text>
                      <text
                        x="494"
                        y={rowY + 4}
                        textAnchor="end"
                        className="fill-[#334155] text-[11.5px] font-extrabold"
                      >
                        {seg.metricValue} ({seg.share}%)
                      </text>
                      <rect
                        x="256"
                        y={rowY + 12}
                        width={barTrackWidth + 8}
                        height="8"
                        rx="4"
                        fill="#f1f5f9"
                      />
                      <rect
                        x="256"
                        y={rowY + 12}
                        width={barFillWidth}
                        height="8"
                        rx="4"
                        fill={seg.color}
                        className="sector-chart-hbar"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* 5. EDUCATION: Horizontal Bar Chart (Purple #8B5CF6) */}
          {industry.chartType === 'horizontal-bar' && (() => {
            const labelRightX = 148;
            const barStartX = 160;
            const barMaxWidth = 310;

            return (
              <g>
                {/* Vertical Grid Ticks */}
                {[0, 25, 50, 75, 100].map((tick) => {
                  const x = barStartX + (tick / 100) * barMaxWidth;
                  return (
                    <g key={tick}>
                      <line
                        x1={x}
                        y1="16"
                        x2={x}
                        y2="180"
                        stroke="#e2e8f0"
                        strokeDasharray={tick === 0 ? undefined : '3 3'}
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y="198"
                        textAnchor="middle"
                        className="fill-[#64748b] text-[10px] font-semibold"
                      >
                        {tick}%
                      </text>
                    </g>
                  );
                })}

                {industry.horizontalBars.map((bar, idx) => {
                  const rowY = 26 + idx * 38;
                  const fillWidth = (bar.value / 100) * barMaxWidth;
                  return (
                    <g key={bar.label}>
                      <text
                        x={labelRightX}
                        y={rowY + 14}
                        textAnchor="end"
                        className="fill-[#1e293b] text-[11px] font-bold"
                      >
                        {bar.label}
                      </text>
                      <rect
                        x={barStartX}
                        y={rowY}
                        width={barMaxWidth}
                        height="20"
                        rx="6"
                        fill="#f3e8ff"
                      />
                      <rect
                        x={barStartX}
                        y={rowY}
                        width={fillWidth}
                        height="20"
                        rx="6"
                        fill={idx % 2 === 0 ? '#8B5CF6' : '#7C3AED'}
                        className="sector-chart-hbar"
                        style={{ animationDelay: `${idx * 80}ms` }}
                      />
                      <text
                        x={barStartX + fillWidth + 8}
                        y={rowY + 14}
                        className="fill-[#5B21B6] text-[10.5px] font-extrabold"
                      >
                        {bar.display}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })()}

          {/* 6. FINANCE: Multi-Line Chart (Dark Blue #1E40AF & Teal #0D9488) */}
          {industry.chartType === 'multi-line' && (
            <>
              {renderStandardGrid()}
              {/* Line 2: Transaction Volume (Teal) */}
              {secondaryGeom && (
                <>
                  <path
                    d={secondaryGeom.linePath}
                    fill="none"
                    stroke={industry.secondaryColor}
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    className="sector-chart-line"
                  />
                  {secondaryGeom.points.map((pt, idx) => (
                    <circle
                      key={`sec-${pt.month}`}
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#ffffff"
                      stroke={industry.secondaryColor}
                      strokeWidth="2.5"
                      className="sector-chart-point"
                      style={{ animationDelay: `${idx * 75 + 140}ms` }}
                    />
                  ))}
                </>
              )}

              {/* Line 1: Revenue Growth (Dark Blue) */}
              <path
                d={primaryGeom.linePath}
                fill="none"
                stroke={industry.accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="sector-chart-line"
              />
              {primaryGeom.points.map((pt, idx) => (
                <g
                  key={`pri-${pt.month}`}
                  className="sector-chart-point"
                  style={{ animationDelay: `${idx * 75 + 90}ms` }}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill={industry.accentColor}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 9}
                    textAnchor="middle"
                    className="fill-[#1E3A8A] text-[9.5px] font-bold"
                  >
                    {pt.value}%
                  </text>
                </g>
              ))}
            </>
          )}

          {/* 7. LOGISTICS: Vertical Bar + Line Combination Chart (Amber & Blue) */}
          {industry.chartType === 'combo-bar-line' && (
            <>
              {renderStandardGrid()}
              {/* Amber Bars: Order Volume */}
              {primaryGeom.points.map((pt, idx) => {
                const barVal = industry.barValues?.[idx] ?? 50;
                const barY =
                  primaryGeom.bottomY -
                  (barVal / 100) * (primaryGeom.bottomY - primaryGeom.topY);
                const barHeight = primaryGeom.bottomY - barY;
                const barWidth = 30;

                return (
                  <rect
                    key={`bar-${pt.month}`}
                    x={pt.x - barWidth / 2}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="5"
                    fill="#F59E0B"
                    fillOpacity="0.88"
                    className="sector-chart-bar"
                    style={{ animationDelay: `${idx * 65}ms` }}
                  />
                );
              })}

              {/* Blue Line: On-Time Delivery */}
              <path
                d={primaryGeom.linePath}
                fill="none"
                stroke={industry.accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="sector-chart-line"
              />
              {primaryGeom.points.map((pt, idx) => (
                <g
                  key={`line-${pt.month}`}
                  className="sector-chart-point"
                  style={{ animationDelay: `${idx * 75 + 140}ms` }}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill={industry.accentColor}
                    stroke="#ffffff"
                    strokeWidth="2.2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 9}
                    textAnchor="middle"
                    className="fill-[#1D4ED8] text-[9.5px] font-extrabold"
                  >
                    {pt.value}%
                  </text>
                </g>
              ))}
            </>
          )}

          {/* 8. SAAS & TECH: Gradient Area + Stem Chart (Cyan #0891B2) */}
          {industry.chartType === 'gradient-area' && (
            <>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891B2" stopOpacity="0.42" />
                  <stop offset="65%" stopColor="#06B6D4" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {renderStandardGrid()}
              <path d={primaryGeom.areaPath} fill={`url(#${gradId})`} className="sector-chart-area" />
              {primaryGeom.points.map((pt) => (
                <line
                  key={`stem-${pt.month}`}
                  x1={pt.x}
                  y1={pt.y}
                  x2={pt.x}
                  y2={primaryGeom.bottomY}
                  stroke="#0891B2"
                  strokeOpacity="0.28"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
              ))}
              <path
                d={primaryGeom.linePath}
                fill="none"
                stroke={industry.accentColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="sector-chart-line"
              />
              {primaryGeom.points.map((pt, idx) => (
                <g
                  key={pt.month}
                  className="sector-chart-point"
                  style={{ animationDelay: `${idx * 75 + 100}ms` }}
                >
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="#0891B2"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 10}
                    textAnchor="middle"
                    className="fill-[#0E7490] text-[9.5px] font-extrabold"
                  >
                    {pt.value}%
                  </text>
                </g>
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Bottom Chart Caption */}
      <p className="m-0 mt-2 text-center text-xs font-bold tracking-tight text-[#0f172a] sm:text-[13px]">
        {industry.chartCaption}
      </p>
    </div>
  );
}

const clientTestimonials = [
  {
    rating: 5,
    quote:
      '"XentroX rebuilt our SEO and web platform from the ground up — inquiries from organic search doubled within the first quarter. We\'ve continued to be impressed by their execution and recommend them to everyone!"',
    name: 'Ramesh Kumar',
    role: 'Founder, GreenRoots Organics',
  },
  {
    rating: 5,
    quote:
      '"The team designed and shipped our real-time fleet dashboard in weeks, not months, and it hasn\'t gone down once. Their engineering precision completely transformed our daily dispatch operations."',
    name: 'Anjali Nair',
    role: 'Ops Lead, Flowline Logistics',
  },
  {
    rating: 5,
    quote:
      '"From brand identity to our high-converting e-commerce launch campaign, XentroX gave our brand a voice that actually sounds like us and scaled our direct-to-consumer sales."',
    name: 'Sana Merin',
    role: 'Co-founder, Aura Skincare',
  },
  {
    rating: 5,
    quote:
      '"Working with XentroX was the most seamless agency experience we\'ve ever had. Their dedicated pod delivered our patient portal ahead of schedule with 99.9% uptime."',
    name: 'Dr. Vikram Mehta',
    role: 'Medical Director, CarePulse Diagnostics',
  },
  {
    rating: 5,
    quote:
      '"Their data-driven performance marketing and custom CRM automation cut our lead acquisition cost by 42% while doubling qualified property bookings."',
    name: 'Karthik Rajendran',
    role: 'VP of Growth, Skyline Estates',
  },
];

function MagneticLink({ to, variant, children, onClick, className = '' }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    event.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const resetPosition = (event) => {
    event.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  const variantClasses = variant === 'primary'
    ? 'border border-emerald-950/20 bg-[#064B38] text-white shadow-md shadow-emerald-950/15 hover:bg-[#083e30] hover:shadow-lg'
    : 'border border-emerald-900/20 bg-white/95 text-[#062c23] shadow-xs hover:border-emerald-800/40 hover:bg-white';

  const isHash = typeof to === 'string' && to.startsWith('#');
  const commonClasses = `inline-flex min-h-[2.65rem] sm:min-h-[2.9rem] cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 text-[0.84rem] sm:text-[0.88rem] font-semibold no-underline transition-[transform,background-color,border-color,box-shadow,color] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635] sm:px-6 sm:py-2.5 ${variantClasses} ${className}`;

  if (isHash) {
    return (
      <a
        href={to}
        onClick={onClick}
        className={commonClasses}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPosition}
        onPointerCancel={resetPosition}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={commonClasses}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      {children}
    </Link>
  );
}

function Dashboard() {
  const heroStatsRef = useRef(null);
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  const activeIndustry = industriesWeServe[activeIndustryIndex] || industriesWeServe[0];

  useEffect(() => {
    if (isTestimonialPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % clientTestimonials.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isTestimonialPaused]);

  useEffect(() => {
    let hasStarted = false;
    let animations = [];

    const startCounters = () => {
      if (hasStarted) return;
      const nodes = heroStatsRef.current?.querySelectorAll('[data-stat-count]');
      if (!nodes?.length) return;
      hasStarted = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        nodes.forEach((node) => {
          node.textContent = node.dataset.statCount;
        });
        return;
      }

      animations = Array.from(nodes, (node, index) => {
        const counter = { value: 0 };
        const target = Number(node.dataset.statCount);
        return animate(counter, {
          value: target,
          delay: index * 110,
          duration: 1200,
          ease: 'outExpo',
          onUpdate: () => { node.textContent = String(Math.floor(counter.value)); },
          onComplete: () => { node.textContent = String(target); },
        });
      });
    };

    const introAlreadyFinished = document.querySelector('[data-logo-intro-complete="true"]');
    const introIsRunning = document.querySelector('[data-logo-intro-active="true"]');
    if (introAlreadyFinished || !introIsRunning) startCounters();
    else window.addEventListener('xentrox:logo-intro-complete', startCounters);

    return () => {
      window.removeEventListener('xentrox:logo-intro-complete', startCounters);
      animations.forEach((animation) => animation.pause());
    };
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 1: HERO LANDING */}
      {/* ========================================================================= */}
      <section
        className="relative isolate left-1/2 -ml-[50vw] -mt-24 flex w-screen flex-col justify-between overflow-hidden bg-[#eef8f2] text-[#062c23] max-sm:-mt-20 max-sm:min-h-0 pt-24 pb-12 max-sm:pb-12 sm:min-h-[100svh] sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-0"
      >
        {/* Hero Background Image */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat max-sm:bg-[75%_center] sm:bg-[center_right] lg:bg-[right_center]"
          style={{
            backgroundImage: "url('/hero-landing.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Luminous soft scrim to guarantee pristine contrast for left-side content */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:via-white/75 lg:from-white/92 lg:via-white/55 lg:to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_65%_85%_at_20%_48%,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0)_100%)]"
          aria-hidden="true"
        />

        <svg
          className="pointer-events-none absolute right-[-8%] top-[17%] z-[2] h-[min(58vw,34rem)] w-[min(68vw,54rem)] opacity-70 motion-reduce:hidden max-sm:right-[-20%] max-sm:top-[16%] max-sm:h-[65vw] max-sm:w-[82vw]"
          viewBox="0 0 800 500"
          fill="none"
          aria-hidden="true"
        >
          <g transform="rotate(-17 400 250)">
            <ellipse
              cx="400"
              cy="250"
              rx="340"
              ry="185"
              stroke="#16A36A"
              strokeOpacity="0.28"
              strokeWidth="1.5"
            />
            <circle r="14" fill="#84CC16" fillOpacity="0.2">
              <animateMotion
                dur="16s"
                repeatCount="indefinite"
                path="M 400 65 A 340 185 0 1 1 399.9 65 A 340 185 0 1 1 400 65"
              />
            </circle>
            <circle r="5.5" fill="#84CC16">
              <animateMotion
                dur="16s"
                repeatCount="indefinite"
                path="M 400 65 A 340 185 0 1 1 399.9 65 A 340 185 0 1 1 400 65"
              />
            </circle>
          </g>
        </svg>

        {/* Seamless multi-stop glowing light-green dissolve into Section 2 (#EBF5EE -> #FAF9F6) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 sm:h-40 lg:h-48"
          style={{
            background:
              'linear-gradient(180deg, rgba(235, 245, 238, 0) 0%, rgba(196, 238, 208, 0.38) 38%, rgba(220, 242, 227, 0.78) 72%, #EBF5EE 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-8 z-[2] h-20 opacity-80 sm:-bottom-10 sm:h-28"
          style={{
            background:
              'radial-gradient(ellipse 70% 100% at 48% 50%, rgba(142, 228, 170, 0.45) 0%, rgba(235, 245, 238, 0) 75%)',
          }}
          aria-hidden="true"
        />

        {/* Hero Content (Left-Aligned, elevated slightly for optimal balance) */}
        <div className="home-nav-type relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 items-center max-sm:translate-y-0 sm:-translate-y-10 lg:-translate-y-14 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-xl py-4 text-left lg:max-w-[560px]">

            {/* Main Headline */}
            <h1
              id="home-hero-title"
              aria-label="Digital Marketing & Custom Software Solutions"
              className="m-0 text-[clamp(1.75rem,2.8vw,2.75rem)] font-bold leading-[1.14] tracking-[-0.03em] text-[#062c23]"
            >
              <span>Digital Marketing &amp;</span>
              <span className="mt-1.5 block bg-gradient-to-r from-[#064B38] via-[#16A36A] to-[#65a30d] bg-clip-text text-transparent">
                Custom Software Solutions
              </span>
            </h1>

            {/* Action Buttons */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-start gap-3 sm:mt-7">
              <span className="hidden sm:inline-flex">
                <MagneticLink to="/enroll" variant="primary">
                  Get Started
                  <Icon name="arrowRight" size={15} />
                </MagneticLink>
              </span>
              <MagneticLink to="/services" variant="secondary">
                Our Services
                <Icon name="arrowRight" size={15} />
              </MagneticLink>
            </div>

            {/* Stats Counter Row (Clean 3-column horizontal layout on mobile, horizontal flex on desktop) */}
            <div
              ref={heroStatsRef}
              className="mt-5 grid grid-cols-3 gap-2 w-full max-sm:max-w-md max-sm:mx-auto sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-7 sm:w-auto sm:max-w-none"
              role="group"
              aria-label="XentroX in numbers"
            >
              {heroStatistics.map(({ value, suffix, label }, idx) => (
                <div
                  key={label}
                  className="flex items-center justify-center sm:justify-start gap-0 sm:gap-7"
                >
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="m-0 text-[1.25rem] font-bold leading-none tracking-tight text-[#062c23] sm:text-[1.75rem]">
                      <span data-stat-count={value}>0</span>
                      <span className="text-[#16a34a]">{suffix}</span>
                    </p>
                    <p className="mb-0 mt-1.5 text-[7.5px] font-bold uppercase tracking-[0.05em] text-[#062c23]/70 sm:text-[10px] sm:tracking-[0.14em]">
                      {idx === 0 ? (
                        <>
                          <span className="block sm:inline">PROJECTS </span>
                          <span className="block sm:inline">DELIVERED</span>
                        </>
                      ) : idx === 1 ? (
                        <>
                          <span className="block sm:inline">CLIENT </span>
                          <span className="block sm:inline">SATISFACTION</span>
                        </>
                      ) : (
                        <>
                          <span className="block sm:inline">INDUSTRIES </span>
                          <span className="block sm:inline">SERVED</span>
                        </>
                      )}
                    </p>
                  </div>
                  {idx < heroStatistics.length - 1 && (
                    <span className="hidden h-7 w-px bg-emerald-950/15 sm:block sm:h-8" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHY XENTROX (EDITORIAL ASYMMETRIC SPLIT & BOTANICAL SHADOWS) */}
      {/* ========================================================================= */}
      <section
        id="why-xentrox"
        className="relative left-1/2 -ml-[50vw] -mt-1 w-screen overflow-hidden px-[max(1.25rem,calc((100vw-1340px)/2))] pt-14 pb-16 text-[#0b261c] sm:pt-18 sm:pb-20 lg:pt-20 lg:pb-24"
        style={{
          background:
            'radial-gradient(ellipse 75% 42% at 48% 0%, rgba(168, 231, 188, 0.38) 0%, rgba(215, 240, 223, 0.2) 52%, transparent 100%), radial-gradient(ellipse 55% 50% at 18% 88%, rgba(188, 220, 198, 0.45) 0%, transparent 70%), linear-gradient(180deg, #EBF5EE 0%, #F2F7F3 32%, #FAF9F6 74%, #EEF5F0 100%)',
        }}
      >
        {/* Subtle Organic Digital Grain Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.032]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Soft Window-Pane & Botanical Palm/Leaf Shadow Overlays on the Right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full overflow-hidden lg:w-[68%]"
          aria-hidden="true"
        >
          {/* Window Pane Dappled Light & Shadow Bars */}
          <div
            className="absolute inset-0 opacity-55"
            style={{
              background:
                'linear-gradient(96deg, transparent 0%, rgba(162, 186, 170, 0.16) 36%, rgba(255, 255, 255, 0.55) 48%, rgba(154, 179, 162, 0.22) 60%, rgba(255, 255, 255, 0.5) 73%, rgba(145, 172, 155, 0.26) 88%, rgba(132, 160, 142, 0.32) 100%)',
            }}
          />

          {/* Soft-Focus Botanical Palm & Leaf Shadows (Top-Right & Right Edge) */}
          <svg
            className="pointer-events-none absolute -top-10 -right-8 h-[115%] w-[680px] text-[#5e7d68]/24"
            viewBox="0 0 700 700"
            fill="currentColor"
            aria-hidden="true"
          >
            <defs>
              <filter id="hero-leaf-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" />
              </filter>
            </defs>
            <g filter="url(#hero-leaf-blur)">
              {/* Main arching palm frond shadow */}
              <path d="M710,40 C580,10 430,45 310,120 C410,95 530,85 680,105 Z" />
              {/* Individual botanical leaflets */}
              <ellipse cx="420" cy="42" rx="85" ry="11" transform="rotate(-24 420 42)" />
              <ellipse cx="475" cy="54" rx="95" ry="12" transform="rotate(-18 475 54)" />
              <ellipse cx="535" cy="70" rx="102" ry="13" transform="rotate(-12 535 70)" />
              <ellipse cx="385" cy="96" rx="82" ry="10" transform="rotate(18 385 96)" />
              <ellipse cx="445" cy="112" rx="98" ry="12" transform="rotate(22 445 112)" />
              <ellipse cx="510" cy="128" rx="108" ry="13" transform="rotate(26 510 128)" />
              <ellipse cx="575" cy="145" rx="110" ry="13" transform="rotate(30 575 145)" />
              {/* Second lower right frond shadow */}
              <path d="M720,210 C610,175 495,195 405,255 C485,235 590,235 705,260 Z" />
              <ellipse cx="515" cy="198" rx="88" ry="11" transform="rotate(-16 515 198)" />
              <ellipse cx="575" cy="212" rx="96" ry="12" transform="rotate(-10 575 212)" />
              <ellipse cx="490" cy="252" rx="92" ry="11" transform="rotate(24 490 252)" />
              <ellipse cx="555" cy="272" rx="104" ry="12" transform="rotate(28 555 272)" />
              <ellipse cx="620" cy="294" rx="108" ry="13" transform="rotate(32 620 294)" />
              {/* Soft vertical window mullion shadow */}
              <rect x="335" y="0" width="24" height="700" fill="currentColor" fillOpacity="0.32" />
              <rect x="520" y="0" width="28" height="700" fill="currentColor" fillOpacity="0.28" />
              <rect x="335" y="340" width="380" height="18" fill="currentColor" fillOpacity="0.22" />
            </g>
          </svg>
        </div>

        {/* Main Asymmetric 12-Column Container */}
        <div className="relative z-10 mx-auto w-full max-w-[1300px]">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* LEFT COLUMN (5/12): Editorial Copy + Candid Studio Team Photo on Far Left */}
            <div className="flex flex-col justify-between lg:col-span-5" data-scroll-reveal>
              <div>
                {/* Small, delicate '— WHY XENTROX —' Sub-Headline */}
                <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a3a2d] sm:text-xs">
                  <span className="h-[1px] w-5 bg-[#1a3a2d]/70" aria-hidden="true" />
                  <span>WHY XENTROX</span>
                  <span className="h-[1px] w-5 bg-[#1a3a2d]/70" aria-hidden="true" />
                </div>

                {/* Main Headline: Bold dark forest green + soft dark charcoal */}
                <h2 className="mt-4 text-[clamp(2.1rem,3.4vw,3.1rem)] leading-[1.12] tracking-[-0.03em]">
                  <span className="font-extrabold text-[#062b1f]">
                    Built for measurable
                    <br />
                    growth,
                  </span>{' '}
                  <span className="font-normal text-[#1f2e28]">
                    not vanity metrics.
                  </span>
                </h2>

                {/* 'Our Approach →' Underlined Editorial Text Link */}
                <div className="mt-6">
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-2 border-b border-[#142e24]/55 pb-1 text-[15px] font-normal text-[#142e24] no-underline transition-colors duration-200 hover:border-[#064B38] hover:text-[#064B38] sm:text-[17px]"
                  >
                    <span>Our Approach</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* Candid Studio Team Collaboration Photo on the Far Left — Feathered Seamlessly into the Background */}
              <div className="relative mt-7 mx-auto sm:mt-9 lg:mx-0 lg:-ml-4">
                <div
                  className="relative overflow-hidden"
                  style={{
                    WebkitMaskImage:
                      'radial-gradient(ellipse 88% 84% at 46% 52%, #000 58%, rgba(0,0,0,0.68) 76%, transparent 100%)',
                    maskImage:
                      'radial-gradient(ellipse 88% 84% at 46% 52%, #000 58%, rgba(0,0,0,0.68) 76%, transparent 100%)',
                  }}
                >
                  <img
                    src="/why-xentrox-team.jpg"
                    alt="Diverse XentroX team collaborating naturally in a sunlit studio"
                    className="block h-auto w-full max-w-[500px] object-cover mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7/12): 4 Borderless Editorial Focus Blocks in a 2x2 Grid */}
            <div
              className="lg:col-span-7 lg:pt-28 xl:pt-32 lg:pl-8"
              data-scroll-reveal
              data-reveal-from="bottom"
              style={{ '--reveal-delay': '120ms' }}
            >
              <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:gap-y-20">
                {whyXentroxFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="group relative flex flex-col items-start"
                  >
                    {/* Minimalist Sage Green Icon + Tiny Numeral Accent (01, 02, 03, 04) */}
                    <div className="flex items-center gap-3">
                      <div className="text-[#5e7f69] transition-transform duration-300 group-hover:scale-105 group-hover:text-[#064B38]">
                        {feature.icon}
                      </div>
                      <span className="font-sans text-xs font-medium tracking-[0.06em] text-[#4c6756]">
                        {feature.numeral}
                      </span>
                    </div>

                    {/* Bold Two-Line Dark Green/Charcoal Title */}
                    <h3 className="mt-3.5 text-[clamp(1.3rem,1.85vw,1.6rem)] font-bold leading-[1.18] tracking-[-0.02em] text-[#0b221a]">
                      <span className="block">{feature.titleLine1}</span>
                      <span className="block">{feature.titleLine2}</span>
                    </h3>

                    {/* Editorial Body Copy */}
                    <p className="mt-2.5 max-w-full text-[13.5px] leading-[1.62] text-[#22312b] sm:mt-3 sm:max-w-[290px] sm:text-[14.5px]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2.5: HOW WE WORK (OUR PROCESS) */}
      {/* ========================================================================= */}
      <section
        id="how-we-work"
        className="our-process-section relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#f9fcfa] px-[max(1.25rem,calc((100vw-1320px)/2))] py-16 text-[#0f172a] sm:py-20 lg:py-24"
      >
        {/* Subtle Light-Green Geometric Background Shapes */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 1440 640"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <polygon points="0,0 340,0 190,260 0,180" fill="#eaf6ef" fillOpacity="0.7" />
          <polygon points="1440,0 1120,0 1280,290 1440,210" fill="#e5f4ec" fillOpacity="0.65" />
          <polygon points="0,640 0,430 240,520 310,640" fill="#e8f5ee" fillOpacity="0.6" />
          <polygon points="1440,640 1160,640 1260,450 1440,390" fill="#eaf6ef" fillOpacity="0.7" />
          <polygon points="620,40 760,10 820,120 680,150" fill="#edf8f1" fillOpacity="0.55" />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[1280px]">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[#16A36A] sm:text-[13px]">
              HOW WE WORK
            </p>

            <h2 className="mt-2.5 text-[clamp(2rem,3.3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#0f172a]">
              <span>Our </span>
              <span className="text-[#16A36A]">Process</span>
            </h2>

            <p className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-[#475569] sm:text-[15px]">
              A four-stage process, refined across every engagement, that takes an idea from brief to measurable results.
            </p>
          </div>

          {/* Four Process Cards Row */}
          <div className="relative mt-12 sm:mt-14">
            {/* Subtle horizontal connecting line across all 4 cards (Desktop only) */}
            <div
              className="pointer-events-none absolute top-1/2 right-12 left-12 z-0 hidden h-[2px] -translate-y-1/2 bg-[#cde7d8] lg:block"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {ourProcessSteps.map((step, index) => (
                <div key={step.title} className="relative flex">
                  <article className="our-process-card flex h-full w-full flex-col rounded-[18px] border border-[#e2e8f0] border-b-[5px] border-b-[#16A36A] bg-white p-6 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.06)] sm:p-7">
                    {/* Light-green circular icon background + Green SVG icon */}
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e8f7ee] text-[#16A36A]">
                      {step.icon}
                    </div>

                    {/* Stage Label */}
                    <span className="mt-5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#16A36A]">
                      {step.tag}
                    </span>

                    {/* Card Heading */}
                    <h3 className="mt-1.5 text-xl font-bold tracking-tight text-[#0f172a] sm:text-[22px]">
                      {step.title}
                    </h3>

                    {/* Card Description */}
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#475569] sm:text-sm">
                      {step.description}
                    </p>
                  </article>

                  {/* Circular green arrow icon between cards on desktop */}
                  {index < ourProcessSteps.length - 1 && (
                    <div
                      className="pointer-events-none absolute top-1/2 -right-4 z-20 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center lg:flex"
                      aria-hidden="true"
                    >
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-[#16A36A] text-white shadow-xs">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3.5"
                        >
                          <path d="M3.5 8h9" />
                          <path d="m8.5 4 4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2.75: WHO WE SERVE (OUR SECTOR IMPACT) */}
      {/* ========================================================================= */}
      <section
        id="who-we-serve"
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#f4f9f7] px-[max(1.25rem,calc((100vw-1280px)/2))] py-16 text-[#0f172a] sm:py-20 lg:py-24"
      >
        {/* Subtle Architectural Facade Watermark on Top-Right (matching reference) */}
        <svg
          className="pointer-events-none absolute top-0 right-0 z-0 h-[420px] w-[520px] opacity-35"
          viewBox="0 0 520 420"
          fill="none"
          aria-hidden="true"
        >
          <polygon points="220,0 520,0 520,420 120,420" fill="url(#sectorArchGrad)" />
          <line x1="250" y1="0" x2="140" y2="420" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="330" y1="0" x2="220" y2="420" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="410" y1="0" x2="300" y2="420" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="490" y1="0" x2="380" y2="420" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="180" y1="70" x2="520" y2="140" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="160" y1="160" x2="520" y2="230" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="140" y1="250" x2="520" y2="320" stroke="#cbd5e1" strokeWidth="1" />
          <defs>
            <linearGradient id="sectorArchGrad" x1="200" y1="0" x2="520" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#dce9e5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#f4f9f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          {/* Section Heading (Centered) */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-[#064B38]">
              <span className="h-0.5 w-6 rounded-full bg-[#16A36A]" />
              <span>WHO WE SERVE</span>
              <span className="h-0.5 w-6 rounded-full bg-[#16A36A]" />
            </div>
            <h2 className="mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0f172a]">
              Our Sector Impact
            </h2>
          </div>

          {/* Two-Column Interactive Layout (Inline Accordion on Mobile/Tablet, Side-by-Side on Desktop) */}
          <div className="mt-8 grid grid-cols-1 items-center gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] lg:gap-12">
            {/* LEFT: Vertical Timeline & 8 Sector Selector List */}
            <div className="relative" role="tablist" aria-label="Industries we serve">
              {/* Continuous Vertical Timeline Track */}
              <div
                className="pointer-events-none absolute top-6 bottom-6 left-[9px] w-[1.5px] bg-[#cbd5e1]"
                aria-hidden="true"
              />

              <div className="flex flex-col">
                {industriesWeServe.map((industry, idx) => {
                  const isActive = idx === activeIndustryIndex;
                  return (
                    <div key={industry.id} className="relative">
                      {/* Industry Selector Row */}
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`sector-panel-${industry.id}`}
                        id={`sector-tab-${industry.id}`}
                        onClick={() => {
                          setActiveIndustryIndex(idx);
                        }}
                        className="group relative flex w-full cursor-pointer items-center gap-3.5 rounded-xl py-2.5 pl-9 sm:gap-4 sm:pl-11 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A36A]"
                      >
                        {/* Timeline Dot (Always centered vertically with the icon) */}
                        <span
                          className={`pointer-events-none absolute top-1/2 left-[9px] z-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'size-3.5 border-2 border-white'
                              : 'size-2 bg-[#cbd5e1] group-hover:bg-[#94a3b8]'
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: industry.accentDark,
                                  boxShadow: `0 0 0 4px ${industry.accentSoft}`,
                                }
                              : undefined
                          }
                          aria-hidden="true"
                        />

                        {/* Circular Icon Badge */}
                        <span
                          className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:size-12 ${
                            isActive
                              ? 'border-transparent text-white'
                              : 'border-[#d8e3df] bg-[#edf3f0] text-[#0f172a] shadow-[0_2px_6px_rgba(15,23,42,0.06)] group-hover:border-[#94b8a8] group-hover:bg-white'
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: industry.accentDark,
                                  boxShadow: `0 0 0 4px ${industry.accentSoft}, 0 6px 16px -3px rgba(15, 23, 42, 0.22)`,
                                }
                              : undefined
                          }
                        >
                          {industry.icon}
                        </span>

                        {/* Industry Label */}
                        <span
                          className={`text-[15px] sm:text-base transition-colors duration-200 ${
                            isActive
                              ? 'font-bold text-[#064B38]'
                              : 'font-semibold text-[#1e293b] group-hover:text-[#064B38]'
                          }`}
                          style={isActive ? { color: industry.accentDark } : undefined}
                        >
                          {industry.title}
                        </span>
                      </button>

                      {/* MOBILE & TABLET INLINE IMPACT CARD (< lg): Opens directly below selected industry */}
                      {isActive && (
                        <div className="mt-2 mb-4 pl-5 sm:pl-11 lg:hidden">
                          <div className="sector-impact-card relative rounded-2xl border border-[#8ab0a1]/70 bg-white p-4 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.1)] sm:p-6">
                            {/* Header */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="m-0 text-lg font-bold tracking-tight text-[#0f172a] sm:text-xl">
                                {industry.title}
                              </h3>
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                style={{
                                  backgroundColor: industry.accentSoft,
                                  color: industry.accentDark,
                                }}
                              >
                                <span
                                  className="size-1.5 rounded-full"
                                  style={{ backgroundColor: industry.accentColor }}
                                />
                                Verified Impact
                              </span>
                            </div>

                            {/* 3 Key Metrics */}
                            <div className="mt-4 grid grid-cols-3 gap-2 border-b border-[#e2e8f0] pb-4 sm:gap-4">
                              {industry.metrics.map((metric) => (
                                <div key={metric.label} className="min-w-0">
                                  <p className="m-0 truncate text-[10px] font-medium text-[#475569] sm:text-xs">
                                    {metric.label}
                                  </p>
                                  <p className="m-0 mt-0.5 text-base font-extrabold tracking-tight text-[#0f172a] sm:text-xl">
                                    {metric.value}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Industry-Specific Chart (Mobile/Tablet) */}
                            <IndustryChart industry={industry} idPrefix="mobile" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Desktop Detail & Analytics Card (lg and above) */}
            <div
              key={activeIndustry.id}
              id={`sector-panel-${activeIndustry.id}`}
              role="tabpanel"
              aria-labelledby={`sector-tab-${activeIndustry.id}`}
              className="sector-impact-card relative hidden rounded-[18px] border border-[#8ab0a1]/70 bg-white p-6 shadow-[0_18px_45px_-15px_rgba(15,23,42,0.1)] sm:p-8 lg:block lg:p-9"
            >
              {/* Top Heading */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
                  {activeIndustry.title}
                </h3>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: activeIndustry.accentSoft,
                    color: activeIndustry.accentDark,
                  }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: activeIndustry.accentColor }}
                  />
                  Verified Impact
                </span>
              </div>

              {/* 3 Key Metrics Row */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-b border-[#e2e8f0] pb-5 sm:gap-6">
                {activeIndustry.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="m-0 text-[11px] font-medium text-[#475569] sm:text-xs">
                      {metric.label}
                    </p>
                    <p className="m-0 mt-1 text-lg font-extrabold tracking-tight text-[#0f172a] sm:text-2xl">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Industry-Specific Chart (Desktop) */}
              <IndustryChart industry={activeIndustry} idPrefix="desktop" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2.85: TESTIMONIALS (TRUSTED BY CLIENTS & INDUSTRY EXPERTS) */}
      {/* ========================================================================= */}
      <section
        id="testimonials"
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#f8fbf9] px-[max(1.25rem,calc((100vw-1240px)/2))] py-16 text-[#062c23] sm:py-20 lg:py-24"
      >
        {/* Subtle Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-hero-grid opacity-25 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1240px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT COLUMN: Accent Rule, Heading, Description & Action */}
            <div className="lg:col-span-5" data-scroll-reveal>
              {/* Top Accent Line + Eyebrow */}
              <div className="mb-5">
                <div className="h-[3px] w-20 rounded-full bg-[#16A36A]" aria-hidden="true" />
                <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#064B38]">
                  TESTIMONIALS
                </span>
              </div>

              {/* Heading matching 2nd reference screenshot */}
              <h2 className="m-0 text-[clamp(1.85rem,3vw,2.65rem)] font-extrabold leading-[1.16] tracking-[-0.03em] text-[#062c23]">
                Trusted By Clients And Industry Experts Alike
              </h2>

              {/* Body Copy matching 2nd reference screenshot format */}
              <p className="mt-5 text-sm leading-[1.78] text-[#475569] sm:text-[15px]">
                We partner with ambitious brands across industries while making business owners less stressed, more productive, and measurably more profitable. We&apos;re honored and humbled by the great feedback we receive from our clients on a daily basis. We&apos;re proud to measure our client satisfaction rate at 98%, growing every year.
              </p>

              {/* Outlined CTA Button matching bottom-left of 2nd reference screenshot */}
              <div className="mt-7">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-md border border-[#94b8a8] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#062c23] shadow-2xs transition-colors duration-200 hover:border-[#064B38] hover:bg-[#064B38] hover:text-white"
                >
                  Read Client Stories
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: White Review Card Carousel (No Photo, Reviews Only + Dot Click One-by-One) */}
            <div
              className="lg:col-span-7"
              data-scroll-reveal
              data-reveal-from="bottom"
              style={{ '--reveal-delay': '120ms' }}
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              {/* Main White Review Card */}
              <div className="relative overflow-hidden rounded-xl border border-[#dce8e2] bg-white shadow-[0_18px_48px_-15px_rgba(6,44,35,0.1)]">
                {/* Oversized Soft Quote Mark Watermark at Bottom-Right (matching 2nd screenshot) */}
                <svg
                  className="pointer-events-none absolute right-6 -bottom-3 z-0 h-24 w-24 text-[#16A36A]/14 sm:right-8 sm:h-28 sm:w-28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Horizontal One-by-One Sliding Carousel Track */}
                <div
                  className="relative z-10 flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateX(-${activeTestimonialIndex * 100}%)`,
                  }}
                  aria-live="polite"
                >
                  {clientTestimonials.map((testimonial, idx) => {
                    const isCurrent = idx === activeTestimonialIndex;
                    return (
                      <article
                        key={testimonial.name}
                        aria-hidden={!isCurrent}
                        className="w-full shrink-0 px-5 pt-6 pb-8 sm:px-10 sm:pt-10 sm:pb-12"
                      >
                        {/* Reviewer Name & Role Header (No Photo, matching 2nd screenshot typography) */}
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#edf4f0] pb-5">
                          <div>
                            <h3 className="m-0 text-xl font-bold tracking-tight text-[#16A36A] sm:text-2xl">
                              {testimonial.name}
                            </h3>
                            <p className="m-0 mt-1 text-sm font-medium text-[#475569] sm:text-[15px]">
                              {testimonial.role}
                            </p>
                          </div>

                          {/* Google Review Icon + 5 Gold Stars */}
                          <div
                            className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 shadow-2xs"
                            aria-label={`Google Review: ${testimonial.rating} out of 5 stars`}
                          >
                            {/* Authentic Multi-Color Google 'G' Icon */}
                            <svg
                              className="size-4 shrink-0"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fill="#4285F4"
                                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                              />
                            </svg>

                            {/* 5 Google Gold Stars (#FBBC05) */}
                            <div className="flex items-center gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="size-4 text-[#FBBC05]"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>

                            <span className="text-xs font-bold text-[#0f172a]">
                              5.0
                            </span>
                          </div>
                        </div>

                        {/* Italic Review Quote */}
                        <blockquote className="m-0 mt-6 pr-2 text-[15px] italic leading-[1.8] text-[#334155] sm:text-[16.5px]">
                          {testimonial.quote}
                        </blockquote>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Dot Click One-by-One Controls */}
              <div
                className="mt-6 flex items-center justify-center gap-2.5"
                role="tablist"
                aria-label="Choose client testimonial"
              >
                {clientTestimonials.map((testimonial, idx) => {
                  const isActive = idx === activeTestimonialIndex;
                  return (
                    <button
                      key={testimonial.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show review ${idx + 1} by ${testimonial.name}`}
                      onClick={() => setActiveTestimonialIndex(idx)}
                      className={`h-2.5 cursor-pointer rounded-full border-0 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A36A] ${
                        isActive
                          ? 'w-8 bg-[#16A36A] shadow-[0_2px_8px_rgba(22,163,106,0.4)]'
                          : 'w-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: NEXT SECTION (WHAT'S NEXT / CTA) */}
      {/* ========================================================================= */}
      <section
        id="next-section"
        className="relative left-1/2 -ml-[50vw] -mb-8 max-sm:mb-0 w-screen overflow-hidden bg-gradient-to-b from-[#eff5f2] via-[#eef4f1] to-[#e9f0ec] px-[max(1.25rem,calc((100vw-1200px)/2))] py-14 text-[#062c23] sm:py-20 lg:py-24"
      >
        {/* Soft Ambient Luminous Backdrop */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[38rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(126, 217, 154, 0.22) 0%, rgba(126, 217, 154, 0.12) 35%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1160px]">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-scroll-reveal
              style={{ '--reveal-delay': '90ms' }}
              className="text-[clamp(1.9rem,3.3vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#092119]"
            >
              Ready to transform your vision
              <br />
              <span className="text-[#4ca64c]">
                into reality?
              </span>
            </h2>
            <p
              data-scroll-reveal
              style={{ '--reveal-delay': '160ms' }}
              className="mx-auto mt-3.5 max-w-xl text-xs sm:text-[14px] leading-relaxed text-[#435950]"
            >
              Partner with XentroX for high-velocity software engineering, scalable cloud systems, and industry-grade talent training.
            </p>
          </div>

          {/* Feature Grid with Double-Bezel Frosted Frame & Diagonal Luminous Hover Effect */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
            {/* Card 1: Web & Mobile Engineering */}
            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '100ms' }}
              className="vision-glass-card group"
            >
              <div className="vision-glass-card__inner flex flex-col justify-between p-6 sm:p-7">
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="vision-glass-icon flex size-10 shrink-0 items-center justify-center rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4.5" aria-hidden="true">
                        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
                      </svg>
                    </div>
                    <h3 className="m-0 text-[16px] sm:text-[17px] font-bold tracking-[-0.015em] text-[#0b221a]">
                      Web &amp; Mobile Engineering
                    </h3>
                  </div>
                  <p className="mt-4 text-[12.5px] sm:text-[13.5px] leading-[1.62] text-[#283d35]">
                    Architecting responsive, lightning-fast web applications and mobile experiences tailored to your business goals.
                  </p>
                </div>
                <div className="relative z-10 mt-6 pt-1">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold text-[#0b221a] no-underline transition-colors duration-200 group-hover:text-[#064B38]"
                  >
                    <span>Explore Services</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Cloud & AI Acceleration */}
            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '200ms' }}
              className="vision-glass-card group"
            >
              <div className="vision-glass-card__inner flex flex-col justify-between p-6 sm:p-7">
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="vision-glass-icon flex size-10 shrink-0 items-center justify-center rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4.5" aria-hidden="true">
                        <path d="M17.5 19c0-1.7-1.3-3-3-3h-11c-1.7 0-3 1.3-3 3" />
                        <path d="M17.5 16c3 0 5.5-2.5 5.5-5.5S20.5 5 17.5 5 12 7.5 12 10.5" />
                        <path d="M12 10.5c0-3-2.5-5.5-5.5-5.5S1 7.5 1 10.5 3.5 16 6.5 16" />
                      </svg>
                    </div>
                    <h3 className="m-0 text-[16px] sm:text-[17px] font-bold tracking-[-0.015em] text-[#0b221a]">
                      Cloud &amp; AI Acceleration
                    </h3>
                  </div>
                  <p className="mt-4 text-[12.5px] sm:text-[13.5px] leading-[1.62] text-[#283d35]">
                    Deploying robust microservices, cloud infrastructure, and generative AI integrations built for high concurrency.
                  </p>
                </div>
                <div className="relative z-10 mt-6 pt-1">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold text-[#0b221a] no-underline transition-colors duration-200 group-hover:text-[#064B38]"
                  >
                    <span>Learn More</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: XentroX Labs Academy */}
            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '300ms' }}
              className="vision-glass-card group"
            >
              <div className="vision-glass-card__inner flex flex-col justify-between p-6 sm:p-7">
                <div className="relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="vision-glass-icon flex size-10 shrink-0 items-center justify-center rounded-xl">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4.5" aria-hidden="true">
                        <path d="m3 5.5 7-2 7 2v15l-7-2-7 2zM17 5.5l4-1v15l-4 1M10 3.5v15" />
                      </svg>
                    </div>
                    <h3 className="m-0 text-[16px] sm:text-[17px] font-bold tracking-[-0.015em] text-[#0b221a]">
                      XentroX Labs Academy
                    </h3>
                  </div>
                  <p className="mt-4 text-[12.5px] sm:text-[13.5px] leading-[1.62] text-[#283d35]">
                    Bridging university education with production-grade engineering, preparing aspiring developers for real-world impact.
                  </p>
                </div>
                <div className="relative z-10 mt-6 pt-1">
                  <Link
                    to="/career-assistance"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold text-[#0b221a] no-underline transition-colors duration-200 group-hover:text-[#064B38]"
                  >
                    <span>Explore Career Assistance</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Action Callout with Scroll Reveal */}
          <div
            data-scroll-reveal
            style={{ '--reveal-delay': '180ms' }}
            className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-emerald-950/15 bg-gradient-to-r from-[#064B38] via-[#073d2f] to-[#062c23] p-6 text-center text-white shadow-lg shadow-emerald-950/10 sm:flex-row sm:p-8 sm:text-left"
          >
            <div>
              <h4 className="text-xl font-bold text-white">Have a project in mind or want to join our academy?</h4>
              <p className="mt-1 text-sm text-[#d4e4db]/85">Let’s discuss your objectives and build something remarkable together.</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#16A36A] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#15803d] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>Get in Touch</span>
                <Icon name="arrowRight" size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
