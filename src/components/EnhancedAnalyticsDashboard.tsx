import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel } from 'recharts';
import { BarChart3, TrendingUp, Users, Clock, Bot, CheckCircle, Download, Calendar, Activity } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import analyticsData from '@/data/analytics.json';

export function EnhancedAnalyticsDashboard() {
  const [timeFilter, setTimeFilter] = useState('last_30_days');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showPercentages, setShowPercentages] = useState(false);
  
  const { overview, agentProductivity, humanApprovals, recentActivity } = analyticsData;

  // Sample chart data
  const conversionFunnelData = [
    { name: 'Total Prospects', value: 5.2, percentage: 100, fill: '#3B82F6', stroke: '#1E40AF' },
    { name: 'AI Qualified', value: 4.8, percentage: 92, fill: '#6366F1', stroke: '#4338CA' },
    { name: 'Outreach Sent', value: 4.1, percentage: 79, fill: '#8B5CF6', stroke: '#7C3AED' },
    { name: 'Responses Received', value: 2.8, percentage: 54, fill: '#10B981', stroke: '#059669' },
    { name: 'Meetings Scheduled', value: 2.3, percentage: 44, fill: '#F59E0B', stroke: '#D97706' },
    { name: 'Meetings Completed', value: 1.9, percentage: 37, fill: '#EF4444', stroke: '#DC2626' },
    { name: 'Term Sheets', value: 0.8, percentage: 15, fill: '#8B5CF6', stroke: '#7C3AED' },
  ];

  // Investment Pipeline Data for Step Chart
  const investmentPipelineData = [
    { stage: 'Discovery', investors: 247, percentage: 100, color: '#3B82F6' },
    { stage: 'Qualified', investors: 189, percentage: 77, color: '#6366F1' },
    { stage: 'Outreach', investors: 156, percentage: 63, color: '#8B5CF6' },
    { stage: 'Responded', investors: 89, percentage: 36, color: '#10B981' },
    { stage: 'Meetings', investors: 52, percentage: 21, color: '#F59E0B' },
    { stage: 'Completed', investors: 41, percentage: 17, color: '#EF4444' },
    { stage: 'Term Sheets', investors: 8, percentage: 3, color: '#EC4899' },
  ];
  const investorStageData = [
    { stage: 'Discovery', count: 89, color: '#3B82F6' },
    { stage: 'Initial Contact', count: 67, color: '#8B5CF6' },
    { stage: 'First Meeting', count: 41, color: '#10B981' },
    { stage: 'Due Diligence', count: 23, color: '#F59E0B' },
    { stage: 'Term Sheet', count: 8, color: '#EF4444' },
  ];

  const weeklyProgressData = [
    { week: 'Week 1', prospects: 45, outreach: 23, meetings: 3, termSheets: 0 },
    { week: 'Week 2', prospects: 78, outreach: 56, meetings: 8, termSheets: 1 },
    { week: 'Week 3', prospects: 124, outreach: 89, meetings: 15, termSheets: 3 },
    { week: 'Week 4', prospects: 189, outreach: 134, meetings: 28, termSheets: 5 },
    { week: 'Week 5', prospects: 247, outreach: 156, meetings: 41, termSheets: 8 },
  ];

  const activityTrendData = [
    { date: 'Jan 10', agentActions: 12, humanActions: 4, meetings: 2 },
    { date: 'Jan 11', agentActions: 8, humanActions: 6, meetings: 1 },
    { date: 'Jan 12', agentActions: 15, humanActions: 3, meetings: 3 },
    { date: 'Jan 13', agentActions: 10, humanActions: 5, meetings: 2 },
    { date: 'Jan 14', agentActions: 18, humanActions: 2, meetings: 4 },
    { date: 'Jan 15', agentActions: 14, humanActions: 7, meetings: 2 },
    { date: 'Jan 16', agentActions: 20, humanActions: 4, meetings: 5 },
  ];

  const responseTimeData = [
    { timeRange: '< 1 hour', count: 25, fill: '#10B981' },
    { timeRange: '1-6 hours', count: 42, fill: '#3B82F6' },
    { timeRange: '6-24 hours', count: 28, fill: '#F59E0B' },
    { timeRange: '> 24 hours', count: 12, fill: '#EF4444' },
  ];

  const kpiCards = [
    {
      title: 'Total Outreach',
      value: overview.totalOutreach,
      change: '+12 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Meetings Booked',
      value: overview.meetingsBooked,
      change: '+3 this week',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Conversion Rate',
      value: `${overview.conversionRate}%`,
      change: '+5% vs last month',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Response Time',
      value: overview.averageResponseTime,
      change: '-0.3 days improved',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const handleExport = async () => {
    const element = document.getElementById('analytics-dashboard');
    if (!element) return;

    try {
      if (exportFormat === 'pdf') {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgWidth = 297;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('coalition-builder-analytics.pdf');
        toast.success('PDF report exported successfully!');
      } else {
        // CSV export logic
        const csvData = [
          ['Metric', 'Value', 'Change'],
          ['Total Outreach', overview.totalOutreach, '+12 this month'],
          ['Meetings Booked', overview.meetingsBooked, '+3 this week'],
          ['Conversion Rate', `${overview.conversionRate}%`, '+5% vs last month'],
          ['Average Response Time', overview.averageResponseTime, '-0.3 days improved'],
          ['Agent Emails Sent', agentProductivity.emailsSent, ''],
          ['Agent Meetings Scheduled', agentProductivity.meetingsScheduled, ''],
          ['Human Approval Rate', `${humanApprovals.approvalRate}%`, ''],
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'coalition-builder-metrics.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('CSV data exported successfully!');
      }
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6" id="analytics-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">Enhanced Analytics</h2>
          <p className="text-gray-600 mt-1">Deep insights into agent productivity and workflow performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 days</SelectItem>
              <SelectItem value="last_30_days">Last 30 days</SelectItem>
              <SelectItem value="last_90_days">Last 90 days</SelectItem>
              <SelectItem value="last_year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExport} className="bg-black text-white hover:bg-gray-800">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-black mt-2">{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.change}</p>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Investment Pipeline Progression
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPercentages(!showPercentages)}
              >
                {showPercentages ? 'Show Numbers' : 'Show %'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={investmentPipelineData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="stage" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#6B7280', angle: -45, textAnchor: 'end' }}
                  height={60}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  formatter={(value, name, props) => [
                    showPercentages ? `${props.payload.percentage}%` : `${props.payload.investors} investors`,
                    showPercentages ? 'Conversion Rate' : 'Investor Count'
                  ]}
                  labelFormatter={(label) => `Pipeline Stage: ${label}`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey={showPercentages ? "percentage" : "investors"} 
                  radius={[4, 4, 0, 0]}
                  strokeWidth={1}
                >
                  {investmentPipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            {/* Pipeline Statistics */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">77%</div>
                <div className="text-xs text-blue-700">Qualification Rate</div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">36%</div>
                <div className="text-xs text-green-700">Response Rate</div>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-600">79%</div>
                <div className="text-xs text-orange-700">Meeting Show Rate</div>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <div className="text-lg font-bold text-purple-600">20%</div>
                <div className="text-xs text-purple-700">Term Sheet Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investor Stage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Investor Stage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={investorStageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  dataKey="count"
                  label={({ stage, count, percent }) => count > 10 ? `${stage}: ${count}` : ''}
                  labelLine={false}
                  fontSize={11}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {investorStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, 'Investors']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Stage Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {investorStageData.map((stage, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded" 
                    style={{ backgroundColor: stage.color }}
                  ></div>
                  <span className="text-gray-700">{stage.stage}: {stage.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Weekly Coalition Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={weeklyProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="prospects" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#3B82F6' }}
                name="Total Prospects"
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="outreach" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#8B5CF6' }}
                name="Outreach Sent"
                activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="meetings" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#10B981' }}
                name="Meetings Booked"
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="termSheets" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#EF4444' }}
                name="Term Sheets"
                activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Agent Productivity Detailed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-600" />
              Agent Productivity Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Emails Sent</span>
                <span className="font-medium">{agentProductivity.emailsSent}/50 target</span>
              </div>
              <Progress value={(agentProductivity.emailsSent / 50) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Intros Drafted</span>
                <span className="font-medium">{agentProductivity.introsDrafted}/25 target</span>
              </div>
              <Progress value={(agentProductivity.introsDrafted / 25) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Meetings Scheduled</span>
                <span className="font-medium">{agentProductivity.meetingsScheduled}/15 target</span>
              </div>
              <Progress value={(agentProductivity.meetingsScheduled / 15) * 100} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Follow-ups Automated</span>
                <span className="font-medium">{agentProductivity.followUpsAutomated}/20 target</span>
              </div>
              <Progress value={(agentProductivity.followUpsAutomated / 20) * 100} className="h-3" />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Efficiency Score</h4>
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <p className="text-sm text-blue-700">Above target performance</p>
            </div>
          </CardContent>
        </Card>

        {/* Human Oversight */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Human-AI Collaboration
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
              <Progress value={humanApprovals.approvalRate} className="h-3" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Approval Time</span>
                <span className="text-lg font-semibold text-black">{humanApprovals.averageApprovalTime}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Approvals</span>
                <Badge variant="outline" className="text-xs">3</Badge>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Trust Score</h4>
              <div className="text-2xl font-bold text-gray-600">4.8/5.0</div>
              <p className="text-sm text-gray-600">Human confidence in AI actions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}