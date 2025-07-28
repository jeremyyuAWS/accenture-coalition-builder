import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Share, Bot, User, Lock, Clock, Filter } from 'lucide-react';
import documents from '@/data/documents.json';
import { DataService } from '@/services/dataService';

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pitch_deck':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'financial_model':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'legal_document':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'due_diligence':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'market_research':
        return <FileText className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'template':
        return 'bg-blue-100 text-blue-800';
      case 'confidential':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const documentTypes = [...new Set(documents.map(doc => doc.type))];
  const documentStatuses = [...new Set(documents.map(doc => doc.status))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">Document Library</h3>
          <p className="text-gray-600 mt-1">AI-generated and curated deal materials</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <FileText className="h-4 w-4 mr-2" />
          New Document
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {documentStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getDocumentIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-black text-sm truncate">{doc.name}</h4>
                    <p className="text-xs text-gray-500">{doc.version}</p>
                  </div>
                </div>
                {doc.accessRestricted && (
                  <Lock className="h-4 w-4 text-red-500" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </Badge>
                <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
              </div>

              <div className="flex items-center space-x-2">
                {doc.agentGenerated ? (
                  <Bot className="h-4 w-4 text-blue-600" />
                ) : (
                  <User className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-xs text-gray-600">
                  {doc.agentGenerated ? 'AI Generated' : 'Human Created'}
                </span>
                {doc.humanReviewed && (
                  <Badge variant="outline" className="text-xs">
                    Human Reviewed
                  </Badge>
                )}
              </div>

              {/* Customizations */}
              {doc.customizations && doc.customizations.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-600 block mb-1">AI Customizations:</span>
                  <div className="space-y-1">
                    {doc.customizations.slice(0, 2).map((customization, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="mr-1 text-blue-500">•</span>
                        {customization}
                      </div>
                    ))}
                    {doc.customizations.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{doc.customizations.length - 2} more customizations
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contents Preview */}
              {doc.contents && doc.contents.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-600 block mb-1">Contents:</span>
                  <div className="space-y-1">
                    {doc.contents.slice(0, 3).map((content, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="mr-1">•</span>
                        {content}
                      </div>
                    ))}
                    {doc.contents.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{doc.contents.length - 3} more sections
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Last Modified */}
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Modified {DataService.formatTimestamp(doc.lastModified)}
              </div>

              {/* Auto-update indicator */}
              {doc.autoUpdated && (
                <div className="bg-blue-50 border border-blue-200 rounded p-2">
                  <div className="flex items-center text-xs text-blue-800">
                    <Bot className="h-3 w-3 mr-1" />
                    Auto-updates enabled
                  </div>
                  {doc.nextUpdate && (
                    <div className="text-xs text-blue-700 mt-1">
                      Next: {DataService.formatTimestamp(doc.nextUpdate)}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>

              {/* Shared with */}
              {doc.sharedWith && doc.sharedWith.length > 0 && (
                <div className="text-xs text-gray-500">
                  Shared with {doc.sharedWith.length} investor{doc.sharedWith.length > 1 ? 's' : ''}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}