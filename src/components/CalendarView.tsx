import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import calendarEvents from '@/data/calendar-events.json';
import { DataService } from '@/services/dataService';

export function CalendarView() {
  const [currentWeek, setCurrentWeek] = useState(new Date('2024-01-15'));
  
  const getWeekDates = (startDate: Date) => {
    const week = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  
  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'investor_meeting':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'formal_pitch':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'technical_meeting':
        return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'partner_pitch':
        return 'bg-purple-100 border-purple-500 text-purple-800';
      case 'internal_meeting':
        return 'bg-gray-100 border-gray-500 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Coalition Calendar
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-600 border-b">
              {day}
              <div className="text-xs text-gray-500 mt-1">
                {weekDates[index].getDate()}
              </div>
            </div>
          ))}
          
          {/* Calendar Grid */}
          {weekDates.map((date, index) => {
            const events = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-32 p-1 border-r border-gray-100 ${
                  isToday ? 'bg-blue-50' : ''
                }`}
              >
                <div className="space-y-1">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded text-xs border-l-2 ${getEventTypeColor(event.type)} hover:shadow-sm transition-shadow cursor-pointer`}
                    >
                      <div className="font-medium truncate mb-1">
                        {event.title}
                      </div>
                      <div className="flex items-center text-xs opacity-75 mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(event.startTime)}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-xs opacity-75 mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {event.attendees?.length || 0}
                        </div>
                        {event.agentPrepped && (
                          <Bot className="h-3 w-3 text-blue-600" title="AI Prepared" />
                        )}
                      </div>
                      {event.status && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs mt-1 ${
                            event.status === 'completed' ? 'bg-green-100 text-green-800' :
                            event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'tentative' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span>Formal Pitch</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span>Investor Meeting</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
            <span>Technical</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
            <span>Internal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span>Partner Meeting</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-500 rounded mr-1"></div>
            <span>Client Meeting</span>
          </div>
          <div className="flex items-center">
            <Bot className="h-3 w-3 text-blue-600 mr-1" />
            <span>AI Prepared</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}