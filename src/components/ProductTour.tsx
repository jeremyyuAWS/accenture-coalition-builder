import React, { useState, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface ProductTourProps {
  isActive: boolean;
  onToggle: () => void;
}

const tourSteps: Step[] = [
  {
    target: '.tour-dashboard',
    content: 'Welcome to Coalition Builder! This dashboard shows real-time investor outreach progress powered by AI agents working behind the scenes.',
    placement: 'center',
  },
  {
    target: '.tour-activity-timeline',
    content: 'This live activity timeline shows every action taken by AI agents and humans - making invisible workflows completely transparent.',
    placement: 'top',
  },
  {
    target: '.tour-top-matches',
    content: 'AI continuously ranks your best investor matches with explainable fit scores and warm introduction paths.',
    placement: 'left',
  },
  {
    target: '.tour-notifications',
    content: 'The notification center shows real-time agent actions, responses received, and requests for your approval.',
    placement: 'left',
  },
  {
    target: '.tour-sidebar',
    content: 'Navigate between different views: Dashboard overview, AI Evaluation, Live Workflow, and Performance Analytics.',
    placement: 'right',
  },
  {
    target: '.tour-evaluation-button',
    content: 'Click "Evaluation" to see AI-powered investor recommendations with explainable reasoning.',
    placement: 'right',
  },
  {
    target: '.tour-coalition-button',
    content: 'Visit "Coalition Builder" to see the live Kanban workflow where agents automatically move prospects through your pipeline.',
    placement: 'right',
  },
  {
    target: '.tour-build-coalition',
    content: 'The future of fundraising is here - AI agents working transparently alongside humans to build investor coalitions. Explore the app to see the magic! 🚀',
    placement: 'center',
  },
];

export function ProductTour({ isActive, onToggle }: ProductTourProps) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, action, index, type } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onToggle();
      setStepIndex(0);
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  }, [onToggle]);

  return (
    <>
      {isActive && (
        <>
          <Joyride
            steps={tourSteps}
            run={isActive}
            stepIndex={stepIndex}
            callback={handleJoyrideCallback}
            continuous
            showProgress
            showSkipButton
            styles={{
              options: {
                primaryColor: '#000000',
                textColor: '#333333',
                backgroundColor: '#ffffff',
                overlayColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1000,
              },
              tooltip: {
                borderRadius: 16,
                fontSize: 14,
              },
              buttonNext: {
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: 8,
              },
              buttonBack: {
                color: '#666666',
                marginRight: 10,
              },
              buttonSkip: {
                color: '#666666',
              },
            }}
            locale={{
              back: 'Previous',
              close: 'Close',
              last: 'Finish Tour',
              next: 'Next',
              skip: 'Skip Tour',
            }}
          />
          
          {/* Pulsing indicators for key elements */}
          <div className="fixed inset-0 pointer-events-none z-40">
            <div className="absolute top-32 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-64 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </>
      )}
    </>
  );
}