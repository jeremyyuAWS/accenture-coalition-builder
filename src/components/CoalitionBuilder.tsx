import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Brain,
  Network,
  Mail,
  Calendar,
  TrendingUp,
  AlertCircle,
  Bot,
  User,
  Eye,
  Edit,
  Send,
  Target,
  Activity,
  BarChart3,
  FileText,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { DataService } from '@/services/dataService';
import { ActivityTimeline } from './ActivityTimeline';
import { KanbanBoard } from './KanbanBoard';
import { WarmPathfinding } from './WarmPathfinding';
import { IntroDraftManager } from './IntroDraftManager';
import { OutreachExecution } from './OutreachExecution';
import coalitionWorkflows from '@/data/coalition-workflows.json';
import investorsData from '@/data/investors.json';
import toast from 'react-hot-toast';
import { NetworkGraph } from './NetworkGraph';
import networkConnections from '@/data/network-connections.json';

export function CoalitionBuilder() {
  const [activeWorkflow, setActiveWorkflow] = useState(coalitionWorkflows[0]);
  const [currentView, setCurrentView] = useState('overview');
  const [workflowState, setWorkflowState] = useState('ready'); // ready, running, paused, completed
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [liveMetrics, setLiveMetrics] = useState({
    investorsAnalyzed: 0,
    pathsFound: 0,
    emailsDrafted: 0,
    outreachSent: 0,
    responsesReceived: 0,
    meetingsScheduled: 0
  });

  const stages = [
    { 
      id: 'discovery', 
      name: 'Discovery', 
      icon: Target,
      description: 'AI identifies and scores optimal co-investors',
      agentActions: [
        'Analyzing 500+ investor profiles...',
        'Calculating portfolio overlap scores...',
        'Evaluating investment stage alignment...',
        'Ranking by fit score and availability...'
      ],
      outcome: '3 high-confidence matches found (92% avg fit score)',
      duration: 3000,
      metrics: { investorsAnalyzed: 127, pathsFound: 0, emailsDrafted: 0 }
    },
    { 
      id: 'pathfinding', 
      name: 'Warm Paths', 
      icon: Network,
      description: 'Find optimal warm introduction routes',
      agentActions: [
        'Scanning LinkedIn connections...',
        'Analyzing relationship strength...',
        'Mapping introduction pathways...',
        'Evaluating success probabilities...'
      ],
      outcome: '2 warm introduction paths identified (87% success rate)',
      duration: 4000,
      metrics: { investorsAnalyzed: 127, pathsFound: 3, emailsDrafted: 0 }
    },
    { 
      id: 'drafting', 
      name: 'Draft Intros', 
      icon: Edit,
      description: 'AI crafts personalized introductions',
      agentActions: [
        'Researching investor preferences...',
        'Analyzing successful intro patterns...',
        'Personalizing content for each investor...',
        'Optimizing for response rates...'
      ],
      outcome: '3 personalized drafts created (89% confidence)',
      duration: 2500,
      metrics: { investorsAnalyzed: 127, pathsFound: 3, emailsDrafted: 3 }
    },
    { 
      id: 'execution', 
      name: 'Outreach', 
      icon: Send,
      description: 'Execute outreach and manage responses',
      agentActions: [
        'Sending warm introductions...',
        'Tracking email engagement...',
        'Processing investor responses...',
        'Managing follow-up sequences...'
      ],
      outcome: '2 positive responses received (67% response rate)',
      duration: 3500,
      metrics: { investorsAnalyzed: 127, pathsFound: 3, emailsDrafted: 3, outreachSent: 3, responsesReceived: 2 }
    },
    { 
      id: 'scheduling', 
      name: 'Meetings', 
      icon: Calendar,
      description: 'Coordinate calendars and book meetings',
      agentActions: [
        'Analyzing calendar availability...',
        'Proposing optimal meeting times...',
        'Coordinating with investor schedules...',
        'Confirming meeting details...'
      ],
      outcome: '2 investor meetings successfully booked',
      duration: 2000,
      metrics: { investorsAnalyzed: 127, pathsFound: 3, emailsDrafted: 3, outreachSent: 3, responsesReceived: 2, meetingsScheduled: 2 }
    }
  ];

  const selectedInvestors = investorsData.filter(inv => ['1', '2', '3'].includes(inv.id));

  // Workflow automation
  useEffect(() => {
    if (workflowState === 'running') {
      runWorkflowSimulation();
    }
  }, [workflowState]);

  const runWorkflowSimulation = async () => {
    for (let i = 0; i < stages.length; i++) {
      if (workflowState !== 'running') break;
      
      setCurrentStage(i);
      const stage = stages[i];
      
      // Start stage toast
      toast.success(`🚀 Starting: ${stage.name}`, {
        duration: 2000,
        style: { background: '#3B82F6', color: '#fff' }
      });

      // Run stage actions
      for (let j = 0; j < stage.agentActions.length; j++) {
        if (workflowState !== 'running') break;
        
        // Update live metrics
        setLiveMetrics(stage.metrics);
        
        await new Promise(resolve => setTimeout(resolve, stage.duration / stage.agentActions.length));
      }

      // Complete stage
      if (workflowState === 'running') {
        setCompletedStages(prev => [...prev, stage.id]);
        toast.success(`✅ ${stage.outcome}`, {
          duration: 3000,
          style: { background: '#059669', color: '#fff' }
        });
        
        // Update progress
        setAnimatedProgress(((i + 1) / stages.length) * 100);
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (workflowState === 'running') {
      setWorkflowState('completed');
      toast.success('🎉 Coalition Builder Complete! 2 meetings booked, 3 weeks saved.', {
        duration: 5000,
        style: { background: '#7c3aed', color: '#fff' }
      });
    }
  };

  const handleStartWorkflow = () => {
    setWorkflowState('running');
    setCompletedStages([]);
    setAnimatedProgress(0);
    setCurrentStage(0);
    setLiveMetrics({ investorsAnalyzed: 0, pathsFound: 0, emailsDrafted: 0, outreachSent: 0, responsesReceived: 0, meetingsScheduled: 0 });
  };

  const handlePauseWorkflow = () => {
    setWorkflowState('paused');
  };

  const handleResetWorkflow = () => {
    setWorkflowState('ready');
    setCompletedStages([]);
    setAnimatedProgress(0);
    setCurrentStage(0);
    setLiveMetrics({ investorsAnalyzed: 0, pathsFound: 0, emailsDrafted: 0, outreachSent: 0, responsesReceived: 0, meetingsScheduled: 0 });
  };

  const getStageStatus = (index: number) => {
    if (completedStages.includes(stages[index].id)) return 'completed';
    if (index === currentStage && workflowState === 'running') return 'in_progress';
    return 'pending';
  };

  const renderWorkflowControls = () => (
    <div className="flex items-center space-x-3">
      {workflowState === 'ready' && (
        <Button 
          onClick={handleStartWorkflow}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Play className="h-4 w-4 mr-2" />
          🚀 Run Live Workflow Demo
        </Button>
      )}
      
      {workflowState === 'running' && (
        <Button 
          onClick={handlePauseWorkflow}
          className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
        >
          <Pause className="h-4 w-4 mr-2" />
          Pause Workflow
        </Button>
      )}
      
      {(workflowState === 'paused' || workflowState === 'completed') && (
        <>
          <Button 
            onClick={handleResetWorkflow}
            variant="outline"
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          {workflowState === 'paused' && (
            <Button 
              onClick={() => setWorkflowState('running')}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          )}
        </>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Selected Investors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Selected Co-Investors ({selectedInvestors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedInvestors.map((investor) => (
              <div key={investor.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <img
                  src={investor.avatar}
                  alt={investor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-black text-sm truncate">{investor.name}</p>
                  <p className="text-xs text-gray-500 truncate">{investor.company}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {investor.fitScore}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Workflow Progress
            </CardTitle>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">{Math.round(animatedProgress)}%</div>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative">
              <Progress value={animatedProgress} className="h-4" />
              {workflowState === 'running' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-full opacity-50 animate-pulse"></div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const status = getStageStatus(index);
                
                return (
                  <div
                    key={stage.id}
                    className={`p-3 lg:p-4 rounded-lg border-2 transition-all duration-300 ${
                      status === 'completed' 
                        ? 'border-green-300 bg-green-50 animate-bounce-in' 
                        : status === 'in_progress' 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-400 ring-opacity-75 animate-pulse-slow' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 lg:mb-2">
                      <Icon className={`h-5 w-5 transition-colors duration-300 ${
                        status === 'completed' ? 'text-green-600' : 
                        status === 'in_progress' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="relative">
                        {status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : status === 'in_progress' ? (
                          <Clock className="h-4 w-4 text-blue-600 animate-spin" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        {status === 'completed' && (
                          <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">
                            ✨
                          </div>
                        )}
                      </div>
                    </div>
                    <h4 className="font-medium text-black text-sm">{stage.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 hidden lg:block">{stage.description}</p>
                    <div className="mt-1 lg:mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          status === 'completed' ? 'text-green-600 border-green-300 bg-green-50' :
                          status === 'in_progress' ? 'text-blue-600 border-blue-300 bg-blue-50 animate-pulse' :
                          'text-gray-500 border-gray-300'
                        }`}
                      >
                        {status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Agent Activity */}
      {workflowState === 'running' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Bot className="h-5 w-5 mr-2" />
              Live Agent Activity
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Bot className="h-5 w-5 text-blue-600 animate-pulse" />
                <p className="font-medium text-blue-900">
                  {stages[currentStage]?.agentActions[0] || 'Processing...'}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">{liveMetrics.investorsAnalyzed}</div>
                  <div className="text-xs text-blue-700">Analyzed</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">{liveMetrics.pathsFound}</div>
                  <div className="text-xs text-green-700">Paths Found</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">{liveMetrics.emailsDrafted}</div>
                  <div className="text-xs text-purple-700">Drafts Ready</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Celebration */}
      {workflowState === 'completed' && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-bold text-green-800">Coalition Successfully Built!</h3>
              <p className="text-green-700">
                AI agents completed the full workflow: 3 investors identified, 2 warm paths found, 
                3 personalized intros sent, 2 positive responses, 2 meetings booked.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-green-600">67%</div>
                  <div className="text-sm text-gray-600">Response Rate</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-gray-600">Meetings Booked</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3 weeks</div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coalition Network Map */}
      {(workflowState === 'completed' || selectedInvestors.length > 0) && (
        <NetworkGraph
          data={networkConnections[1]}
          title="Coalition Network Dynamics"
          height={350}
          layout="force"
          onNodeClick={(node) => {
            if (node.type === 'lead_investor' || node.type === 'coalition_member') {
              toast.success(`Viewing details for ${node.name} (${node.company})`, { 
                duration: 3000,
                style: { background: '#059669', color: '#fff' }
              });
            }
          }}
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div>
          <h2 className="text-3xl font-bold text-black">Capital Connect Workflow</h2>
          <p className="text-gray-600 mt-1">Intelligent automation for investment syndication</p>
        </div>
        <div className="flex items-center space-x-3">
          {renderWorkflowControls()}
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={currentView} onValueChange={setCurrentView}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="pipeline">
            <Activity className="h-4 w-4 mr-2" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="pathfinding">
            <Network className="h-4 w-4 mr-2" />
            Warm Paths
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <Edit className="h-4 w-4 mr-2" />
            Drafts
          </TabsTrigger>
          <TabsTrigger value="outreach">
            <Send className="h-4 w-4 mr-2" />
            Outreach
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <KanbanBoard />
        </TabsContent>

        <TabsContent value="pathfinding" className="space-y-6">
          <WarmPathfinding />
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <IntroDraftManager />
        </TabsContent>

        <TabsContent value="outreach" className="space-y-6">
          <OutreachExecution />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityTimeline />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Coalition Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {activeWorkflow.completedIntros}
                      </div>
                      <div className="text-xs text-blue-700">Intros Completed</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {activeWorkflow.meetingsBooked}
                      </div>
                      <div className="text-xs text-green-700">Meetings Booked</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Coalition Progress</span>
                      <span>{Math.round((activeWorkflow.completedIntros / activeWorkflow.targetInvestors) * 100)}%</span>
                    </div>
                    <Progress value={(activeWorkflow.completedIntros / activeWorkflow.targetInvestors) * 100} className="h-3" />
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    Expected completion: {new Date(activeWorkflow.expectedCompletion).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {(workflowState === 'ready' || workflowState === 'completed') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Integration Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-tab', { detail: 'evaluation' }))}>
                <Target className="h-5 w-5" />
                <span className="text-sm">Back to Evaluation</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-tab', { detail: 'emails' }))}>
                <Mail className="h-5 w-5" />
                <span className="text-sm">Email Management</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-tab', { detail: 'calendar' }))}>
                <Calendar className="h-5 w-5" />
                <span className="text-sm">View Calendar</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-tab', { detail: 'analytics' }))}>
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">Full Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}