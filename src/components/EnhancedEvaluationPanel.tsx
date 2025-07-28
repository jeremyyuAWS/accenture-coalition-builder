import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SearchInput } from '@/components/ui/search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, ArrowRight, Lightbulb, Filter, Star, TrendingUp, Building, Mail } from 'lucide-react';
import { InvestorProfileModal } from './InvestorProfileModal';
import { SkeletonLoader, LoadingState } from './LoadingStates';
import { Tooltip } from './HelpSystem';
import { DataService } from '@/services/dataService';
import { Investor } from '@/types';

interface EnhancedEvaluationPanelProps {
  onBuildCoalition: () => void;
}

export function EnhancedEvaluationPanel({ onBuildCoalition }: EnhancedEvaluationPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusFilter, setFocusFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('fitScore');
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const allInvestors = DataService.getInvestors();
  const currentCompany = DataService.getCurrentCompany();

  // Get unique investment focuses and stages for filters
  const allFocuses = Array.from(new Set(allInvestors.flatMap(inv => inv.investmentFocus)));
  const allStages = Array.from(new Set(allInvestors.flatMap(inv => inv.investmentCriteria.stage)));

  // Filter and sort investors
  const filteredInvestors = allInvestors
    .filter(investor => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          investor.name.toLowerCase().includes(query) ||
          investor.company.toLowerCase().includes(query) ||
          investor.investmentFocus.some(focus => focus.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Focus filter
      if (focusFilter !== 'all' && !investor.investmentFocus.includes(focusFilter)) {
        return false;
      }

      // Stage filter
      if (stageFilter !== 'all' && !investor.investmentCriteria.stage.includes(stageFilter)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'fitScore':
          return b.fitScore - a.fitScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return b.fitScore - a.fitScore;
      }
    });

  const topInvestors = filteredInvestors.slice(0, 6);

  const handleViewProfile = (investor: Investor) => {
    setSelectedInvestor(investor);
    setShowProfile(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between pt-12">
          <div>
            <h2 className="text-3xl font-bold text-black">Investment Recommendations</h2>
            <p className="text-gray-600 mt-1">AI is analyzing optimal co-investors...</p>
          </div>
        </div>
        <LoadingState type="analyzing" message="Analyzing 500+ investor profiles for optimal matches..." />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonLoader key={i} type="investor" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between pt-12">
        <div>
          <h2 className="text-3xl font-bold text-black">Investor Intelligence</h2>
          <p className="text-gray-600 mt-1">
            AI-powered investor matching for <span className="font-medium">{currentCompany.name}</span>
          </p>
        </div>
        <Tooltip content="Start the AI-powered coalition building workflow">
          <Button
            onClick={onBuildCoalition}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 tour-build-coalition mt-2"
            size="lg"
            aria-label="Build coalition with selected investors"
          >
            <Users className="h-4 w-4 mr-2" />
            🚀 Build Coalition
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Tooltip>
      </div>

      {/* Company Context Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Stage</p>
                <p className="text-blue-900 font-semibold">{currentCompany.stage}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Revenue</p>
                <p className="text-blue-900 font-semibold">{currentCompany.revenue}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Target Raise</p>
                <p className="text-blue-900 font-semibold">{currentCompany.targetRaise}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Growth</p>
                <p className="text-blue-900 font-semibold">{currentCompany.growth}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1">
          <SearchInput
            placeholder="Search investors by name, firm, or focus area..."
            value={searchQuery}
            onSearch={setSearchQuery}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={focusFilter} onValueChange={setFocusFilter}>
            <SelectTrigger className="w-40 lg:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by focus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Focus Areas</SelectItem>
              {allFocuses.map(focus => (
                <SelectItem key={focus} value={focus}>{focus}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-32 lg:w-40">
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {allStages.map(stage => (
                <SelectItem key={stage} value={stage}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 lg:w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fitScore">Fit Score</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="company">Firm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {topInvestors.length} of {filteredInvestors.length} investors
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Avg Fit Score: {Math.round(topInvestors.reduce((acc, inv) => acc + inv.fitScore, 0) / topInvestors.length)}%</span>
          <span>•</span>
          <span>Warm Intros Available: {topInvestors.filter(inv => inv.warmIntro).length}</span>
        </div>
      </div>

      {/* Investor Cards */}
      <div className="grid gap-6">
        {topInvestors.map((investor, index) => (
          <Card key={investor.id} className="relative hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={investor.avatar}
                    alt={investor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-xl">{investor.name}</CardTitle>
                      {index < 3 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Top {index + 1}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg">{investor.title} at {investor.company}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {investor.investmentFocus.slice(0, 3).map(focus => (
                        <Badge key={focus} variant="outline" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                      {investor.investmentFocus.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{investor.investmentFocus.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-black">{investor.fitScore}%</div>
                  <p className="text-sm text-gray-500">Fit Score</p>
                  <p className="text-xs text-gray-400 mt-1">{investor.checkSize}</p>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Match Confidence</span>
                      <span className="font-medium">{investor.fitScore}%</span>
                    </div>
                    <Progress value={investor.fitScore} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Recent Investments</p>
                    <div className="flex flex-wrap gap-1">
                      {investor.recentInvestments.slice(0, 2).map((investment, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {investment.company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  {investor.warmIntro ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 flex-1 mr-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-800 font-medium">Warm Introduction Available</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">{investor.warmIntro}</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex-1 mr-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-800 font-medium">Cold Outreach Ready</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">Personalized email will be drafted</p>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewProfile(investor)}
                    aria-label={`View profile for ${investor.name}`}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvestors.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No investors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Next Steps Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-black mb-2">Coalition Building Process</h3>
        <p className="text-gray-600 text-sm mb-4">
          Our AI agents will automatically handle the complete outreach workflow for your selected co-investors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-medium text-black text-sm">Discovery & Research</h4>
              <p className="text-xs text-gray-600 mt-1">Find optimal introduction paths and gather intelligence</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-green-600">2</span>
            </div>
            <div>
              <h4 className="font-medium text-black text-sm">Personalized Outreach</h4>
              <p className="text-xs text-gray-600 mt-1">Draft and send tailored introduction emails</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-purple-600">3</span>
            </div>
            <div>
              <h4 className="font-medium text-black text-sm">Follow-up & Scheduling</h4>
              <p className="text-xs text-gray-600 mt-1">Handle responses and coordinate meetings</p>
            </div>
          </div>
        </div>
      </div>

      <InvestorProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        investor={selectedInvestor}
      />
    </div>
  );
}