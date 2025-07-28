import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, Clock, AlertCircle, Bot, User, X, Check, Calendar } from 'lucide-react';
import enhancedNotifications from '@/data/enhanced-notifications.json';
import { Notification } from '@/types';
import toast from 'react-hot-toast';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(
    enhancedNotifications as Notification[]
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'agent_completed':
        return <Bot className="h-4 w-4 text-blue-600" />;
      case 'response_received':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'meeting_scheduled':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'follow_up_due':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'approval_needed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleApprove = (notificationId: string, action: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, read: true, actionRequired: false }
          : n
      )
    );
    toast.success(`${action} completed successfully!`);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, read: true }
          : n
      )
    );
  };

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4">
      <Card className="w-96 max-h-[80vh] overflow-hidden tour-notifications">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
                    } hover:bg-opacity-75 transition-colors`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-black' : 'text-gray-600'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          {notification.actionRequired && notification.actionText && (
                            <div className="flex space-x-2">
                              {notification.actionText === 'Schedule meeting' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApprove(notification.id, 'Meeting scheduled')}
                                  className="text-xs h-7"
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Schedule
                                </Button>
                              )}
                              {notification.actionText === 'Review draft' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApprove(notification.id, 'Email approved')}
                                  className="text-xs h-7"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                              )}
                              {notification.actionText === 'Send follow-up' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApprove(notification.id, 'Follow-up sent')}
                                  className="text-xs h-7"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Send
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-gray-500 h-6"
                        >
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}