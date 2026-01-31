import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface TechItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export interface DashboardWidget {
  title: string;
  channelId: string;
  fieldId: number;
  type: 'line' | 'spline' | 'column' | 'step' | 'bar';
  color: string; // Hex code for chart
  unit: string;
  description?: string;
  threshold?: number; // Regulatory limit
  standard?: string; // e.g., "WHO", "EPA"
}

export interface Site {
  id: string;
  name: string;
  location: string;
  type: 'Industrial' | 'Corporate' | 'Logistics';
  status: 'Online' | 'Maintenance' | 'Offline';
}

export interface Alert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  metric: string;
}

export interface ComplianceLog {
  id: string;
  date: string;
  status: 'Compliant' | 'Non-Compliant' | 'At Risk';
  details: string;
}