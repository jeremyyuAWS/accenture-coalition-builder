import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AccessibilityWrapper, SkipToContent } from './components/AccessibilityWrapper';
import { HelpModal } from './components/HelpSystem';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EnhancedEvaluationPanel } from './components/EnhancedEvaluationPanel';
import { ActivityTimeline } from './components/ActivityTimeline';
import { KanbanBoard } from './components/KanbanBoard';
import { CoalitionBuilder } from './components/CoalitionBuilder';
import { EnhancedAnalyticsDashboard } from './components/EnhancedAnalyticsDashboard';
import { SettingsPanel } from './components/SettingsPanel';
import { AddProspectModal } from './components/AddProspectModal';
import { ProductTour } from './components/ProductTour';
import { NotificationCenter } from './components/NotificationCenter';
import { EnhancedEmailManagement } from './components/EnhancedEmailManagement';
import { CalendarView } from './components/CalendarView';
import { AgentDecisionTree } from './components/AgentDecisionTree';
import { WorkflowVisualization } from './components/WorkflowVisualization';
import { DocumentLibrary } from './components/DocumentLibrary';
import { Button } from './components/ui/button';
import { Bell } from 'lucide-react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SuccessCelebration } from './components/SuccessCelebration';
import { ROICalculator } from './components/ROICalculator';
import { InteractiveDemoMode } from './components/InteractiveDemoMode';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProspectModal, setShowProspectModal] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Listen for navigation events from Coalition Builder
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('navigate-to-tab', handleNavigation as EventListener);
    return () => window.removeEventListener('navigate-to-tab', handleNavigation as EventListener);
  }, []);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [interactiveDemoActive, setInteractiveDemoActive] = useState(false);
  
  // Listen for sidebar button events
  useEffect(() => {
    const handleShowOnboarding = () => setShowOnboarding(true);
    const handleToggleTour = () => setShowTour(!showTour);
    const handleNavigateToDemo = () => setActiveTab('demo');
    
    window.addEventListener('show-onboarding', handleShowOnboarding);
    window.addEventListener('toggle-tour', handleToggleTour);
    window.addEventListener('navigate-to-demo', handleNavigateToDemo);
    
    return () => {
      window.removeEventListener('show-onboarding', handleShowOnboarding);
      window.removeEventListener('toggle-tour', handleToggleTour);
      window.removeEventListener('navigate-to-demo', handleNavigateToDemo);
    };
  }, [showTour]);
  
  const handleTabChange = (tab: string) => {
    if (tab === 'prospects') {
      setShowProspectModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleBuildCoalition = () => {
    setActiveTab('workflow');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="tour-dashboard">
            <Dashboard />
          </div>
        );
      case 'evaluation':
        return (
          <div className="tour-evaluation">
            <EnhancedEvaluationPanel onBuildCoalition={handleBuildCoalition} />
          </div>
        );
      case 'workflow':
        return (
          <CoalitionBuilder />
        );
      case 'analytics':
        return (
          <div className="tour-analytics">
            <EnhancedAnalyticsDashboard />
          </div>
        );
      case 'emails':
        return <EnhancedEmailManagement />;
      case 'calendar':
        return <CalendarView />;
      case 'decisions':
        return <AgentDecisionTree />;
      case 'workflows':
        return <WorkflowVisualization />;
      case 'documents':
        return <DocumentLibrary />;
      case 'roi':
        return <ROICalculator />;
      case 'demo':
        return <InteractiveDemoMode />;
      case 'settings':
        return (
          <ErrorBoundary>
            <SettingsPanel />
          </ErrorBoundary>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <SkipToContent />
      <AccessibilityWrapper label="Coalition Builder Application">
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
          
          <main id="main-content" className="flex-1 p-4 lg:p-8 relative max-w-[calc(100vw-16rem)] overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
            {/* Header with notifications and help */}
            <div className="absolute top-4 right-4 lg:right-8 z-10 flex items-center space-x-3">
              <div className="flex items-center space-x-1 opacity-60 hover:opacity-100 transition-opacity duration-200">
                <HelpModal />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative tour-notifications h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="View notifications"
                >
                  <Bell className="h-3.5 w-3.5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none">
                    3
                  </span>
                </Button>
              </div>
            </div>
            
            <ErrorBoundary>
              {renderContent()}
            </ErrorBoundary>
            </div>
          </main>

          {/* Global Components */}
          <ProductTour isActive={showTour} onToggle={() => setShowTour(!showTour)} />
          <NotificationCenter 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
          />
          <AddProspectModal 
            isOpen={showProspectModal} 
            onClose={() => setShowProspectModal(false)} 
          />
          <OnboardingFlow
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            onStartDemo={() => {
              setActiveTab('demo');
              setInteractiveDemoActive(true);
            }}
          />
          <SuccessCelebration
            isOpen={showSuccess}
            onClose={() => setShowSuccess(false)}
            dealData={{
              companyName: "DataFlow Solutions",
              raiseAmount: "$12M",
              timelineReduction: "3 weeks",
              agentActions: 156,
              meetingsBooked: 8
            }}
          />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
            containerStyle={{
              top: 120,
            }}
            gutter={8}
            reverseOrder={false}
          />
        </div>
      </AccessibilityWrapper>
    </ErrorBoundary>
  );
}

export default App;