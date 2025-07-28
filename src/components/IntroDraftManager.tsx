import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Bot, User, Check, X, Lightbulb, Target, Send, Clock } from 'lucide-react';
import introDrafts from '@/data/intro-drafts.json';
import { DataService } from '@/services/dataService';
import toast from 'react-hot-toast';

export function IntroDraftManager() {
  const [selectedDraft, setSelectedDraft] = useState(introDrafts[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(selectedDraft.finalDraft);
  const [showOriginal, setShowOriginal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApproveDraft = () => {
    toast.success(`✅ Draft approved for ${selectedDraft.investorName}! Agent will send introduction.`, {
      duration: 4000,
      style: { background: '#059669', color: '#fff' }
    });
  };

  const handleRejectDraft = () => {
    toast.error(`❌ Draft rejected. Agent will revise introduction for ${selectedDraft.investorName}.`, {
      duration: 4000
    });
  };

  const handleSaveEdits = () => {
    setIsEditing(false);
    toast.success('Draft updated successfully! Changes saved for agent review.', {
      duration: 3000
    });
  };

  const formatEmailContent = (content: string) => {
    return (content || '').split('\n').map((line, index) => (
      <div key={index} className={line.trim() === '' ? 'mb-2' : ''}>
        {line || '\u00A0'}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black">Introduction Draft Management</h3>
        <p className="text-gray-600 mt-1">Review and approve AI-generated warm introductions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Draft List */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pending Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {introDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    onClick={() => setSelectedDraft(draft)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedDraft.id === draft.id
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-black text-sm">{draft.investorName}</span>
                      <Badge className={`text-xs ${getStatusColor(draft.status)}`}>
                        {draft.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{draft.type.replace('_', ' ')}</p>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-gray-500">
                        {draft.agentAnalysis.confidence}% confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Draft Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Introduction Draft: {selectedDraft.investorName}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Via {selectedDraft.connector.name} • {DataService.formatTimestamp(selectedDraft.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(selectedDraft.status)}`}>
                    {selectedDraft.status.replace('_', ' ')}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOriginal(!showOriginal)}
                  >
                    {showOriginal ? 'Show Final' : 'Show Original'}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Email Content */}
              <div>
                <h4 className="font-semibold text-black mb-3 flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  {showOriginal ? 'Original AI Draft' : 'Final Draft'}
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
                  {isEditing ? (
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-96 font-mono text-sm"
                    />
                  ) : (
                    <div className="font-mono text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {formatEmailContent(showOriginal ? selectedDraft.originalDraft : selectedDraft.finalDraft)}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <Button onClick={handleSaveEdits} size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* AI Analysis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Bot className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">AI Analysis & Optimization</h4>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {selectedDraft.agentAnalysis.confidence}% confidence
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-blue-800 block mb-1">Personalizations Applied:</span>
                    <ul className="space-y-1">
                      {selectedDraft.agentAnalysis.personalizations.map((item, idx) => (
                        <li key={idx} className="text-sm text-blue-700 flex items-start">
                          <Target className="h-3 w-3 mr-2 mt-0.5 text-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <span className="text-sm font-medium text-green-800 block mb-1">Expected Outcome:</span>
                    <p className="text-sm text-green-700">{selectedDraft.agentAnalysis.expectedResponse.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              {/* Human Feedback */}
              {selectedDraft.humanFeedback && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-900">Human Feedback</span>
                  </div>
                  <p className="text-sm text-yellow-800">{selectedDraft.humanFeedback}</p>
                  
                  {selectedDraft.humanEdits && selectedDraft.humanEdits.length > 0 && (
                    <div className="mt-3">
                      <span className="text-sm font-medium text-yellow-800 block mb-1">Edits Made:</span>
                      <ul className="space-y-1">
                        {selectedDraft.humanEdits.map((edit, idx) => (
                          <li key={idx} className="text-sm text-yellow-700 flex items-start">
                            <Check className="h-3 w-3 mr-2 mt-0.5 text-yellow-600" />
                            {edit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Suggested Improvements */}
              {selectedDraft.suggestedImprovements && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-900">Agent Suggestions</span>
                  </div>
                  <ul className="space-y-1">
                    {selectedDraft.suggestedImprovements.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-purple-700 flex items-start">
                        <span className="mr-2">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {!isEditing && selectedDraft.status === 'pending_approval' && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Draft
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {selectedDraft.status === 'pending_approval' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleRejectDraft}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        onClick={handleApproveDraft}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve & Send
                      </Button>
                    </>
                  )}
                  
                  {selectedDraft.status === 'approved' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Approved - Agent will send</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}