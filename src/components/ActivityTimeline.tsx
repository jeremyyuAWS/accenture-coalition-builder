import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Clock, CheckCircle, AlertCircle, Calendar, Activity } from 'lucide-react';
import activitiesData from '@/data/enhanced-activities.json';
import investorsData from '@/data/investors.json';

export function ActivityTimeline() {
  const [activities, setActivities] = useState(activitiesData);
  const [newActivityCount, setNewActivityCount] = useState(0);

  // Simulate new activities being added in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now().toString(),
        type: Math.random() > 0.8 ? 'human_action' : 'agent_action',
        owner: Math.random() > 0.8 ? 'You' : 'Agent',
        action: getRandomAction(),
        details: getRandomDetails(),
        timestamp: new Date().toISOString(),
        status: 'completed',
        confidence: Math.floor(Math.random() * 20) + 80,
        impact: Math.random() > 0.6 ? 'high' : 'medium'
      };
      
      setActivities(prev => [newActivity, ...prev].slice(0, 10));
      setNewActivityCount(prev => prev + 1);
      
      // Reset counter after 5 seconds
      setTimeout(() => setNewActivityCount(0), 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getRandomAction = () => {
    const actions = [
      'Analyzed investor response patterns',
      'Updated portfolio overlap scores', 
      'Found new warm introduction path',
      'Optimized email send timing',
      'Processed calendar availability',
      'Generated meeting preparation materials',
      'Tracked email engagement metrics',
      'Identified competitive intelligence'
    ];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const getRandomDetails = () => {
    const details = [
      'Machine learning model improved response prediction accuracy by 12%',
      'Discovered high-value connection through Stanford alumni network',
      'Real-time market analysis suggests optimal timing for outreach',
      'Customer success metrics show 98% satisfaction rate for Q4',
      'Integration with LinkedIn API returned 23 new potential connections'
    ];
    return details[Math.floor(Math.random() * details.length)];
  };

  const getInvestorName = (investorId: string) => {
    const investor = investorsData.find(inv => inv.id === investorId);
    return investor ? investor.name : 'Unknown Investor';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending_approval':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
            Live Activity Timeline
          </div>
          {newActivityCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {newActivityCount} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {activity.type === 'agent_action' ? (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center" title="AI Agent">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center" title="Human Action">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-black">
                        {activity.owner}
                      </span>
                      {activity.type === 'agent_action' && (
                        <Badge variant="agent" className="text-xs">AI</Badge>
                      )}
                      {activity.confidence && (
                        <Badge variant="outline" className="text-xs">
                          {activity.confidence}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(activity.status)}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {activity.action}
                  </p>

                  {activity.investorId && (
                    <p className="text-xs text-gray-500 mb-2">
                      Re: {getInvestorName(activity.investorId)}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activity.details}
                  </p>
                  
                  {activity.impact && (
                    <Badge variant="outline" className={`text-xs mt-2 ${
                      activity.impact === 'very_high' ? 'text-red-600' : activity.impact === 'high' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {activity.impact} impact
                    </Badge>
                  )}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}