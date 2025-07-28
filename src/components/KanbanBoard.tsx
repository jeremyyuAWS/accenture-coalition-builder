import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import investorsData from '@/data/investors.json';

const statusConfig = {
  recommended: {
    title: 'Recommended',
    icon: Users,
    color: 'bg-blue-50 border-blue-200',
    count: 0
  },
  outreach_in_progress: {
    title: 'Outreach in Progress',
    icon: Clock,
    color: 'bg-yellow-50 border-yellow-200',
    count: 0
  },
  meeting_confirmed: {
    title: 'Meeting Confirmed',
    icon: CheckCircle,
    color: 'bg-green-50 border-green-200',
    count: 0
  },
  declined: {
    title: 'Declined/Rejected',
    icon: XCircle,
    color: 'bg-red-50 border-red-200',
    count: 0
  }
};

export function KanbanBoard() {
  const investorsByStatus = investorsData.reduce((acc, investor) => {
    if (!acc[investor.status]) {
      acc[investor.status] = [];
    }
    acc[investor.status].push(investor);
    return acc;
  }, {} as Record<string, typeof investorsData>);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">Coalition Workflow</h2>
        <p className="text-gray-600 mt-1">Track investor outreach progress across stages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          const investors = investorsByStatus[status] || [];
          
          return (
            <div key={status} className="space-y-3">
              <Card className={`${config.color} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <CardTitle className="text-sm font-medium">
                        {config.title}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {investors.length}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-2 lg:space-y-3">
                {investors.map((investor) => (
                  <Card key={investor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 lg:p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={investor.avatar}
                          alt={investor.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-black text-sm truncate">
                            {investor.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate hidden lg:block">
                            {investor.company}
                          </p>
                          
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Fit Score</span>
                              <span className="font-medium">{investor.fitScore}%</span>
                            </div>
                            <Progress value={investor.fitScore} className="h-1" />
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(investor.lastActivity)}
                            </span>
                            {investor.warmIntro && (
                              <div className="w-2 h-2 bg-green-500 rounded-full" title="Warm intro available" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {investors.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No investors in this stage</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}