import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  Users,
  Bot,
  Target,
  BarChart3
} from 'lucide-react';

const helpTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of Coalition Builder',
    icon: Target,
    articles: [
      'How to set up your first coalition',
      'Understanding AI investor recommendations',
      'Setting up warm introduction paths',
      'Managing agent approvals'
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Understanding how AI agents work',
    icon: Bot,
    articles: [
      'How AI agents find investors',
      'Configuring agent autonomy levels',
      'Understanding confidence scores',
      'Agent decision transparency'
    ]
  },
  {
    id: 'workflow',
    title: 'Workflow Management',
    description: 'Managing your coalition building process',
    icon: Users,
    articles: [
      'Coalition Builder workflow stages',
      'Email management and approvals',
      'Calendar integration and scheduling',
      'Progress tracking and analytics'
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    description: 'Understanding your performance metrics',
    icon: BarChart3,
    articles: [
      'Reading conversion funnels',
      'Agent productivity metrics',
      'ROI calculation methodology',
      'Exporting reports and data'
    ]
  }
];

const faqs = [
  {
    question: 'How does AI find warm introduction paths?',
    answer: 'Our AI analyzes your LinkedIn connections, email contacts, and CRM data to identify mutual connections with target investors. It evaluates relationship strength and introduction probability to recommend the best paths.'
  },
  {
    question: 'What level of control do I have over AI agents?',
    answer: 'You have complete control. You can set autonomy levels from requiring approval for every action to full autonomy with notifications. All agent decisions are transparent and can be overridden.'
  },
  {
    question: 'How accurate are the investor fit scores?',
    answer: 'Fit scores are calculated using 50+ factors including portfolio overlap, investment criteria, response patterns, and market timing. Our model achieves 89% accuracy in predicting successful connections.'
  },
  {
    question: 'Can I customize email templates?',
    answer: 'Yes! You can customize all email templates, review and edit AI-generated drafts before sending, and create your own templates for different scenarios.'
  },
  {
    question: 'How does the warm introduction process work?',
    answer: 'AI identifies mutual connections, drafts personalized introduction requests, sends them via your preferred connector, and tracks responses. You approve all outreach before it\'s sent.'
  },
  {
    question: 'What integrations are available?',
    answer: 'We integrate with LinkedIn, Gmail, Google Calendar, Salesforce, HubSpot, and other major platforms. All integrations respect your privacy and security preferences.'
  }
];

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`}></div>
        </div>
      )}
    </div>
  );
}

export function HelpModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(helpTopics[0]);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          aria-label="Help & Documentation"
        >
          <HelpCircle className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Help & Documentation
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-[70vh]">
          <Tabs defaultValue="topics" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="topics">Help Topics</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="topics" className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                  {helpTopics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <Card 
                        key={topic.id}
                        className={`cursor-pointer transition-colors ${
                          selectedTopic.id === topic.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <h3 className="font-medium text-black">{topic.title}</h3>
                              <p className="text-sm text-gray-600">{topic.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-black">{selectedTopic.title}</h3>
                  <div className="space-y-2">
                    {selectedTopic.articles.map((article, index) => (
                      <div 
                        key={index}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black">{article}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4 overflow-y-auto h-full">
              <div className="space-y-2">
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-black mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Video className="h-5 w-5 mr-2" />
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                        <span className="text-sm">Getting Started Guide</span>
                        <Badge variant="outline" className="text-xs">5 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                        <span className="text-sm">Advanced Workflows</span>
                        <Badge variant="outline" className="text-xs">12 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border border-gray-200 rounded">
                        <span className="text-sm">AI Configuration</span>
                        <Badge variant="outline" className="text-xs">8 min</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Live Chat
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <div className="text-center text-sm text-gray-600">
                      <p>Average response time: 2 hours</p>
                      <div className="flex items-center justify-center mt-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>4.9/5 Support Rating</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}