import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Users, Zap, Target, Clock, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

const onboardingSteps = [
  {
    title: "Welcome to Coalition Builder",
    subtitle: "The AI-powered co-investor syndication platform",
    content: (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
          <Sparkles className="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black mb-2">Transform Your Fundraising</h3>
          <p className="text-gray-600">
            Watch AI agents automatically build investor coalitions while you maintain complete control and visibility.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-blue-900">85% Faster</div>
            <div className="text-xs text-blue-700">Time to first meeting</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-green-900">2.5x Better</div>
            <div className="text-xs text-green-700">Response rates</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-purple-900">156 Tasks</div>
            <div className="text-xs text-purple-700">Automated per deal</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Meet Your Demo Company",
    subtitle: "DataFlow Solutions - Series A Fundraising",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DF</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">DataFlow Solutions</h3>
              <p className="text-gray-600">AI-powered enterprise analytics platform</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-600">$2.1M</div>
              <div className="text-xs text-gray-600">ARR</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-600">15%</div>
              <div className="text-xs text-gray-600">MoM Growth</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-600">45</div>
              <div className="text-xs text-gray-600">Enterprise Customers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-600">95%</div>
              <div className="text-xs text-gray-600">Retention</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-black mb-3">Fundraising Objective</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Raise $12M Series A at $48M valuation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Target enterprise SaaS investors</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Leverage warm connections when possible</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Complete fundraising within 8 weeks</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "How Coalition Builder Works",
    subtitle: "5-stage intelligent workflow automation",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              step: 1,
              title: "Discovery",
              description: "AI analyzes 500+ investors to find optimal matches",
              icon: Target,
              color: "text-blue-600",
              bgColor: "bg-blue-50"
            },
            {
              step: 2,
              title: "Warm Pathfinding",
              description: "Find warm introduction routes via LinkedIn & CRM",
              icon: Users,
              color: "text-green-600",
              bgColor: "bg-green-50"
            },
            {
              step: 3,
              title: "Personalized Drafting",
              description: "Generate customized introduction emails",
              icon: Zap,
              color: "text-purple-600",
              bgColor: "bg-purple-50"
            },
            {
              step: 4,
              title: "Automated Outreach",
              description: "Send intros and manage follow-up sequences",
              icon: CheckCircle,
              color: "text-orange-600",
              bgColor: "bg-orange-50"
            },
            {
              step: 5,
              title: "Meeting Coordination",
              description: "Schedule meetings and prepare materials",
              icon: Clock,
              color: "text-indigo-600",
              bgColor: "bg-indigo-50"
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className={`flex items-center space-x-4 p-4 ${item.bgColor} rounded-lg border border-gray-200`}>
                <div className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${item.color}`}>{item.step}</span>
                </div>
                <Icon className={`h-6 w-6 ${item.color}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-black">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Human-in-the-Loop Control</h4>
          <p className="text-sm text-yellow-800">
            You maintain complete control with approval workflows for all outreach content, 
            while AI agents handle the time-consuming research and coordination tasks.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "What You'll Experience",
    subtitle: "Interactive demo showcasing real AI agent workflows",
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-black mb-2">15-Minute Complete Workflow</h3>
          <p className="text-gray-600">
            Watch as AI agents build a complete investor coalition from scratch
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-black">You'll See:</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Real-time agent decision making</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Transparent AI reasoning</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Multi-step workflow automation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Human approval workflows</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Live performance metrics</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-black">Expected Outcomes:</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm">3 high-quality investor matches</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm">2 warm introduction paths</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="text-sm">67% response rate achieved</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm">2 meetings booked</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
                <span className="text-sm">3+ weeks time savings</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-blue-900 mb-2">Ready to see the future of fundraising?</h4>
          <p className="text-sm text-blue-800">
            This demo shows exactly how Coalition Builder would work for your deals, 
            with complete transparency into AI agent workflows and decision-making.
          </p>
        </div>
      </div>
    )
  }
];

export function OnboardingFlow({ isOpen, onClose, onStartDemo }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onStartDemo();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
              <p className="text-gray-600 mt-1">{currentStepData.subtitle}</p>
            </div>
            <Badge variant="outline" className="text-sm">
              {currentStep + 1} / {onboardingSteps.length}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Onboarding Progress</span>
              <span>{Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <div className="min-h-96">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrev}>
                  Previous
                </Button>
              )}
              
              <Button onClick={onClose} variant="outline">
                Skip Onboarding
              </Button>
              
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                {currentStep === onboardingSteps.length - 1 ? (
                  <>
                    Start Demo
                    <Sparkles className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}