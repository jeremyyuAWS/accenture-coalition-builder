import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Mail, Search, Calendar, TrendingUp } from 'lucide-react';

interface LoadingStateProps {
  type: 'analyzing' | 'drafting' | 'searching' | 'scheduling' | 'processing';
  message?: string;
  duration?: number;
}

export function LoadingState({ type, message, duration = 3000 }: LoadingStateProps) {
  const getLoadingConfig = () => {
    switch (type) {
      case 'analyzing':
        return {
          icon: Bot,
          defaultMessage: 'AI is analyzing investor database...',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };
      case 'drafting':
        return {
          icon: Mail,
          defaultMessage: 'Drafting personalized introduction...',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'searching':
        return {
          icon: Search,
          defaultMessage: 'Searching for warm connections...',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        };
      case 'scheduling':
        return {
          icon: Calendar,
          defaultMessage: 'Coordinating calendars...',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        };
      default:
        return {
          icon: TrendingUp,
          defaultMessage: 'Processing...',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const config = getLoadingConfig();
  const Icon = config.icon;
  const displayMessage = message || config.defaultMessage;

  return (
    <Card className={`${config.bgColor} border-2 border-dashed animate-pulse`}>
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto ${config.bgColor} rounded-full flex items-center justify-center animate-bounce`}>
            <Icon className={`h-8 w-8 ${config.color} animate-spin`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${config.color}`}>
              {displayMessage}
            </h3>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                <div className={`w-2 h-2 ${config.color.replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 ${config.color.replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 ${config.color.replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SkeletonLoaderProps {
  type: 'card' | 'list' | 'table' | 'chart' | 'investor' | 'email' | 'meeting';
  count?: number;
}

export function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'investor':
        return (
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-14"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'email':
        return (
          <Card className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'meeting':
        return (
          <div className="animate-pulse p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-40"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>
          </div>
        );
      case 'card':
        return (
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        );
      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        );
      case 'table':
        return (
          <div className="space-y-2 animate-pulse">
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-3 bg-gray-200 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        );
      case 'chart':
        return (
          <Card className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return <>{renderSkeleton()}</>;
}

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypingAnimation({ text, speed = 50, className = '' }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Enhanced Loading Spinner
export function LoadingSpinner({ size = 'medium', color = 'blue' }: { 
  size?: 'small' | 'medium' | 'large'; 
  color?: 'blue' | 'green' | 'purple' | 'gray';
}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Page Loading Overlay
export function PageLoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="large" color="blue" />
        <p className="text-lg font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}