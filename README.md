# **Coalition Builder Demo App**

**Tagline:**
*“Turning Invisible Agentic Workflows into Actionable, Interactive Experiences.”*

---

## **1. Executive Summary**

Spotlight’s platform currently runs powerful **agentic workflows** invisibly in the background, but this lack of visibility reduces user trust and engagement. The **Coalition Builder Demo App** showcases a next-generation **interactive interface** where **agents and humans work side-by-side** to build investor coalitions.

This demo app highlights **co-investor recommendations, outreach automation, and real-time task visibility** with a **clean, black-white shadcn UI**. It provides:

* **Clear explainability** for AI recommendations.
* **Interactive task ownership** (Agent vs. Human).
* **Activity tracking and analytics** for measurable productivity gains.

---

## **2. Business Objectives**

### **Challenges**

* Agents currently deliver value invisibly, creating a **passive platform feel**.
* Outreach, relationship building, and scheduling workflows are **disconnected and opaque**.
* **Clients cannot measure agent-driven productivity.**

### **Solution**

The Coalition Builder introduces **visible, explainable, and actionable agent workflows**:

* Recommends co-investors with **“why this investor” explainability.**
* Automates **LinkedIn outreach, email intros, and scheduling**.
* Displays **real-time progress and task ownership** in an **activity timeline**.
* Provides **analytics dashboards** with agent/human productivity metrics.

---

## **3. Core Workflow**

1. **Trigger Point: Evaluation Panel**

   * User opens a deal’s evaluation screen.
   * System displays **top 2–3 co-investor recommendations** with:

     * **Fit Score (% match).**
     * **Explainability** (e.g., “Investor backed 3 SaaS startups in your sector”).

2. **User Action**

   * User clicks **“Build Coalition”** to initiate agentic outreach.

3. **Agentic Outreach Process**

   * **Pathfinding:** Agent finds warm LinkedIn introductions.
   * **Draft Intros:** Agent generates rationale-based intro notes.
   * **Outreach:** Emails and follow-ups are sent autonomously.
   * **Scheduling:** Agent books meetings via EA or calendar integration.
   * **Status Updates:** Activity timeline shows each step with **ownership markers**.

---

## **4. Detailed Feature Set**

### **4.1 Evaluation Panel**

* **Dynamic Co-Investor Recommendations.**
* **Fit & Relevance Scores.**
* Explainability section with highlights of relevant deals.

### **4.2 Coalition Builder Workflow**

* **LinkedIn Integration (mocked for demo).**
* Agent auto-generates **warm intros** for user approval.
* Outreach emails sent directly from **user’s email (synthetic demo).**
* **Meeting scheduling** handled by agent.

### **4.3 Activity Timeline (Key UI Component)**

* **Chat-style log** of all agent/human actions.
* **Ownership markers:**

  * Agent → AI Badge.
  * Human → User avatar.
* **Status indicators:** Pending, Sent, Responded, Scheduled.

### **4.4 Project Kanban**

* **Columns:**

  * Recommended Investors.
  * Outreach in Progress.
  * Meeting Confirmed.
  * Declined.
* Cards include:

  * Last action timestamp.
  * Agent/human owner.

### **4.5 Analytics Dashboard**

* **Agent KPIs:**

  * Intros sent, follow-ups, meetings booked.
* **Human KPIs:**

  * Tasks approved, meetings attended.
* **Conversion Metrics:** Outreach → Meeting rate.

### **4.6 Add Prospect Modal**

* Fields: `name, title, company, email, notes`.
* **Validation:** Required fields (name, email).
* **UI Fix:** Remove grey focus rectangle on “X” button:

```tsx
<Button
  variant="ghost"
  size="icon"
  onClick={onClose}
  className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-0"
>
  <X className="h-5 w-5 text-gray-600" />
</Button>
```

### **4.7 Calendar Integration**

* Parses user availability (Google/Outlook).
* Handles EA handoffs for scheduling.

### **4.8 Notifications**

* **Real-time in-app notifications:**

  * “Agent completed outreach to Investor X.”
  * “Meeting scheduled with Investor Y.”

### **4.9 Reporting & Export**

* **Download CSV:** Agent vs. Human task reports.
* Filters by project, investor, or date range.

---

## **5. UI/UX Design Guidelines**

* **Theme:** Clean black-white.

  * Background: `bg-white`.
  * Text: `text-black`.
  * Hover states: `hover:bg-gray-100`.
* **Components:**

  * Use `shadcn/ui` cards and buttons.
  * No black buttons; use white or light-gray with `border border-gray-300`.
* **Modals:**

  * Use `rounded-2xl` corners and subtle `shadow-md`.
* **Typography:**

  * Headers: `text-xl font-bold`.
  * Body: `text-base`.
* **Agent vs. Human Markers:**

  * Agent actions: AI icon (e.g., brain icon).
  * Human actions: User avatar with label **“You”**.

---

## **6. Technical Requirements**

### **Frontend**

* **Framework:** React (Vite or Next.js).
* **Styling:** Tailwind CSS + `shadcn/ui`.
* **Icons:** `lucide-react`.
* **State Management:** Zustand + React Query.

### **Backend**

* **Synthetic Data:** JSON-based mock API for:

  * Investor recommendations.
  * Activity logs.
  * Outreach status.

### **Integrations (Mocked)**

* **LinkedIn pathfinding API.**
* **Email service (SendGrid simulation).**
* **Calendar APIs (Google/Outlook mock).**

---

## **7. Success Metrics**

| **Metric**                             | **Target**        |
| -------------------------------------- | ----------------- |
| Visible agent actions per deal         | ≥ 3               |
| Avg. time to first co-investor contact | < 2 business days |
| Outreach-to-meeting conversion         | ≥ 50%             |
| Workflow visibility satisfaction       | ≥ 90% (CSAT)      |
| Increase in platform active users      | +25%              |

---

## **8. Future Roadmap**

* **Voice-enabled AI outreach agent.**
* **RAG-based investor research engine.**
* **CRM integrations (Salesforce, HubSpot).**
* **Investor persona builder (AI-driven).**

---

## **9. Next Steps**

1. Build **Evaluation Panel** (static mock with top 3 investors).
2. Develop **Activity Timeline** as a standalone component (`ActivityTimeline.tsx`).
3. Implement **Kanban screen** using `shadcn/ui Card` components.
4. Fix **AddProspectModal “X” button** issue in `AddProspectModal.tsx`.
5. Populate **Analytics Dashboard** with synthetic KPIs.
