import React from 'react';
import { BarChart3, Users, Activity, Plus, Settings, Home, Mail, Calendar, Brain, GitBranch, FileText, DollarSign, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, className: 'tour-dashboard tour-dashboard-button' },
  { id: 'evaluation', name: 'Evaluation', icon: Users, className: 'tour-evaluation tour-evaluation-button' },
  { id: 'workflow', name: 'Coalition Builder', icon: Activity, className: 'tour-coalition tour-coalition-button' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, className: 'tour-analytics' },
  { id: 'emails', name: 'Email Management', icon: Mail },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'decisions', name: 'Agent Decisions', icon: Brain },
  { id: 'workflows', name: 'Workflows', icon: GitBranch },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'roi', name: 'ROI Calculator', icon: DollarSign },
  { id: 'demo', name: 'Interactive Demo', icon: Play },
  { id: 'prospects', name: 'Add Prospect', icon: Plus },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col tour-sidebar">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <img 
            src="/Accenture-logo.svg" 
            alt="Accenture" 
            className="h-8 w-auto"
          />
        </div>
        <h1 className="text-xl font-bold text-black">Capital Connect</h1>
        <p className="text-sm text-gray-600 mt-1">AI-Powered Investment Syndication</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  aria-label={`Navigate to ${item.name}`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.className,
                    activeTab === item.id
                      ? "bg-gray-100 text-black"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button
          onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-demo'))}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          size="sm"
        >
          🎬 Interactive Demo
        </Button>
        <Button
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-tour'))}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
          size="sm"
        >
          🎯 Take Tour
        </Button>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-black">John Doe</p>
            <p className="text-xs text-gray-500">Founder & CEO</p>
          </div>
        </div>
      </div>
    </div>
  );
}