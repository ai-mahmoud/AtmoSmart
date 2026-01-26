import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  image: string;
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
}