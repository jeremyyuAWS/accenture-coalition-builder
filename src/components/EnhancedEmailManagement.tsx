import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send, Edit, Check, X, Bot, User, Clock, CheckCircle, MessageCircle, TrendingUp } from 'lucide-react';
import emailThreads from '@/data/email-threads-detailed.json';
import { DataService } from '@/services/dataService';
import toast from 'react-hot-toast';

export function EnhancedEmailManagement() {
  const [selectedThread, setSelectedThread] = useState(emailThreads[0]);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const getEmailTypeIcon = (email: any) => {
    if (email.agentGenerated || email.agentAction) {
      return <Bot className="h-4 w-4 text-blue-600" />;
    }
    return <User className="h-4 w-4 text-gray-600" />;
  };

  const getEmailTypeColor = (email: any) => {
    if (email.agentGenerated || email.agentAction) {
      return 'bg-blue-50 border-l-blue-500';
    }
    return 'bg-gray-50 border-l-gray-500';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEmailContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
        {line || '\u00A0'}
      </div>
    ));
  };

  const handleApproveAction = (emailId: string) => {
    toast.success('Agent action approved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">Enhanced Email Intelligence</h2>
        <p className="text-gray-600 mt-1">Multi-turn conversations with AI analysis and human oversight</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Thread List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {emailThreads.map((thread) => (
                  <div
                    key={thread.threadId}
                    onClick={() => setSelectedThread(thread)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedThread.threadId === thread.threadId
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-black truncate">
                        {DataService.getInvestorName(thread.investorId)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {thread.totalEmails}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 truncate mb-2">
                      {thread.subject}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${
                        thread.stage === 'post_meeting' ? 'bg-green-100 text-green-800' :
                        thread.stage === 'meeting_scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {thread.stage.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {DataService.formatTimestamp(thread.lastActivity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Thread */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedThread.subject}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedThread.totalEmails} emails • Last activity {DataService.formatTimestamp(selectedThread.lastActivity)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${
                    selectedThread.stage === 'post_meeting' ? 'bg-green-100 text-green-800' :
                    selectedThread.stage === 'meeting_scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedThread.stage.replace('_', ' ')}
                  </Badge>
                  {selectedThread.status === 'active' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {selectedThread.emails.map((email, index) => (
                  <div key={email.id} className={`border-l-4 rounded-lg p-4 ${getEmailTypeColor(email)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getEmailTypeIcon(email)}
                        <div>
                          <span className="font-medium text-black">{email.from.name}</span>
                          {email.from.type && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {email.from.type}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {DataService.formatTimestamp(email.timestamp)}
                        </div>
                        {email.sentiment && (
                          <Badge className={`text-xs mt-1 ${getSentimentColor(email.sentiment)}`}>
                            {email.sentiment}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Email Recipients */}
                    <div className="mb-3 text-sm text-gray-600">
                      <div>To: {email.to.map(recipient => recipient.name).join(', ')}</div>
                      {email.cc && email.cc.length > 0 && (
                        <div>CC: {email.cc.map(recipient => recipient.name).join(', ')}</div>
                      )}
                    </div>

                    {/* Email Content */}
                    <div className="bg-white rounded border p-3 mb-3">
                      <div className="font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {formatEmailContent(email.content)}
                      </div>
                    </div>

                    {/* AI Analysis */}
                    {email.agentAnalysis && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                        <div className="flex items-center mb-2">
                          <Bot className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm font-medium text-blue-900">AI Analysis</span>
                        </div>
                        <p className="text-sm text-blue-800">{email.agentAnalysis}</p>
                      </div>
                    )}

                    {/* Agent Suggestions */}
                    {email.suggestedActions && email.suggestedActions.length > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-900">Suggested Actions</span>
                            {email.agentConfidence && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {email.agentConfidence}% confidence
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" onClick={() => handleApproveAction(email.id)}>
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        </div>
                        <div className="space-y-1">
                          {email.suggestedActions.map((action, idx) => (
                            <div key={idx} className="text-sm text-green-800 flex items-start">
                              <span className="mr-1">•</span>
                              {action.replace('_', ' ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attached Materials */}
                    {email.materialsAttached && email.materialsAttached.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {email.materialsAttached.map((material, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            📎 {material}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Next Actions */}
                    {email.nextActions && email.nextActions.length > 0 && (
                      <div className="bg-purple-50 border border-purple-200 rounded p-3 mt-3">
                        <div className="flex items-center mb-2">
                          <Clock className="h-4 w-4 text-purple-600 mr-1" />
                          <span className="text-sm font-medium text-purple-900">Planned Next Actions</span>
                        </div>
                        <div className="space-y-1">
                          {email.nextActions.map((action, idx) => (
                            <div key={idx} className="text-sm text-purple-800 flex items-start">
                              <span className="mr-1">•</span>
                              {action.replace('_', ' ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Thread Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-3">Thread Intelligence Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {selectedThread.emails.filter(e => e.agentGenerated || e.agentAction).length}
                    </div>
                    <div className="text-xs text-blue-700">Agent Actions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {selectedThread.emails.filter(e => e.sentiment === 'positive').length}
                    </div>
                    <div className="text-xs text-green-700">Positive Responses</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {selectedThread.emails.filter(e => e.meetingConfirmed).length > 0 ? 'Yes' : 'Pending'}
                    </div>
                    <div className="text-xs text-purple-700">Meeting Status</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}