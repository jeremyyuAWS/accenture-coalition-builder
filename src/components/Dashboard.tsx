import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Activity, Calendar, Bot, CheckCircle } from 'lucide-react';
import { ActivityTimeline } from './ActivityTimeline';
import investorsData from '@/data/investors.json';
import analyticsData from '@/data/analytics.json';

export function Dashboard() {
  const [liveStats, setLiveStats] = useState({
    totalInvestors: analyticsData.weeklyTrends.totalContacts,
    meetingsConfirmed: analyticsData.overview.meetingsBooked,
    outreachInProgress: analyticsData.weeklyTrends.newProspects,
    conversionRate: analyticsData.overview.conversionRate
  });

  // Simulate live stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        conversionRate: Math.min(prev.conversionRate + Math.random() * 0.5, 35),
        meetingsConfirmed: Math.min(prev.meetingsConfirmed + (Math.random() > 0.9 ? 1 : 0), 30)
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      title: 'Total Contacts',
      value: liveStats.totalInvestors,
      change: '+12 this week',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Meetings Confirmed',
      value: liveStats.meetingsConfirmed,
      change: '+3 this week',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'New Prospects',
      value: liveStats.outreachInProgress,
      change: 'AI sourced',
      icon: Bot,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Conversion Rate',
      value: `${Math.round(liveStats.conversionRate)}%`,
      change: '+7% vs last month',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const upcomingMeetings = investorsData.filter(inv => inv.status === 'meeting_confirmed');
  const topPerformers = investorsData
    .filter(inv => inv.fitScore >= 90)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">Investment Dashboard</h2>
        <p className="text-gray-600 mt-1">AI-powered coalition building at scale</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-black mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Activity Timeline */}
        <div className="xl:col-span-2 tour-activity-timeline">
          <ActivityTimeline />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card className="tour-build-coalition">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingMeetings.map((investor) => (
                    <div key={investor.id} className="flex items-center space-x-3 p-2 rounded-lg border border-gray-100">
                      <img
                        src={investor.avatar}
                        alt={investor.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{investor.name}</p>
                        <p className="text-xs text-gray-500">{investor.company}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        This Week
                      </Badge>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      View Full Calendar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No upcoming meetings</p>
              )}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="tour-top-matches tour-build-coalition">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Top Investor Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((investor, index) => (
                  <div key={investor.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-lg font-bold text-gray-400">
                      #{index + 1}
                    </div>
                    <img
                      src={investor.avatar}
                      alt={investor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black truncate">{investor.name}</p>
                      <p className="text-xs text-gray-500">{investor.company}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {investor.fitScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}