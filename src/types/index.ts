export interface Company {
  id: string;
  name: string;
  industry: string;
  stage: string;
  targetRaise: string;
  valuation: string;
  description: string;
  founded: string;
  employees: number;
  revenue: string;
  growth: string;
  location: string;
  founders: Founder[];
  metrics: CompanyMetrics;
}

export interface Founder {
  name: string;
  title: string;
  background: string;
}

export interface CompanyMetrics {
  customers: number;
  retention: string;
  grossMargin: string;
  burnRate: string;
}

export interface Investor {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  fitScore: number;
  explainability: string;
  status: InvestorStatus;
  avatar: string;
  lastActivity: string;
  warmIntro?: string;
  linkedinUrl: string;
  investmentFocus: string[];
  checkSize: string;
  portfolioCompanies: string[];
  recentInvestments: Investment[];
  bio: string;
  investmentCriteria: InvestmentCriteria;
}

export interface Investment {
  company: string;
  round: string;
  amount: string;
  date: string;
}

export interface InvestmentCriteria {
  stage: string[];
  revenue: string;
  growth: string;
  market: string[];
  geography: string[];
}

export type InvestorStatus = 'recommended' | 'outreach_in_progress' | 'meeting_confirmed' | 'declined';

export interface Meeting {
  id: string;
  investorId: string;
  companyId: string;
  title: string;
  type: MeetingType;
  status: MeetingStatus;
  dateTime: string;
  duration: number;
  location: string;
  attendees: Attendee[];
  agenda?: string[];
  prepNotes?: string;
  followUpTasks?: string[];
  outcome?: string;
  nextSteps?: string[];
  notes?: string;
}

export type MeetingType = 'initial_meeting' | 'informal_meeting' | 'due_diligence' | 'final_pitch';
export type MeetingStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Attendee {
  name: string;
  role: 'investor' | 'founder' | 'technical_partner';
  email: string;
}

export interface Email {
  id: string;
  investorId: string;
  companyId: string;
  threadId: string;
  subject: string;
  type: EmailType;
  status: EmailStatus;
  timestamp: string;
  from: EmailContact;
  to: EmailContact[];
  cc?: EmailContact[];
  content: string;
  aiGenerated: boolean;
  humanApproved?: boolean;
  responseReceived?: boolean;
  responseTime?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  nextAction?: string;
}

export type EmailType = 'warm_introduction' | 'cold_outreach' | 'follow_up' | 'response' | 'meeting_request';
export type EmailStatus = 'draft' | 'pending_approval' | 'sent' | 'received' | 'bounced';

export interface EmailContact {
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  investorId?: string;
  actionRequired: boolean;
  actionText?: string;
}

export type NotificationType = 'agent_completed' | 'response_received' | 'meeting_scheduled' | 'follow_up_due' | 'approval_needed';

export interface Activity {
  id: string;
  type: 'agent_action' | 'human_action';
  owner: string;
  action: string;
  details: string;
  timestamp: string;
  investorId?: string;
  status: ActivityStatus;
}

export type ActivityStatus = 'completed' | 'in_progress' | 'pending_approval' | 'scheduled' | 'failed';

export interface Analytics {
  overview: OverviewMetrics;
  agentProductivity: AgentProductivityMetrics;
  humanApprovals: HumanApprovalMetrics;
  recentActivity: DailyActivity[];
}

export interface OverviewMetrics {
  totalOutreach: number;
  meetingsBooked: number;
  conversionRate: number;
  averageResponseTime: string;
  activeProspects: number;
}

export interface AgentProductivityMetrics {
  emailsSent: number;
  introsDrafted: number;
  meetingsScheduled: number;
  followUpsAutomated: number;
}

export interface HumanApprovalMetrics {
  emailsApproved: number;
  emailsRejected: number;
  approvalRate: number;
  averageApprovalTime: string;
}

export interface DailyActivity {
  date: string;
  agentActions: number;
  humanActions: number;
  meetingsBooked: number;
}