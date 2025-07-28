import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Users, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import decisionTreesData from '@/data/agent-decision-trees.json';
import { DataService } from '@/services/dataService';

export function AgentDecisionTree() {
  const safeDecisionTrees = Array.isArray(decisionTreesData) ? decisionTreesData : [];
  const [selectedDecision, setSelectedDecision] = useState(safeDecisionTrees.length > 0 ? safeDecisionTrees[0] : null);

  const getFactorIcon = (factor: string) => {
    switch (factor) {
      case 'connection_strength':
        return <Users className="h-4 w-4" />;
      case 'portfolio_fit':
        return <TrendingUp className="h-4 w-4" />;
      case 'timing_analysis':
        return <Clock className="h-4 w-4" />;
      case 'response_probability':
        return <Brain className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'warm_introduction':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'send_follow_up':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'escalate_to_human':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">Agent Decision Intelligence</h3>
          <p className="text-gray-600 mt-1">Transparent AI reasoning for every action</p>
        </div>
        <div className="flex space-x-2">
          {safeDecisionTrees.map((decision) => (
            <Button
              key={decision.id}
              variant={selectedDecision?.id === decision.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDecision(decision)}
              className="text-xs"
            >
              {DataService.getInvestorName(decision.investorId)}
            </Button>
          ))}
        </div>
      </div>

      {selectedDecision ? (
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getDecisionIcon(selectedDecision.decision)}
              <div>
                <CardTitle className="text-lg">
                  Decision: {selectedDecision.decision.replace('_', ' ').toUpperCase()}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  For {DataService.getInvestorName(selectedDecision.investorId)} • {' '}
                  {DataService.formatTimestamp(selectedDecision.timestamp)}
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(selectedDecision.confidence)}`}>
              {selectedDecision.confidence}% Confidence
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Decision Factors */}
          <div>
            <h4 className="font-semibold text-black mb-4 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Decision Factors Analysis
            </h4>
            <div className="space-y-4">
              {selectedDecision?.reasoning?.factors?.map((factor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getFactorIcon(factor.factor)}
                      <span className="font-medium text-black capitalize">
                        {factor.factor.replace('_', ' ')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Weight: {Math.round(factor.weight * 100)}%
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-black">
                      {factor.score}/100
                    </div>
                  </div>
                  <Progress value={factor.score} className="mb-2" />
                  <p className="text-sm text-gray-600">{factor.explanation}</p>
                </div>
              )) || []}
            </div>
          </div>

          {/* Alternatives Considered */}
          <div>
            <h4 className="font-semibold text-black mb-4 flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Alternatives Considered
            </h4>
            <div className="space-y-3">
              {selectedDecision?.reasoning?.alternatives_considered?.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-black capitalize">
                      {alt.option.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{alt.reason_rejected}</p>
                  </div>
                  <Badge variant="outline" className="text-red-600">
                    {alt.score}/100
                  </Badge>
                </div>
              )) || []}
            </div>
          </div>

          {/* Risk Assessment */}
          {selectedDecision?.reasoning?.risk_factors && (
            <div>
              <h4 className="font-semibold text-black mb-4 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Assessment & Mitigation
              </h4>
              <div className="space-y-3">
                {selectedDecision.reasoning.risk_factors?.map((risk, index) => (
                  <div key={index} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black capitalize">
                        {risk.risk.replace('_', ' ')}
                      </span>
                      <Badge variant="outline" className="text-yellow-600">
                        {Math.round(risk.probability * 100)}% Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                  </div>
                )) || []}
              </div>
            </div>
          )}

          {/* Escalation Logic */}
          {selectedDecision?.reasoning?.escalation_trigger && (
            <div>
              <h4 className="font-semibold text-black mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Human-AI Collaboration
              </h4>
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-900">Escalation Triggered</span>
                  <Badge variant="outline" className="text-blue-600">
                    {selectedDecision.reasoning.escalation_trigger.condition}
                  </Badge>
                </div>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Action:</strong> {selectedDecision.reasoning.escalation_trigger.action}
                </p>
                {selectedDecision.reasoning.escalation_trigger.human_decision && (
                  <p className="text-sm text-blue-800">
                    <strong>Human Decision:</strong> {selectedDecision.reasoning.escalation_trigger.human_decision}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Outcome */}
          {selectedDecision.outcome && (
            <div>
              <h4 className="font-semibold text-black mb-4 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Outcome & Validation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {selectedDecision.outcome.executed ? 'Executed' : 'Not Executed'}
                  </div>
                  <div className="text-xs text-green-700">Status</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {selectedDecision.outcome.result || 'Pending'}
                  </div>
                  <div className="text-xs text-blue-700">Result</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {selectedDecision.outcome.response_time || 'N/A'}
                  </div>
                  <div className="text-xs text-purple-700">Response Time</div>
                </div>
              </div>
              {selectedDecision.outcome.validated_prediction !== undefined && (
                <div className="mt-3 text-center">
                  <Badge 
                    variant={selectedDecision.outcome.validated_prediction ? "default" : "destructive"}
                    className="text-sm"
                  >
                    Prediction {selectedDecision.outcome.validated_prediction ? 'Validated' : 'Failed'} ✓
                  </Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No decision trees available to display.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}