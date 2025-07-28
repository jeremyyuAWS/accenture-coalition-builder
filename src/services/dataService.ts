import { Company } from '@/types';
import { Investor } from '@/types';
import { Meeting } from '@/types';
import { Email } from '@/types';
import { Notification } from '@/types';
import { Activity } from '@/types';

import companiesData from '@/data/companies.json';
import expandedInvestorsData from '@/data/expanded-investors.json';
import meetingsData from '@/data/meetings.json';
import emailsData from '@/data/emails.json';
import notificationsData from '@/data/notifications.json';
import activitiesData from '@/data/activities.json';

export class DataService {
  // Companies
  static getCompanies(): Company[] {
    return companiesData as Company[];
  }

  static getCompanyById(id: string): Company | undefined {
    return companiesData.find(company => company.id === id) as Company | undefined;
  }

  static getCurrentCompany(): Company {
    // Default to first company for demo
    return companiesData[0] as Company;
  }

  // Investors
  static getInvestors(companyId?: string): Investor[] {
    // In a real app, this would filter by company
    return expandedInvestorsData as Investor[];
  }

  static getInvestorById(id: string): Investor | undefined {
    return expandedInvestorsData.find(investor => investor.id === id) as Investor | undefined;
  }

  static getInvestorsByStatus(status: string): Investor[] {
    return expandedInvestorsData.filter(investor => investor.status === status) as Investor[];
  }

  static getTopInvestors(limit: number = 3): Investor[] {
    return expandedInvestorsData
      .filter(investor => investor.status === 'recommended')
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, limit) as Investor[];
  }

  // Meetings
  static getMeetings(companyId?: string): Meeting[] {
    if (companyId) {
      return meetingsData.filter(meeting => meeting.companyId === companyId) as Meeting[];
    }
    return meetingsData as Meeting[];
  }

  static getMeetingById(id: string): Meeting | undefined {
    return meetingsData.find(meeting => meeting.id === id) as Meeting | undefined;
  }

  static getUpcomingMeetings(companyId?: string): Meeting[] {
    const now = new Date();
    return this.getMeetings(companyId)
      .filter(meeting => {
        const meetingDate = new Date(meeting.dateTime);
        return meetingDate > now && meeting.status === 'scheduled';
      })
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }

  // Emails
  static getEmails(investorId?: string, companyId?: string): Email[] {
    let emails = emailsData as Email[];
    
    if (investorId) {
      emails = emails.filter(email => email.investorId === investorId);
    }
    
    if (companyId) {
      emails = emails.filter(email => email.companyId === companyId);
    }
    
    return emails.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  static getEmailThread(threadId: string): Email[] {
    return emailsData
      .filter(email => email.threadId === threadId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) as Email[];
  }

  static getPendingApprovals(companyId?: string): Email[] {
    return this.getEmails(undefined, companyId)
      .filter(email => email.status === 'pending_approval');
  }

  // Notifications
  static getNotifications(companyId?: string): Notification[] {
    return notificationsData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) as Notification[];
  }

  static getUnreadNotifications(companyId?: string): Notification[] {
    return this.getNotifications(companyId).filter(notification => !notification.read);
  }

  static markNotificationAsRead(id: string): void {
    // In a real app, this would update the backend
    const notification = notificationsData.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  // Activities
  static getActivities(companyId?: string): Activity[] {
    return activitiesData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) as Activity[];
  }

  static getRecentActivities(limit: number = 10, companyId?: string): Activity[] {
    return this.getActivities(companyId).slice(0, limit);
  }

  // Analytics helpers
  static getConversionRate(companyId?: string): number {
    const investors = this.getInvestors(companyId);
    const totalOutreach = investors.filter(inv => 
      ['outreach_in_progress', 'meeting_confirmed', 'declined'].includes(inv.status)
    ).length;
    const meetings = investors.filter(inv => inv.status === 'meeting_confirmed').length;
    
    return totalOutreach > 0 ? Math.round((meetings / totalOutreach) * 100) : 0;
  }

  static getActivityMetrics(companyId?: string) {
    const activities = this.getActivities(companyId);
    const today = new Date().toISOString().split('T')[0];
    
    const todayActivities = activities.filter(activity => 
      activity.timestamp.startsWith(today)
    );
    
    return {
      todayTotal: todayActivities.length,
      todayAgent: todayActivities.filter(a => a.type === 'agent_action').length,
      todayHuman: todayActivities.filter(a => a.type === 'human_action').length,
      totalActivities: activities.length
    };
  }

  // Search and filtering
  static searchInvestors(query: string, companyId?: string): Investor[] {
    const investors = this.getInvestors(companyId);
    const lowercaseQuery = query.toLowerCase();
    
    return investors.filter(investor => 
      investor.name.toLowerCase().includes(lowercaseQuery) ||
      investor.company.toLowerCase().includes(lowercaseQuery) ||
      investor.investmentFocus.some(focus => focus.toLowerCase().includes(lowercaseQuery))
    );
  }

  static filterInvestorsByFocus(focus: string, companyId?: string): Investor[] {
    return this.getInvestors(companyId)
      .filter(investor => investor.investmentFocus.includes(focus));
  }

  static filterInvestorsByStage(stage: string, companyId?: string): Investor[] {
    return this.getInvestors(companyId)
      .filter(investor => investor.investmentCriteria.stage.includes(stage));
  }

  // Utility functions
  static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  static getInvestorName(investorId: string): string {
    const investor = this.getInvestorById(investorId);
    return investor ? investor.name : 'Unknown Investor';
  }

  static getStatusColor(status: string): string {
    const colors = {
      recommended: 'blue',
      outreach_in_progress: 'yellow', 
      meeting_confirmed: 'green',
      declined: 'red'
    };
    return colors[status as keyof typeof colors] || 'gray';
  }
}