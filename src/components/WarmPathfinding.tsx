import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Network, Users, TrendingUp, CheckCircle, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';
import warmPathfindingData from '@/data/warm-pathfinding.json';
import { DataService } from '@/services/dataService';
import toast from 'react-hot-toast';
import { NetworkGraph } from './NetworkGraph';
import networkConnections from '@/data/network-connections.json';

export function WarmPathfinding() {
  const [selectedInvestor, setSelectedInvestor] = useState(warmPathfindingData[0]);
  const [selectedPath, setSelectedPath] = useState(selectedInvestor.recommendedPath);

  const getPathTypeIcon = (type: string) => {
    switch (type) {
      case 'direct_connection':
        return <Users className="h-4 w-4 text-green-600" />;
      case '2nd_degree':
        return <Network className="h-4 w-4 text-blue-600" />;
      case 'cold_outreach':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPathTypeColor = (type: string) => {
    switch (type) {
      case 'direct_connection':
        return 'bg-green-100 text-green-800 border-green-200';
      case '2nd_degree':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cold_outreach':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood.toLowerCase()) {
      case 'very high':
        return 'text-green-600';
      case 'high':
        return 'text-green-500';
      case 'moderate-high':
        return 'text-blue-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'low-moderate':
        return 'text-orange-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId);
    const path = selectedInvestor.paths.find(p => p.pathId === pathId);
    if (path) {
      toast.success(`Selected ${path.type.replace('_', ' ')} path for ${selectedInvestor.investorName}`, {
        duration: 3000
      });
    }
  };

  const handleProceedWithPath = () => {
    const path = selectedInvestor.paths.find(p => p.pathId === selectedPath);
    if (path) {
      toast.success(`🤖 Agent proceeding with ${path.type.replace('_', ' ')} to ${selectedInvestor.investorName}`, {
        duration: 4000,
        style: { background: '#1e40af', color: '#fff' }
      });
    }
  };

  const selectedPathData = selectedInvestor.paths.find(p => p.pathId === selectedPath);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black">Warm Pathfinding Intelligence</h3>
        <p className="text-gray-600 mt-1">AI-discovered introduction paths with relationship mapping</p>
      </div>

      {/* Network Visualization */}
      <NetworkGraph
        data={networkConnections[0]}
        title="Connection Pathways Visualization"
        height={350}
        layout="static"
        onNodeClick={(node) => {
          if (node.type === 'investor') {
            const investor = warmPathfindingData.find(inv => inv.investorName === node.name);
            if (investor) {
              setSelectedInvestor(investor);
              toast.success(`Viewing pathways for ${node.name}`, { duration: 2000 });
            }
          }
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Investor Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Target Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warmPathfindingData.map((investor) => (
                  <div
                    key={investor.id}
                    onClick={() => setSelectedInvestor(investor)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedInvestor.id === investor.id
                        ? 'bg-blue-100 border border-blue-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-black">{investor.investorName}</span>
                      <Badge variant="outline" className="text-xs">
                        {investor.agentConfidence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{investor.timeEstimate}</p>
                    <div className="flex items-center space-x-2">
                      {getPathTypeIcon(investor.recommendedPath.split('_')[1] === 'degree' ? '2nd_degree' : investor.paths[0]?.type)}
                      <span className="text-xs text-gray-500">
                        {investor.paths.length} path{investor.paths.length > 1 ? 's' : ''} found
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Path Options */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Introduction Paths for {selectedInvestor.investorName}
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {selectedInvestor.agentConfidence}% AI Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedInvestor.paths.map((path) => (
                <div
                  key={path.pathId}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPath === path.pathId
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectPath(path.pathId)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getPathTypeIcon(path.type)}
                      <div>
                        <h4 className="font-semibold text-black capitalize">
                          {path.type.replace('_', ' ')}
                        </h4>
                        <Badge className={`text-xs ${getPathTypeColor(path.type)}`}>
                          {path.likelihood} Success Rate
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-black">{path.strength}%</div>
                      <div className="text-xs text-gray-500">Strength</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Progress value={path.strength} className="h-2" />
                  </div>

                  {/* Connector Info */}
                  {path.connector && (
                    <div className="bg-white rounded border p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-black">{path.connector.name}</span>
                        <span className="text-xs text-gray-500">
                          Last contact: {DataService.formatTimestamp(path.connector.lastInteraction)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{path.connector.relationship}</p>
                      <div className="text-xs text-gray-500">{path.connector.email}</div>
                    </div>
                  )}

                  {/* AI Reasoning */}
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">AI Analysis</span>
                    </div>
                    <p className="text-sm text-gray-600">{path.reasoning}</p>
                  </div>

                  {/* Suggested Approach */}
                  <div className="border-t border-gray-100 pt-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Suggested Approach:</h5>
                    <p className="text-sm text-gray-600">{path.suggestedApproach}</p>
                  </div>

                  {/* Recommended Badge */}
                  {path.pathId === selectedInvestor.recommendedPath && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Panel */}
          {selectedPathData && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Selected Path Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{selectedPathData.strength}%</div>
                    <div className="text-xs text-blue-700">Path Strength</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600 capitalize">
                      {selectedPathData.likelihood}
                    </div>
                    <div className="text-xs text-green-700">Success Likelihood</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {selectedInvestor.timeEstimate.split(' ')[0]}-{selectedInvestor.timeEstimate.split(' ')[1]}
                    </div>
                    <div className="text-xs text-purple-700">Expected Response</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleProceedWithPath}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Proceed with Selected Path
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}