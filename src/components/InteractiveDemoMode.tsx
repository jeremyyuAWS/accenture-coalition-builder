import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, FastForward, Bot, Users, CheckCircle, Clock } from 'lucide-react';
import { LoadingState } from './LoadingStates';
import toast from 'react-hot-toast';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  agentActions: string[];
  outcome: string;
  metrics?: {
    progress: number;
    confidence: number;
  };
}

const demoSteps: DemoStep[] = [
  {
    id: 'discovery',
    title: 'Investor Discovery',
    description: 'AI analyzes 500+ investor profiles to find optimal matches',
    duration: 3000,
    agentActions: [
      'Scanning investor database...',
      'Analyzing portfolio overlaps...',
      'Calculating fit scores...',
      'Ranking optimal matches...'
    ],
    outcome: 'Found 3 high-confidence investor matches (85%+ fit scores)',
    metrics: { progress: 100, confidence: 92 }
  },
  {
    id: 'pathfinding',
    title: 'Warm Connection Discovery',
    description: 'Finding optimal introduction paths via LinkedIn and CRM data',
    duration: 4000,
    agentActions: [
      'Mapping LinkedIn connections...',
      'Analyzing relationship strength...',
      'Evaluating introduction paths...',
      'Prioritizing warm routes...'
    ],
    outcome: 'Identified 2 warm introduction paths with 78% success probability',
    metrics: { progress: 100, confidence: 87 }
  },
  {
    id: 'drafting',
    title: 'Personalized Outreach Creation',
    description: 'AI drafts customized introduction emails with portfolio context',
    duration: 2500,
    agentActions: [
      'Researching investor preferences...',
      'Analyzing successful email patterns...',
      'Crafting personalized introductions...',
      'Optimizing for response rates...'
    ],
    outcome: 'Created 3 personalized introduction drafts ready for approval',
    metrics: { progress: 100, confidence: 89 }
  },
  {
    id: 'execution',
    title: 'Automated Outreach',
    description: 'Sending introductions and managing follow-up sequences',
    duration: 3500,
    agentActions: [
      'Sending warm introductions...',
      'Tracking email engagement...',
      'Processing investor responses...',
      'Scheduling follow-ups...'
    ],
    outcome: 'Sent 3 introductions, received 2 positive responses (67% response rate)',
    metrics: { progress: 100, confidence: 84 }
  },
  {
    id: 'scheduling',
    title: 'Meeting Coordination',
    description: 'AI coordinates calendars and books investor meetings',
    duration: 2000,
    agentActions: [
      'Analyzing calendar availability...',
      'Proposing optimal meeting times...',
      'Coordinating with investor calendars...',
      'Confirming meeting details...'
    ],
    outcome: 'Booked 2 investor meetings within optimal time windows',
    metrics: { progress: 100, confidence: 91 }
  }
];

export function InteractiveDemoMode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1);

  const currentStepData = demoSteps[currentStep];
  const totalProgress = ((currentStep + (currentActionIndex + 1) / currentStepData.agentActions.length) / demoSteps.length) * 100;

  useEffect(() => {
    if (isPlaying && !isComplete) {
      const actionDuration = (currentStepData.duration / currentStepData.agentActions.length) / speed;
      
      const timer = setTimeout(() => {
        if (currentActionIndex < currentStepData.agentActions.length - 1) {
          setCurrentActionIndex(prev => prev + 1);
        } else {
          // Step completed
          toast.success(`✅ ${currentStepData.outcome}`, {
            duration: 3000,
            style: { background: '#059669', color: '#fff' }
          });

          if (currentStep < demoSteps.length - 1) {
            setTimeout(() => {
              setCurrentStep(prev => prev + 1);
              setCurrentActionIndex(0);
              // Show toast when starting new step
              toast.success(`🚀 Starting: ${demoSteps[currentStep + 1].title}`, {
                duration: 2000,
                style: { background: '#3B82F6', color: '#fff' }
              });
            }, 1000);
          } else {
            setIsComplete(true);
            setIsPlaying(false);
            toast.success('🎉 Demo Complete! Coalition successfully built in 15 minutes.', {
              duration: 5000,
              style: { background: '#7c3aed', color: '#fff' }
            });
          }
        }
      }, actionDuration);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, currentActionIndex, speed, isComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCurrentActionIndex(0);
    setIsComplete(false);
  };

  const handleSpeedChange = () => {
    setSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1);
  };

  const handleSkipToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setCurrentActionIndex(0);
    setIsComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">Interactive Demo Mode</h2>
          <p className="text-gray-600 mt-1">Watch AI agents build a coalition in real-time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeedChange}
          >
            <FastForward className="h-4 w-4 mr-2" />
            {speed}x Speed
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            onClick={handlePlayPause}
            className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            disabled={isComplete}
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause Demo' : isComplete ? 'Demo Complete' : 'Start Demo'}
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Demo Progress</CardTitle>
            <Badge variant={isComplete ? "default" : isPlaying ? "secondary" : "outline"}>
              {isComplete ? 'Complete' : isPlaying ? 'Running' : 'Ready'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Step {currentStep + 1} of {demoSteps.length}</span>
              <span>{isComplete ? 'Coalition Built!' : 'In Progress...'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      {!isComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isPlaying ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    {currentStepData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-900">Live Agent Activity</span>
                      </div>
                      <p className="text-blue-800 font-medium mb-2">
                        {currentStepData.agentActions[currentActionIndex]}
                      </p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-blue-700 mb-1">
                          <span>Step Progress</span>
                          <span>{Math.round(((currentActionIndex + 1) / currentStepData.agentActions.length) * 100)}%</span>
                        </div>
                        <Progress value={((currentActionIndex + 1) / currentStepData.agentActions.length) * 100} className="h-2" />
                      </div>
                    </div>
                    
                    {/* Recent Actions */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Recent Actions:</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {currentStepData.agentActions.slice(0, currentActionIndex + 1).map((action, idx) => (
                          <div key={idx} className={`text-xs flex items-center p-2 rounded ${
                            idx === currentActionIndex ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {idx === currentActionIndex ? (
                              <Clock className="h-3 w-3 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                            )}
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    {currentStepData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentStepData.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-black">Agent Actions:</h4>
                    <ul className="space-y-1">
                      {currentStepData.agentActions.map((action, index) => (
                        <li
                          key={index}
                          className={`text-sm flex items-center ${
                            index <= currentActionIndex ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {index <= currentActionIndex ? (
                            <CheckCircle className="h-3 w-3 mr-2" />
                          ) : (
                            <Clock className="h-3 w-3 mr-2" />
                          )}
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            {/* Step Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Demo Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {demoSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => handleSkipToStep(index)}
                      disabled={isPlaying}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentStep
                          ? 'bg-blue-100 border border-blue-300'
                          : index < currentStep
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{step.title}</span>
                        {index < currentStep ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : index === currentStep ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Metrics */}
            {currentStepData.metrics && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Live Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Step Progress</span>
                        <span>{Math.round(((currentActionIndex + 1) / currentStepData.agentActions.length) * 100)}%</span>
                      </div>
                      <Progress value={((currentActionIndex + 1) / currentStepData.agentActions.length) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Confidence</span>
                        <span>{currentStepData.metrics.confidence}%</span>
                      </div>
                      <Progress value={currentStepData.metrics.confidence} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* Completion Summary */
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="h-6 w-6 mr-2" />
              Demo Complete: Coalition Successfully Built!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">15 min</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-gray-600">Meetings Booked</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-700 mb-4">
                In just 15 minutes, AI agents identified optimal investors, found warm introduction paths, 
                crafted personalized outreach, and booked 2 high-quality investor meetings.
              </p>
              <div className="space-x-3">
                <Button onClick={handleReset} variant="outline">
                  Run Demo Again
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Schedule Live Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-black">{Math.round(totalProgress / 20)}</div>
            <div className="text-xs text-gray-600">Investors Analyzed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Bot className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-black">{currentStep * 3 + currentActionIndex}</div>
            <div className="text-xs text-gray-600">Agent Actions</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-black">{Math.round(totalProgress / 50)}</div>
            <div className="text-xs text-gray-600">Tasks Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-black">{Math.round(totalProgress / 10)}min</div>
            <div className="text-xs text-gray-600">Time Elapsed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}