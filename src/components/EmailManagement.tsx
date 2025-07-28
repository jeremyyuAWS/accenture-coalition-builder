import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send, Edit, Check, X, Bot, User, Clock, CheckCircle } from 'lucide-react';
import { DataService } from '@/services/dataService';
import { Email } from '@/types';
import toast from 'react-hot-toast';

export function EmailManagement() {
  const [emails] = useState<Email[]>(DataService.getEmails());
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const pendingApprovals = emails.filter(email => email.status === 'pending_approval');
  const sentEmails = emails.filter(email => email.status === 'sent');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Send className="h-4 w-4 text-green-600" />;
      case 'pending_approval':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft':
        return <Edit className="h-4 w-4 text-gray-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEmailTypeColor = (type: string) => {
    switch (type) {
      case 'warm_introduction':
        return 'bg-green-100 text-green-800';
      case 'cold_outreach':
        return 'bg-blue-100 text-blue-800';
      case 'follow_up':
        return 'bg-orange-100 text-orange-800';
      case 'response':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveEmail = (emailId: string) => {
    toast.success('Email approved and sent!');
  };

  const handleRejectEmail = (emailId: string) => {
    toast.error('Email rejected. Agent will revise.');
  };

  const handleEditEmail = (email: Email) => {
    setEditingEmail(email.id);
    setEditContent(email.content);
  };

  const handleSaveEdit = (emailId: string) => {
    setEditingEmail(null);
    toast.success('Email updated successfully!');
  };

  const formatEmailContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
        {line || '\u00A0'}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black">Email Management</h2>
        <p className="text-gray-600 mt-1">Review, approve, and manage AI-generated outreach emails</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending Approval ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent Emails ({sentEmails.length})
          </TabsTrigger>
          <TabsTrigger value="templates">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingApprovals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-500">No emails pending your approval.</p>
              </CardContent>
            </Card>
          ) : (
            pendingApprovals.map((email) => (
              <Card key={email.id} className="border-yellow-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <Badge variant="agent" className="text-xs">AI Generated</Badge>
                        <Badge className={`text-xs ${getEmailTypeColor(email.type)}`}>
                          {email.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{email.subject}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>To: {email.to.map(t => t.email).join(', ')}</span>
                        <span>•</span>
                        <span>{DataService.formatTimestamp(email.timestamp)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(email.status)}
                      <Badge variant="outline" className="text-xs">
                        Needs Approval
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    {editingEmail === email.id ? (
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-48 font-mono text-sm"
                      />
                    ) : (
                      <div className="font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {formatEmailContent(email.content)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editingEmail === email.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(email.id)}
                            className="bg-black text-white hover:bg-gray-800"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Save Changes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEmail(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditEmail(email)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectEmail(email.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproveEmail(email.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve & Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {sentEmails.map((email) => {
            const threadEmails = DataService.getEmailThread(email.threadId);
            return (
              <Card key={email.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {email.aiGenerated ? (
                          <Bot className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4 text-gray-600" />
                        )}
                        <Badge className={`text-xs ${getEmailTypeColor(email.type)}`}>
                          {email.type.replace('_', ' ')}
                        </Badge>
                        {email.responseReceived && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Response Received
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{email.subject}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>To: {email.to.map(t => t.email).join(', ')}</span>
                        <span>•</span>
                        <span>{DataService.formatTimestamp(email.timestamp)}</span>
                        {email.responseTime && (
                          <>
                            <span>•</span>
                            <span>Response: {DataService.formatTimestamp(email.responseTime)}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(email.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedThread(selectedThread === email.threadId ? null : email.threadId)}
                      >
                        View Thread ({threadEmails.length})
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {selectedThread === email.threadId && (
                  <CardContent>
                    <div className="space-y-4">
                      {threadEmails.map((threadEmail, index) => (
                        <div
                          key={threadEmail.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            threadEmail.aiGenerated 
                              ? 'bg-blue-50 border-l-blue-500' 
                              : 'bg-gray-50 border-l-gray-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {threadEmail.aiGenerated ? (
                                <Bot className="h-4 w-4 text-blue-600" />
                              ) : (
                                <User className="h-4 w-4 text-gray-600" />
                              )}
                              <span className="font-medium text-sm">
                                {threadEmail.from.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {DataService.formatTimestamp(threadEmail.timestamp)}
                              </span>
                            </div>
                            {threadEmail.sentiment && (
                              <Badge variant="outline" className={`text-xs ${
                                threadEmail.sentiment === 'positive' 
                                  ? 'text-green-600' 
                                  : threadEmail.sentiment === 'negative' 
                                  ? 'text-red-600' 
                                  : 'text-gray-600'
                              }`}>
                                {threadEmail.sentiment}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {formatEmailContent(threadEmail.content)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <p className="text-gray-600 text-sm">Customize AI-generated email templates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <h4 className="font-medium">Warm Introduction</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Template for warm introductions via mutual connections
                      </p>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <h4 className="font-medium">Cold Outreach</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Template for direct outreach to investors
                      </p>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <h4 className="font-medium">Follow-up</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Template for follow-up emails after initial outreach
                      </p>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <h4 className="font-medium">Meeting Request</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Template for scheduling investor meetings
                      </p>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}