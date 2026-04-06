# Nexus Enterprise Client Portal Demo

A premium, production-quality SaaS client portal built with Next.js 15, Tailwind CSS 4, and Framer Motion. This demo replicates a Noloco-style internal tool with high-end executive aesthetics (Linear + Stripe energy).

## Core Features
- **Cinematic Loading Experience**: Smooth logo reveal and motion background.
- **Role-Based Access Control**:
  - **Client**: Access to own engagements, time logs, and requests.
  - **Manager**: Access to approvals, contractor management, and onboarding tracking.
  - **Admin**: Full system visibility and organization settings.
- **Time Approval Workflow**: Interactive approve/reject system with history timeline.
- **Engagements & Contractors**: Data-rich tables and profile-style lists.
- **Onboarding Tracker**: Detailed checklists for resource provisioning.
- **Secure Documents**: Encrypted file list simulation.
- **Unified Command Center**: Real-time KPI cards and velocity tracking.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion (60fps optimized)
- **Components**: Shadcn UI (Customized for premium slate theme)
- **Icons**: Lucide React
- **Typography**: Geist (Modern executive feel)

## Demo Account Roles
Use the **Persona Switcher** in the topbar to instantly toggle between roles:
1. **Client User**: `Alex Thompson` (Acme Corp)
2. **Host Manager**: `Sarah Chen` (Nexus Host)
3. **Internal Admin**: `Michael Ross` (Nexus Host)

## UI Principles
- **Neutral Base**: #0F172A slate foundation.
- **Mature Contrast**: Subtle layered cards instead of glassmorphism overload.
- **Executive Aesthetics**: Focus on spacing, readable typography, and micro-animations.

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Build & Deployment
This project is optimized for deployment on Vercel or Netlify.
To build: `npm run build`
