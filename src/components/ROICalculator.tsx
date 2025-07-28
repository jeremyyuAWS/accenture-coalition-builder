import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, DollarSign, Users, Zap, Target } from 'lucide-react';

interface ROIMetrics {
  timeSaved: {
    weeks: number;
    hours: number;
    value: string;
  };
  costSavings: {
    amount: string;
    percentage: number;
  };
  efficiencyGains: {
    responseRate: number;
    meetingConversion: number;
    overallImprovement: number;
  };
  productivity: {
    tasksAutomated: number;
    humanHoursSaved: number;
    agentActionsCompleted: number;
  };
}

export function ROICalculator() {
  const [animatedMetrics, setAnimatedMetrics] = useState<ROIMetrics>({
    timeSaved: { weeks: 0, hours: 0, value: "$0" },
    costSavings: { amount: "$0", percentage: 0 },
    efficiencyGains: { responseRate: 0, meetingConversion: 0, overallImprovement: 0 },
    productivity: { tasksAutomated: 0, humanHoursSaved: 0, agentActionsCompleted: 0 }
  });

  const finalMetrics: ROIMetrics = {
    timeSaved: { weeks: 3, hours: 47, value: "$23,500" },
    costSavings: { amount: "$18,800", percentage: 65 },
    efficiencyGains: { responseRate: 78, meetingConversion: 45, overallImprovement: 67 },
    productivity: { tasksAutomated: 156, humanHoursSaved: 47, agentActionsCompleted: 89 }
  };

  // Animate metrics on component mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      const progress = currentStep / steps;
      
      setAnimatedMetrics({
        timeSaved: {
          weeks: Math.round(finalMetrics.timeSaved.weeks * progress),
          hours: Math.round(finalMetrics.timeSaved.hours * progress),
          value: `$${Math.round(23500 * progress).toLocaleString()}`
        },
        costSavings: {
          amount: `$${Math.round(18800 * progress).toLocaleString()}`,
          percentage: Math.round(finalMetrics.costSavings.percentage * progress)
        },
        efficiencyGains: {
          responseRate: Math.round(finalMetrics.efficiencyGains.responseRate * progress),
          meetingConversion: Math.round(finalMetrics.efficiencyGains.meetingConversion * progress),
          overallImprovement: Math.round(finalMetrics.efficiencyGains.overallImprovement * progress)
        },
        productivity: {
          tasksAutomated: Math.round(finalMetrics.productivity.tasksAutomated * progress),
          humanHoursSaved: Math.round(finalMetrics.productivity.humanHoursSaved * progress),
          agentActionsCompleted: Math.round(finalMetrics.productivity.agentActionsCompleted * progress)
        }
      });

      currentStep++;
      if (currentStep > steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const comparisonData = [
    {
      metric: "Time to First Investor Meeting",
      manual: "2-3 weeks",
      aiAssisted: "2-3 days",
      improvement: "85% faster",
      color: "text-green-600"
    },
    {
      metric: "Research & Outreach Hours",
      manual: "40-60 hours",
      aiAssisted: "8-12 hours",
      improvement: "75% reduction",
      color: "text-blue-600"
    },
    {
      metric: "Investor Response Rate",
      manual: "15-25%",
      aiAssisted: "45-65%",
      improvement: "2.5x better",
      color: "text-purple-600"
    },
    {
      metric: "Meeting Conversion Rate",
      manual: "20-30%",
      aiAssisted: "60-75%",
      improvement: "2x better",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">ROI Impact Analysis</h2>
        <p className="text-gray-600 mt-1">Measurable time savings and efficiency gains from AI automation</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-green-600" />
              <Badge className="bg-green-100 text-green-800">Time Saved</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black">
                {animatedMetrics.timeSaved.weeks} weeks
              </div>
              <div className="text-lg text-gray-600">
                {animatedMetrics.timeSaved.hours} hours
              </div>
              <div className="text-sm text-green-600 font-medium">
                Value: {animatedMetrics.timeSaved.value}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">Cost Savings</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black">
                {animatedMetrics.costSavings.amount}
              </div>
              <div className="text-lg text-gray-600">
                {animatedMetrics.costSavings.percentage}% reduction
              </div>
              <div className="text-sm text-blue-600 font-medium">
                vs. manual process
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-800">Efficiency</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black">
                {animatedMetrics.efficiencyGains.overallImprovement}%
              </div>
              <div className="text-lg text-gray-600">
                improvement
              </div>
              <div className="text-sm text-purple-600 font-medium">
                across all metrics
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800">Automation</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-black">
                {animatedMetrics.productivity.tasksAutomated}
              </div>
              <div className="text-lg text-gray-600">
                tasks automated
              </div>
              <div className="text-sm text-orange-600 font-medium">
                {animatedMetrics.productivity.agentActionsCompleted}% success rate
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Before vs After Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Manual Process vs. AI-Assisted Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-black">{item.metric}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-lg font-bold text-red-600">{item.manual}</div>
                    <div className="text-sm text-red-700">Manual Process</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-600">{item.aiAssisted}</div>
                    <div className="text-sm text-green-700">AI-Assisted</div>
                  </div>
                  <div className={`text-center p-4 bg-blue-50 rounded-lg border border-blue-200`}>
                    <div className={`text-lg font-bold ${item.color}`}>{item.improvement}</div>
                    <div className="text-sm text-blue-700">Improvement</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tasks Automated</span>
                <span className="font-medium">{animatedMetrics.productivity.tasksAutomated} / 200</span>
              </div>
              <Progress value={(animatedMetrics.productivity.tasksAutomated / 200) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Human Hours Saved</span>
                <span className="font-medium">{animatedMetrics.productivity.humanHoursSaved} hours</span>
              </div>
              <Progress value={(animatedMetrics.productivity.humanHoursSaved / 60) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Agent Success Rate</span>
                <span className="font-medium">{animatedMetrics.productivity.agentActionsCompleted}%</span>
              </div>
              <Progress value={animatedMetrics.productivity.agentActionsCompleted} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response & Conversion Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Investor Response Rate</span>
                <span className="font-medium">{animatedMetrics.efficiencyGains.responseRate}%</span>
              </div>
              <Progress value={animatedMetrics.efficiencyGains.responseRate} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Meeting Conversion Rate</span>
                <span className="font-medium">{animatedMetrics.efficiencyGains.meetingConversion}%</span>
              </div>
              <Progress value={animatedMetrics.efficiencyGains.meetingConversion} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Improvement</span>
                <span className="font-medium">{animatedMetrics.efficiencyGains.overallImprovement}%</span>
              </div>
              <Progress value={animatedMetrics.efficiencyGains.overallImprovement} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Quote */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <blockquote className="text-lg italic text-gray-700 mb-4">
            "Coalition Builder transformed our fundraising process. What used to take 6+ weeks of manual work 
            now happens in under 2 weeks with dramatically better results. The AI agents handle everything 
            while keeping us in complete control."
          </blockquote>
          <div className="flex items-center justify-center space-x-3">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
              alt="John Doe"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold text-black">John Doe</div>
              <div className="text-sm text-gray-600">CEO, DataFlow Solutions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}