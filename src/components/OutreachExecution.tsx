import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Send, Clock, CheckCircle, Mail, TrendingUp, Bot, AlertCircle, Calendar } from 'lucide-react';
import { DataService } from '@/services/dataService';
import toast from 'react-hot-toast';

interface OutreachActivity {
  id: string;
  investorId: string;
  investorName: string;
  action: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  details: string;
  agentConfidence?: number;
  nextAction?: string;
}

export function OutreachExecution() {
  const [activities, setActivities] = useState<OutreachActivity[]>([
    {
      id: '1',
      investorId: '1',
      investorName: 'Sarah Chen',
      action: 'Send warm introduction',
      status: 'completed',
      timestamp: '2024-01-15T11:20:00Z',
      details: 'Warm introduction sent via John Smith. Email opened 2x, positive response received.',
      agentConfidence: 95,
      nextAction: 'Schedule meeting'
    },
    {
      id: '2',
      investorId: '2', 
      investorName: 'Marcus Rodriguez',
      action: 'Send follow-up email',
      status: 'in_progress',
      timestamp: '2024-01-16T09:15:00Z',
      details: 'Second follow-up scheduled after 48h no-response. Personalizing content based on recent portfolio activity.',
      agentConfidence: 78,
      nextAction: 'Monitor response'
    },
    {
      id: '3',
      investorId: '3',
      investorName: 'Emily Watson',
      action: 'Calendar coordination',
      status: 'pending',
      timestamp: '2024-01-16T14:30:00Z',
      details: 'Positive response received. Agent analyzing both calendars to propose optimal meeting times.',
      agentConfidence: 89,
      nextAction: 'Send meeting invite'
    }
  ]);

  const [liveMetrics, setLiveMetrics] = useState({
    emailsSent: 4,
    responsesReceived: 2,
    meetingsScheduled: 1,
    activeOutreach: 3
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate agent activity updates
      const agentActivities = [
        "📧 Agent sent follow-up to Marcus Rodriguez with updated metrics",
        "🔍 Agent researching Emily Watson's recent LinkedIn activity for meeting prep", 
        "📅 Agent found 3 optimal meeting times for Sarah Chen discussion",
        "🤖 Agent optimizing email send time based on investor response patterns",
        "✅ Agent confirmed meeting room booking for investor presentation"
      ];

      const randomActivity = agentActivities[Math.floor(Math.random() * agentActivities.length)];
      toast.success(randomActivity, {
        duration: 4000,
        style: { background: '#1e40af', color: '#fff' }
      });

      // Update metrics occasionally
      if (Math.random() > 0.7) {
        setLiveMetrics(prev => ({
          ...prev,
          emailsSent: prev.emailsSent + Math.floor(Math.random() * 2),
          responsesReceived: Math.min(prev.responsesReceived + (Math.random() > 0.8 ? 1 : 0), prev.emailsSent)
        }));
      }
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateProgress = () => {
    const completed = activities.filter(a => a.status === 'completed').length;
    return Math.round((completed / activities.length) * 100);
  };

  const handleTakeOver = (activityId: string) => {
    toast.success('Taking over agent action. You now have manual control.', {
      duration: 3000
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black">Outreach Execution Center</h3>
        <p className="text-gray-600 mt-1">Live monitoring of agent-driven outreach activities</p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-black">{liveMetrics.emailsSent}</p>
              </div>
              <Send className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Responses</p>
                <p className="text-2xl font-bold text-black">{liveMetrics.responsesReceived}</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Meetings</p>
                <p className="text-2xl font-bold text-black">{liveMetrics.meetingsScheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-black">
                  {Math.round((liveMetrics.responsesReceived / liveMetrics.emailsSent) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-blue-600" />
            Agent Execution Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{calculateProgress()}% Complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{activities.filter(a => a.status === 'completed').length} completed</span>
              <span>{activities.filter(a => a.status === 'in_progress').length} in progress</span>
              <span>{activities.filter(a => a.status === 'pending').length} pending</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Live Agent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(activity.status)}
                    <div>
                      <h4 className="font-semibold text-black">{activity.investorName}</h4>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {DataService.formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="text-sm text-gray-700">{activity.details}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {activity.agentConfidence && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Confidence:</span>
                        <Badge variant="outline" className="text-xs">
                          {activity.agentConfidence}%
                        </Badge>
                      </div>
                    )}
                    {activity.nextAction && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Next:</span>
                        <span className="text-xs text-blue-600">{activity.nextAction}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTakeOver(activity.id)}
                    >
                      Take Over
                    </Button>
                    {activity.status === 'in_progress' && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Bot className="h-5 w-5" />
              <span className="text-sm">Pause All Agents</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Optimize Timing</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Review Failures</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}