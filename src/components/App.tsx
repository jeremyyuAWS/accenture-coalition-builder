@@ .. @@
import React, { useState } from 'react';
+import { useEffect } from 'react';
 import { Toaster } from 'react-hot-toast';
+import toast from 'react-hot-toast';
 import { Sidebar } from './components/Sidebar';
@@ .. @@
function App() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const [showProspectModal, setShowProspectModal] = useState(false);
   const [showTour, setShowTour] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
+  const [demoMode, setDemoMode] = useState(false);

+  // Demo Mode: Simulate real-time agent activities
+  useEffect(() => {
+    if (!demoMode) return;
+
+    const demoActivities = [
+      "🤖 Agent found warm intro path to Sarah Chen via LinkedIn",
+      "📧 Agent drafted personalized introduction email",
+      "✅ Agent sent follow-up to Marcus Rodriguez", 
+      "📅 Agent scheduled meeting with Emily Watson",
+      "🔍 Agent researching 3 new investor prospects",
+      "📊 Agent updated fit scores based on latest portfolio data",
+      "🤝 Agent identified 2nd degree connection to Robert Kim",
+      "📈 Agent analyzing response patterns for optimization"
+    ];
+
+    const interval = setInterval(() => {
+      const randomActivity = demoActivities[Math.floor(Math.random() * demoActivities.length)];
+      toast.success(randomActivity, {
+        duration: 4000,
+        style: {
+          background: '#1e40af',
+          color: '#fff',
+          fontSize: '14px'
+        },
+      });
+    }, 8000);
+
+    return () => clearInterval(interval);
+  }, [dem  }
oMode]);

   const handleTabChange = (tab: string) => {
@@ .. @@
   const handleBuildCoalition = () => {
     setActiveTab('workflow');
+    if (demoMode) {
+      toast.success("🚀 Coalition Builder activated! Watch agents work in real-time...", {
+        duration: 5000,
+        style: { background: '#059669', color: '#fff' }
+      });
+    }
   };

@@ .. @@
         <div className="absolute top-4 right-8 flex items-center space-x-3">
           <Button
             variant="outline"
             size="sm"
             onClick={() => setShowNotifications(!showNotifications)}
-            className="relative"
+            className="relative tour-notifications"
           >
             <Bell className="h-4 w-4" />
             <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
               3
             </span>
           </Button>
+          
+          <Button
+            variant={demoMode ? "destructive" : "default"}
+            size="sm"
+            onClick={() => setDemoMode(!demoMode)}
+            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
+          >
+            {demoMode ? '⏹️ Stop' : '🎬 Live Demo'}
+          </Button>
         </div>
         
         {renderContent()}