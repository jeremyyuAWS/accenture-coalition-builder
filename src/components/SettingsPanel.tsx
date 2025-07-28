import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User, 
  Bell, 
  Bot, 
  Mail, 
  Shield, 
  Palette, 
  Save,
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UserPreferences {
  profile: {
    name: string;
    email: string;
    company: string;
    role: string;
  };
  notifications: {
    emailNotifications: boolean;
    agentUpdates: boolean;
    meetingReminders: boolean;
    weeklyReports: boolean;
    soundEnabled: boolean;
  };
  aiSettings: {
    agentAutonomy: 'low' | 'medium' | 'high';
    approvalRequired: boolean;
    confidenceThreshold: number;
    learningEnabled: boolean;
  };
  interface: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
    animationsEnabled: boolean;
    tourCompleted: boolean;
  };
  integrations: {
    linkedinConnected: boolean;
    gmailConnected: boolean;
    calendarConnected: boolean;
    crmConnected: boolean;
  };
}

export function SettingsPanel() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    profile: {
      name: 'John Doe',
      email: 'john@dataflow.com',
      company: 'DataFlow Solutions',
      role: 'CEO & Co-founder'
    },
    notifications: {
      emailNotifications: true,
      agentUpdates: true,
      meetingReminders: true,
      weeklyReports: false,
      soundEnabled: true
    },
    aiSettings: {
      agentAutonomy: 'medium',
      approvalRequired: true,
      confidenceThreshold: 80,
      learningEnabled: true
    },
    interface: {
      theme: 'light',
      compactMode: false,
      animationsEnabled: true,
      tourCompleted: true
    },
    integrations: {
      linkedinConnected: true,
      gmailConnected: true,
      calendarConnected: true,
      crmConnected: false
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updatePreference = (section: keyof UserPreferences, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success('Settings saved successfully!');
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    // Reset to default values
    toast.success('Settings reset to defaults');
    setHasUnsavedChanges(false);
  };

  const getConnectionStatus = (connected: boolean) => (
    <Badge variant={connected ? "default" : "outline"} className={
      connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
    }>
      {connected ? "Connected" : "Not Connected"}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">Settings</h2>
          <p className="text-gray-600 mt-1">Configure your Coalition Builder preferences</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              <AlertCircle className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Bot className="h-4 w-4 mr-2" />
            AI Settings
          </TabsTrigger>
          <TabsTrigger value="interface">
            <Palette className="h-4 w-4 mr-2" />
            Interface
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Shield className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={preferences.profile.name}
                    onChange={(e) => updatePreference('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={preferences.profile.email}
                    onChange={(e) => updatePreference('profile', 'email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={preferences.profile.company}
                    onChange={(e) => updatePreference('profile', 'company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={preferences.profile.role}
                    onChange={(e) => updatePreference('profile', 'role', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.notifications.emailNotifications}
                    onCheckedChange={(checked) => updatePreference('notifications', 'emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="agent-updates">AI Agent Updates</Label>
                    <p className="text-sm text-gray-600">Get notified of agent actions</p>
                  </div>
                  <Switch
                    id="agent-updates"
                    checked={preferences.notifications.agentUpdates}
                    onCheckedChange={(checked) => updatePreference('notifications', 'agentUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="meeting-reminders">Meeting Reminders</Label>
                    <p className="text-sm text-gray-600">Receive meeting notifications</p>
                  </div>
                  <Switch
                    id="meeting-reminders"
                    checked={preferences.notifications.meetingReminders}
                    onCheckedChange={(checked) => updatePreference('notifications', 'meetingReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Weekly analytics summary</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={preferences.notifications.weeklyReports}
                    onCheckedChange={(checked) => updatePreference('notifications', 'weeklyReports', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-enabled">Sound Notifications</Label>
                    <p className="text-sm text-gray-600">Play sounds for notifications</p>
                  </div>
                  <Switch
                    id="sound-enabled"
                    checked={preferences.notifications.soundEnabled}
                    onCheckedChange={(checked) => updatePreference('notifications', 'soundEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="autonomy">Agent Autonomy Level</Label>
                  <Select 
                    value={preferences.aiSettings.agentAutonomy} 
                    onValueChange={(value: 'low' | 'medium' | 'high') => updatePreference('aiSettings', 'agentAutonomy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Require approval for all actions</SelectItem>
                      <SelectItem value="medium">Medium - Approve important actions only</SelectItem>
                      <SelectItem value="high">High - Full autonomy with notifications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="approval-required">Require Approval for Outreach</Label>
                    <p className="text-sm text-gray-600">Human approval before sending emails</p>
                  </div>
                  <Switch
                    id="approval-required"
                    checked={preferences.aiSettings.approvalRequired}
                    onCheckedChange={(checked) => updatePreference('aiSettings', 'approvalRequired', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confidence-threshold">Confidence Threshold: {preferences.aiSettings.confidenceThreshold}%</Label>
                  <input
                    id="confidence-threshold"
                    type="range"
                    min="50"
                    max="95"
                    value={preferences.aiSettings.confidenceThreshold}
                    onChange={(e) => updatePreference('aiSettings', 'confidenceThreshold', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">Minimum confidence for autonomous actions</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="learning-enabled">Enable AI Learning</Label>
                    <p className="text-sm text-gray-600">Allow AI to learn from your preferences</p>
                  </div>
                  <Switch
                    id="learning-enabled"
                    checked={preferences.aiSettings.learningEnabled}
                    onCheckedChange={(checked) => updatePreference('aiSettings', 'learningEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interface" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interface Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={preferences.interface.theme} 
                    onValueChange={(value: 'light' | 'dark' | 'auto') => updatePreference('interface', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-gray-600">Reduce spacing and padding</p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={preferences.interface.compactMode}
                    onCheckedChange={(checked) => updatePreference('interface', 'compactMode', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations-enabled">Enable Animations</Label>
                    <p className="text-sm text-gray-600">Show smooth transitions and effects</p>
                  </div>
                  <Switch
                    id="animations-enabled"
                    checked={preferences.interface.animationsEnabled}
                    onCheckedChange={(checked) => updatePreference('interface', 'animationsEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tour-completed">Tour Completed</Label>
                    <p className="text-sm text-gray-600">Mark product tour as completed</p>
                  </div>
                  <Switch
                    id="tour-completed"
                    checked={preferences.interface.tourCompleted}
                    onCheckedChange={(checked) => updatePreference('interface', 'tourCompleted', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">LinkedIn</h4>
                      <p className="text-sm text-gray-600">Find warm introduction paths</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getConnectionStatus(preferences.integrations.linkedinConnected)}
                    <Button variant="outline" size="sm">
                      {preferences.integrations.linkedinConnected ? 'Reconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Gmail</h4>
                      <p className="text-sm text-gray-600">Send emails and track responses</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getConnectionStatus(preferences.integrations.gmailConnected)}
                    <Button variant="outline" size="sm">
                      {preferences.integrations.gmailConnected ? 'Reconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Google Calendar</h4>
                      <p className="text-sm text-gray-600">Schedule and manage meetings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getConnectionStatus(preferences.integrations.calendarConnected)}
                    <Button variant="outline" size="sm">
                      {preferences.integrations.calendarConnected ? 'Reconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">CRM Integration</h4>
                      <p className="text-sm text-gray-600">Sync with Salesforce, HubSpot, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getConnectionStatus(preferences.integrations.crmConnected)}
                    <Button variant="outline" size="sm">
                      {preferences.integrations.crmConnected ? 'Reconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}