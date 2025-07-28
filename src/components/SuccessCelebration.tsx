import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Trophy, TrendingUp, Clock, Users, DollarSign, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  dealData: {
    companyName: string;
    raiseAmount: string;
    timelineReduction: string;
    agentActions: number;
    meetingsBooked: number;
  };
}

export function SuccessCelebration({ isOpen, onClose, dealData }: SuccessCelebrationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const successSteps = [
    {
      icon: CheckCircle,
      title: 'Coalition Successfully Built!',
      description: `${dealData.companyName} has successfully built their investor coalition`,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      title: 'Impressive Results Achieved',
      description: 'AI agents delivered measurable time savings and improved outcomes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Trophy,
      title: 'Process Complete',
      description: 'From investor discovery to term sheet - fully automated workflow',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNextStep = () => {
    if (currentStep < successSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="relative overflow-hidden">
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 1
                  }}
                />
              ))}
            </div>
          )}

          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-black">
              🎉 Success!
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${successSteps[currentStep].bgColor} flex items-center justify-center`}>
                {React.createElement(successSteps[currentStep].icon, {
                  className: `h-8 w-8 ${successSteps[currentStep].color}`
                })}
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {successSteps[currentStep].title}
              </h3>
              <p className="text-gray-600">
                {successSteps[currentStep].description}
              </p>
            </motion.div>

            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center p-4 bg-green-50 rounded-lg"
              >
                <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{dealData.timelineReduction}</div>
                <div className="text-xs text-green-700">Time Saved</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center p-4 bg-blue-50 rounded-lg"
              >
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{dealData.agentActions}</div>
                <div className="text-xs text-blue-700">Agent Actions</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-4 bg-purple-50 rounded-lg"
              >
                <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{dealData.meetingsBooked}</div>
                <div className="text-xs text-purple-700">Meetings Booked</div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center p-4 bg-yellow-50 rounded-lg"
              >
                <DollarSign className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{dealData.raiseAmount}</div>
                <div className="text-xs text-yellow-700">Target Raise</div>
              </motion.div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center space-x-2">
              {successSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3">
              {currentStep < successSteps.length - 1 ? (
                <Button onClick={handleNextStep} className="bg-black text-white hover:bg-gray-800">
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <div className="space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    View Analytics
                  </Button>
                  <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
                    Start New Coalition
                  </Button>
                </div>
              )}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center bg-gray-50 rounded-lg p-4"
            >
              <p className="text-sm italic text-gray-600">
                "Coalition Builder reduced our fundraising timeline from 6 weeks to 2 weeks, 
                while increasing our investor meeting conversion rate by 40%."
              </p>
              <p className="text-xs text-gray-500 mt-2">- John Doe, CEO at DataFlow Solutions</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}