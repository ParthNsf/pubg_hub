import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ performanceData }) => {
  const [activeChart, setActiveChart] = useState('kills');

  const chartConfigs = {
    kills: {
      title: 'Kills Per Match',
      dataKey: 'kills',
      color: '#F59E0B',
      icon: 'Target'
    },
    damage: {
      title: 'Average Damage',
      dataKey: 'damage',
      color: '#EF4444',
      icon: 'Zap'
    },
    placement: {
      title: 'Average Placement',
      dataKey: 'placement',
      color: '#10B981',
      icon: 'Award'
    },
    survival: {
      title: 'Survival Time',
      dataKey: 'survivalTime',
      color: '#8B5CF6',
      icon: 'Clock'
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const config = chartConfigs?.[activeChart];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-gaming">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config?.color }}
            ></div>
            <span className="text-sm font-medium text-foreground">
              {config?.title}: {payload?.[0]?.value}
              {activeChart === 'placement' && '/100'}
              {activeChart === 'survival' && 'm'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 gaming-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4 sm:mb-0">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          Performance Trends
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(chartConfigs)?.map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveChart(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-gaming ${
                activeChart === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={config?.icon} size={16} />
              {config?.title}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id={`gradient-${activeChart}`} x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={chartConfigs?.[activeChart]?.color} 
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={chartConfigs?.[activeChart]?.color} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(139, 92, 246, 0.1)"
            />
            <XAxis 
              dataKey="date" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={chartConfigs?.[activeChart]?.dataKey}
              stroke={chartConfigs?.[activeChart]?.color}
              strokeWidth={2}
              fill={`url(#gradient-${activeChart})`}
              dot={{ fill: chartConfigs?.[activeChart]?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: chartConfigs?.[activeChart]?.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        {Object.entries(chartConfigs)?.map(([key, config]) => {
          const latestValue = performanceData?.[performanceData?.length - 1]?.[config?.dataKey] || 0;
          const previousValue = performanceData?.[performanceData?.length - 2]?.[config?.dataKey] || 0;
          const change = latestValue - previousValue;
          const isPositive = change > 0;
          
          return (
            <div key={key} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name={config?.icon} size={16} style={{ color: config?.color }} />
                <span className="text-sm font-medium text-muted-foreground">
                  {config?.title}
                </span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {latestValue}
                {key === 'placement' && '/100'}
                {key === 'survival' && 'm'}
              </div>
              <div className={`text-xs flex items-center justify-center gap-1 ${
                isPositive ? 'text-success' : 'text-destructive'
              }`}>
                <Icon 
                  name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                {Math.abs(change)?.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceChart;