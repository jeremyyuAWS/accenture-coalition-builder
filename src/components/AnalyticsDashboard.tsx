import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, Clock, Bot, CheckCircle } from 'lucide-react';
import analyticsData from '@/data/analytics.json';

export function AnalyticsDashboard() {
  const { overview, agentProductivity, humanApprovals, recentActivity } = analyticsData;

  const kpiCards = [
    {
      title: 'Total Outreach',
      value: overview.totalOutreach,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Meetings Booked',
      value: overview.meetingsBooked,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Conversion Rate',
      value: `${overview.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Response Time',
      value: overview.averageResponseTime,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-1">Track agent productivity and workflow performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-black mt-2">{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Productivity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-600" />
              Agent Productivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Emails Sent</span>
                <span className="font-medium">{agentProductivity.emailsSent}</span>
              </div>
              <Progress value={(agentProductivity.emailsSent / 50) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Intros Drafted</span>
                <span className="font-medium">{agentProductivity.introsDrafted}</span>
              </div>
              <Progress value={(agentProductivity.introsDrafted / 25) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Meetings Scheduled</span>
                <span className="font-medium">{agentProductivity.meetingsScheduled}</span>
              </div>
              <Progress value={(agentProductivity.meetingsScheduled / 15) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Follow-ups Automated</span>
                <span className="font-medium">{agentProductivity.followUpsAutomated}</span>
              </div>
              <Progress value={(agentProductivity.followUpsAutomated / 20) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Human Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Human Oversight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{humanApprovals.emailsApproved}</div>
                <div className="text-sm text-green-700">Approved</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{humanApprovals.emailsRejected}</div>
                <div className="text-sm text-red-700">Rejected</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-medium">{humanApprovals.approvalRate}%</span>
              </div>
              <Progress value={humanApprovals.approvalRate} className="h-2" />
            </div>
            <div className="text-center text-gray-600">
              <div className="text-sm">Average Approval Time</div>
              <div className="text-lg font-semibold text-black">{humanApprovals.averageApprovalTime}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Activity Trends (Last 4 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="text-gray-500">{day.meetingsBooked} meetings booked</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-blue-600">Agent Actions</span>
                      <span>{day.agentActions}</span>
                    </div>
                    <Progress value={(day.agentActions / 15) * 100} className="h-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Human Actions</span>
                      <span>{day.humanActions}</span>
                    </div>
                    <Progress value={(day.humanActions / 8) * 100} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}