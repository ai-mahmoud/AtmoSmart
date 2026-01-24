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
  fieldId: number;
  type: 'line' | 'spline' | 'column' | 'step' | 'bar';
  description?: string;
}