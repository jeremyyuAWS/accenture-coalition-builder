import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, User, Clock, CheckCircle, AlertCircle, Play, Pause, RotateCcw } from 'lucide-react';
import workflows from '@/data/agent-workflows.json';
import { DataService } from '@/services/dataService';
import toast from 'react-hot-toast';

export function WorkflowVisualization() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimatedStep, setCurrentAnimatedStep] = useState(-1);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Animate workflow progression
  useEffect(() => {
    if (isPlaying && currentAnimatedStep < selectedWorkflow.steps.length) {
      const currentStep = selectedWorkflow.steps[currentAnimatedStep];
      
      if (currentAnimatedStep === -1) {
        // Start animation
        setCurrentAnimatedStep(0);
        setCompletedSteps([]);
        setAnimationProgress(0);
        toast.success(`🚀 Starting workflow simulation for ${DataService.getInvestorName(selectedWorkflow.investorId)}`, {
          duration: 2000,
          style: { background: '#3B82F6', color: '#fff' }
        });
        return;
      }

      // Simulate step duration
      const stepDuration = Math.max(1000, (currentStep?.duration || 60) * 10); // Scale duration for demo
      const progressInterval = 50; // Update progress every 50ms
      const progressIncrement = 100 / (stepDuration / progressInterval);

      let progress = 0;
      const progressTimer = setInterval(() => {
        progress += progressIncrement;
        setAnimationProgress(Math.min(progress, 100));

        if (progress >= 100) {
          clearInterval(progressTimer);
          
          // Mark step as completed
          setCompletedSteps(prev => [...prev, currentAnimatedStep]);
          setAnimationProgress(0);
          
          // Show completion toast
          if (currentStep) {
            toast.success(`✅ ${currentStep.name} completed!`, {
              duration: 2000,
              style: { background: '#059669', color: '#fff' }
            });
          }

          // Move to next step after a brief pause
          setTimeout(() => {
            if (currentAnimatedStep < selectedWorkflow.steps.length - 1) {
              setCurrentAnimatedStep(prev => prev + 1);
            } else {
              // Workflow complete
              setIsPlaying(false);
              setCurrentAnimatedStep(-1);
              toast.success('🎉 Workflow simulation complete! All steps executed successfully.', {
                duration: 4000,
                style: { background: '#7c3aed', color: '#fff' }
              });
            }
          }, 500);
        }
      }, progressInterval);

      return () => clearInterval(progressTimer);
    }
  }, [isPlaying, currentAnimatedStep, selectedWorkflow]);

  const handleSimulate = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentAnimatedStep(-1);
      setAnimationProgress(0);
      toast.success('Simulation paused', { duration: 1500 });
    } else {
      setIsPlaying(true);
      setCurrentAnimatedStep(-1);
      setCompletedSteps([]);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentAnimatedStep(-1);
    setAnimationProgress(0);
    setCompletedSteps([]);
    toast.success('Simulation reset', { duration: 1500 });
  };

  const getStepIcon = (type: string, status: string) => {
    if (type === 'agent_action') {
      return status === 'completed' ? 
        <CheckCircle className="h-4 w-4 text-green-600" /> : 
        <Bot className="h-4 w-4 text-blue-600" />;
    }
    return status === 'completed' ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <User className="h-4 w-4 text-gray-600" />;
  };

  const getAnimatedStepStatus = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentAnimatedStep && isPlaying) return 'in_progress';
    return selectedWorkflow.steps[stepIndex]?.status || 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 border-blue-500 text-blue-800 animate-pulse ring-2 ring-blue-400 ring-opacity-75';
      case 'pending':
        return 'bg-gray-100 border-gray-500 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateProgress = (workflow: any) => {
    return Math.round((workflow.completedSteps / workflow.totalSteps) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">Multi-Step Agent Workflows</h3>
          <p className="text-gray-600 mt-1">Watch AI agents execute complex sequences autonomously</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            {workflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant={selectedWorkflow.id === workflow.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedWorkflow(workflow)}
                className="text-xs"
              >
                {workflow.name.split(' ')[0]}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleSimulate}
            className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
            size="sm"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? 'Stop' : 'Simulate'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            disabled={isPlaying}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{selectedWorkflow.name}</CardTitle>
              <p className="text-sm text-gray-600">
                For {DataService.getInvestorName(selectedWorkflow.investorId)} • {' '}
                Started {DataService.formatTimestamp(selectedWorkflow.startTime)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">
                {calculateProgress(selectedWorkflow)}%
              </div>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: {selectedWorkflow.completedSteps} of {selectedWorkflow.totalSteps} steps</span>
              <Badge variant={selectedWorkflow.status === 'completed' ? 'default' : 'secondary'}>
                {selectedWorkflow.status}
              </Badge>
            </div>
            <Progress value={calculateProgress(selectedWorkflow)} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {selectedWorkflow.steps.map((step, index) => (
                <div key={step.stepId} className="relative flex items-start space-x-4">
                  {/* Step Icon */}
                  <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    getAnimatedStepStatus(index) === 'completed' ? 'bg-green-100 border-green-500' :
                    getAnimatedStepStatus(index) === 'in_progress' ? 'bg-blue-100 border-blue-500 animate-pulse ring-2 ring-blue-400 ring-opacity-75' :
                    'bg-gray-100 border-gray-300'
                  }`}>
                    {getStepIcon(step.type, getAnimatedStepStatus(index))}
                    
                    {/* Animation glow effect for current step */}
                    {index === currentAnimatedStep && isPlaying && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${getStatusColor(getAnimatedStepStatus(index))}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-black">
                            Step {step.stepId}: {step.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {step.type === 'agent_action' ? 'AI Agent' : 'Human'}
                          </Badge>
                          {step.confidence && (
                            <Badge variant="outline" className="text-xs">
                              {step.confidence}% confidence
                            </Badge>
                          )}
                        </div>
                        {step.duration && (
                          <span className="text-sm text-gray-600">
                            {formatDuration(step.duration)}
                          </span>
                        )}
                      </div>

                      {/* Live progress bar for current step */}
                      {index === currentAnimatedStep && isPlaying && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-blue-600 font-medium">⚡ Executing...</span>
                            <span className="text-blue-600">{Math.round(animationProgress)}%</span>
                          </div>
                          <Progress value={animationProgress} className="h-2" />
                        </div>
                      )}

                      <p className="text-sm text-gray-700 mb-3">{step.details}</p>

                      {/* Step Outputs */}
                      {step.outputs && step.outputs.length > 0 && (
                        <div className="mb-3">
                          <span className="text-xs font-medium text-gray-600 mb-1 block">Generated:</span>
                          <div className="flex flex-wrap gap-1">
                            {step.outputs.map((output, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {output}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Human Feedback */}
                      {step.humanFeedback && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                          <span className="text-xs font-medium text-yellow-800 block mb-1">Human Feedback:</span>
                          <p className="text-xs text-yellow-700">{step.humanFeedback}</p>
                        </div>
                      )}

                      {/* Recommendations */}
                      {step.recommendations && step.recommendations.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <span className="text-xs font-medium text-blue-800 block mb-1">AI Recommendations:</span>
                          <ul className="text-xs text-blue-700 space-y-1">
                            {step.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-1">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Time indicators */}
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        {/* Live timer for current step */}
                        {index === currentAnimatedStep && isPlaying && (
                          <span className="text-blue-600 font-medium animate-pulse">
                            🤖 Agent working...
                          </span>
                        )}
                        {step.startTime && (
                          <span>Started: {DataService.formatTimestamp(step.startTime)}</span>
                        )}
                        {step.endTime && (
                          <span>Completed: {DataService.formatTimestamp(step.endTime)}</span>
                        )}
                        {step.estimatedDuration && step.status !== 'completed' && (
                          <span>Est. {formatDuration(step.estimatedDuration)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Animation Summary */}
            {isPlaying && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900">Live Simulation Running</h4>
                    <p className="text-sm text-blue-800">
                      Step {currentAnimatedStep + 1} of {selectedWorkflow.steps.length}: {selectedWorkflow.steps[currentAnimatedStep]?.name}
                    </p>
                  </div>
                  <div className="text-right text-blue-600">
                    <div className="text-lg font-bold">{Math.round(((currentAnimatedStep + animationProgress/100) / selectedWorkflow.steps.length) * 100)}%</div>
                    <div className="text-xs">Complete</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Workflow Metrics */}
          {selectedWorkflow.metrics && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-black mb-4">Workflow Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {selectedWorkflow.metrics.totalTime}
                  </div>
                  <div className="text-xs text-blue-700">Total Time</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {selectedWorkflow.metrics.agentTime}
                  </div>
                  <div className="text-xs text-green-700">Agent Time</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {selectedWorkflow.metrics.efficiency}%
                  </div>
                  <div className="text-xs text-purple-700">Efficiency</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    {selectedWorkflow.metrics.outcome}
                  </div>
                  <div className="text-xs text-orange-700">Outcome</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}