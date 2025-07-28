import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Users, Target } from 'lucide-react';

interface CoalitionMetricsProps {
  workflow: any;
}

export function CoalitionMetrics({ workflow }: CoalitionMetricsProps) {
  const metrics = [
    {
      label: 'Time to First Intro',
      value: workflow.metrics.timeToFirstIntro,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      label: 'Response Rate',
      value: workflow.metrics.responseRate,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Meeting Conversion',
      value: workflow.metrics.meetingConversionRate,
      icon: Target,
      color: 'text-purple-600'
    },
    {
      label: 'Total Investment',
      value: workflow.metrics.totalTimeInvested,
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Coalition Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center p-2">
                <Icon className={`h-4 w-4 mx-auto mb-1 ${metric.color}`} />
                <div className="text-sm font-bold text-black">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}