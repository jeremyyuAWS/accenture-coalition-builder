import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, ArrowRight, Lightbulb } from 'lucide-react';
import investorsData from '@/data/investors.json';

interface EvaluationPanelProps {
  onBuildCoalition: () => void;
}

export function EvaluationPanel({ onBuildCoalition }: EvaluationPanelProps) {
  const topInvestors = investorsData
    .filter(investor => investor.status === 'recommended')
    .slice(0, 3)
    .sort((a, b) => b.fitScore - a.fitScore);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">Investment Recommendations</h2>
          <p className="text-gray-600 mt-1">AI-curated co-investors based on your startup profile</p>
        </div>
        <Button 
          onClick={onBuildCoalition}
          className="bg-black text-white hover:bg-gray-800"
          size="lg"
        >
          <Users className="h-4 w-4 mr-2" />
          Build Coalition
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid gap-6">
        {topInvestors.map((investor, index) => (
          <Card key={investor.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={investor.avatar}
                    alt={investor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">{investor.name}</CardTitle>
                    <p className="text-gray-600">{investor.title} at {investor.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    #{index + 1} Match
                  </Badge>
                  <div className="text-2xl font-bold text-black">{investor.fitScore}%</div>
                  <p className="text-sm text-gray-500">Fit Score</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Why this investor fits</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{investor.explainability}</p>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Match Confidence</span>
                    <span className="font-medium">{investor.fitScore}%</span>
                  </div>
                  <Progress value={investor.fitScore} className="h-2" />
                </div>
                
                {investor.warmIntro && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-800 font-medium">Warm Introduction Available</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">{investor.warmIntro}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-black mb-2">Next Steps</h3>
        <p className="text-gray-600 text-sm mb-4">
          Our AI agents will automatically handle warm introductions, personalized outreach, and follow-ups for your selected co-investors.
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Find optimal introduction paths via LinkedIn connections
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Draft personalized introduction emails for your approval
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Handle automated follow-ups and meeting scheduling
          </li>
        </ul>
      </div>
    </div>
  );
}