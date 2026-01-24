export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TechItem {
  name: string;
  icon: string;
  description: string;
}

export interface DashboardWidget {
  title: string;
  fieldId: number;
  type: 'line' | 'gauge' | 'status' | 'column' | 'step';
  description?: string;
}