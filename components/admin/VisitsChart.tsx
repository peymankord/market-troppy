'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// نمودار بازدید داشبورد (Recharts)
export default function VisitsChart({ data }: { data: { month: string; visits: number }[] }) {
  return (
    <div className="h-72" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#DCE4F0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8BA3C7' }} />
          <YAxis tick={{ fontSize: 12, fill: '#8BA3C7' }} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #DCE4F0',
              fontFamily: 'inherit',
              direction: 'rtl',
            }}
            labelStyle={{ color: '#0F172A', fontWeight: 700 }}
          />
          <Area
            type="monotone"
            dataKey="visits"
            name="بازدید"
            stroke="#14B8A6"
            strokeWidth={2.5}
            fill="url(#visitsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
