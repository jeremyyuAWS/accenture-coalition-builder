import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Building, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Target, 
  Users, 
  Mail, 
  Phone,
  MapPin,
  ExternalLink,
  Star,
  Briefcase,
  Award,
  Clock,
  X
} from 'lucide-react';
import { Investor } from '@/types';

interface InvestorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  investor: Investor | null;
}

export function InvestorProfileModal({ isOpen, onClose, investor }: InvestorProfileModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!investor) return null;

  const generateSyntheticMetrics = (investor: Investor) => {
    return {
      totalInvestments: Math.floor(Math.random() * 50) + 20,
      activePortfolio: Math.floor(Math.random() * 15) + 8,
      avgCheckSize: investor.checkSize,
      successfulExits: Math.floor(Math.random() * 8) + 2,
      avgTimeToExit: `${Math.floor(Math.random() * 3) + 4} years`,
      responseRate: Math.floor(Math.random() * 30) + 60,
      meetingRate: Math.floor(Math.random() * 20) + 40,
      investmentPace: `${Math.floor(Math.random() * 8) + 3}/year`
    };
  };

  const generateExperience = (investor: Investor) => {
    const experiences = [
      {
        title: investor.title,
        company: investor.company,
        duration: "2019 - Present",
        description: "Leading enterprise software investments with focus on Series A and Series B rounds. Built portfolio of 15+ companies with combined valuation of $2.8B."
      },
      {
        title: "Principal",
        company: Math.random() > 0.5 ? "Battery Ventures" : "General Catalyst",
        duration: "2016 - 2019",
        description: "Focused on B2B SaaS and enterprise technology investments. Led 12 investments including 3 successful exits."
      },
      {
        title: "Senior Associate",
        company: Math.random() > 0.5 ? "Bessemer Venture Partners" : "Lightspeed Venture Partners",
        duration: "2014 - 2016",
        description: "Sourced and executed early-stage investments in enterprise software and developer tools."
      }
    ];
    return experiences;
  };

  const generateEducation = () => {
    const schools = ["Stanford", "Harvard", "MIT", "Wharton", "Berkeley"];
    const degrees = ["MBA", "MS Computer Science", "BS Engineering", "BA Economics"];
    
    return [
      {
        degree: degrees[Math.floor(Math.random() * degrees.length)],
        school: `${schools[Math.floor(Math.random() * schools.length)]} University`,
        year: `${2000 + Math.floor(Math.random() * 15)}`
      }
    ];
  };

  const metrics = generateSyntheticMetrics(investor);
  const experience = generateExperience(investor);
  const education = generateEducation();

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <DialogClose asChild>
              <button className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-0">
                <X className="h-5 w-5 text-white" />
              </button>
            </DialogClose>
            
            <div className="flex items-center space-x-6">
              <img
                src={investor.avatar}
                alt={investor.name}
                className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
              />
              <div className="flex-1">
                <DialogTitle className="text-3xl font-bold">{investor.name}</DialogTitle>
                <p className="text-xl text-blue-100 mb-2">{investor.title}</p>
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    {investor.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {investor.fitScore}% Match
                  </Badge>
                  <Badge className="bg-green-500/80 text-white">
                    {investor.checkSize}
                  </Badge>
                  {investor.warmIntro && (
                    <Badge className="bg-yellow-500/80 text-white">
                      Warm Intro Available
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">{investor.bio}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-black mb-3">Investment Focus</h4>
                        <div className="flex flex-wrap gap-2">
                          {investor.investmentFocus.map(focus => (
                            <Badge key={focus} variant="outline">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-black mb-3">Investment Criteria</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stages:</span>
                            <span>{investor.investmentCriteria.stage.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Revenue:</span>
                            <span>{investor.investmentCriteria.revenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Growth:</span>
                            <span>{investor.investmentCriteria.growth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Geography:</span>
                            <span>{investor.investmentCriteria.geography.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {investor.warmIntro && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium text-green-900">Warm Introduction Path</span>
                      </div>
                      <p className="text-green-800 text-sm">{investor.warmIntro}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {investor.portfolioCompanies.map((company, index) => (
                    <Card key={company}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-black">{company}</h4>
                          <Badge variant="outline" className="text-xs">
                            {Math.random() > 0.5 ? 'Active' : 'Exited'}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Stage:</span>
                            <span>{Math.random() > 0.5 ? 'Series A' : 'Series B'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investment:</span>
                            <span>${Math.floor(Math.random() * 10) + 3}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Year:</span>
                            <span>{2020 + Math.floor(Math.random() * 4)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="investments" className="space-y-4 mt-6">
                <div className="space-y-4">
                  {investor.recentInvestments.map((investment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-black text-lg">{investment.company}</h4>
                            <p className="text-gray-600">{investment.round} • {investment.amount}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">{formatTimestamp(investment.date)}</Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-2 bg-blue-50 rounded">
                            <div className="text-lg font-bold text-blue-600">
                              {Math.floor(Math.random() * 50) + 20}%
                            </div>
                            <div className="text-xs text-blue-700">IRR</div>
                          </div>
                          <div className="p-2 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">
                              {Math.floor(Math.random() * 5) + 2}x
                            </div>
                            <div className="text-xs text-green-700">Multiple</div>
                          </div>
                          <div className="p-2 bg-purple-50 rounded">
                            <div className="text-lg font-bold text-purple-600">
                              ${Math.floor(Math.random() * 100) + 50}M
                            </div>
                            <div className="text-xs text-purple-700">Valuation</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="background" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-black">{exp.title}</h4>
                            <Badge variant="outline" className="text-xs">{exp.duration}</Badge>
                          </div>
                          <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                          <p className="text-sm text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {education.map((edu, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-black">{edu.degree}</h4>
                            <p className="text-gray-600">{edu.school}</p>
                          </div>
                          <Badge variant="outline">{edu.year}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-6 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-black">{metrics.totalInvestments}</div>
                      <div className="text-xs text-gray-600">Total Investments</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-black">{metrics.activePortfolio}</div>
                      <div className="text-xs text-gray-600">Active Portfolio</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-black">{metrics.successfulExits}</div>
                      <div className="text-xs text-gray-600">Successful Exits</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-black">{metrics.avgTimeToExit}</div>
                      <div className="text-xs text-gray-600">Avg Time to Exit</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Response & Meeting Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cold Email Response Rate</span>
                        <span className="font-medium">{metrics.responseRate}%</span>
                      </div>
                      <Progress value={metrics.responseRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Meeting Conversion Rate</span>
                        <span className="font-medium">{metrics.meetingRate}%</span>
                      </div>
                      <Progress value={metrics.meetingRate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{metrics.investmentPace}</div>
                        <div className="text-xs text-blue-700">Investment Pace</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{metrics.avgCheckSize}</div>
                        <div className="text-xs text-green-700">Avg Check Size</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {investor.email}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Last activity: {formatTimestamp(investor.lastActivity)}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Draft Intro
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Add to Coalition
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}