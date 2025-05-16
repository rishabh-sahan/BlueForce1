export type UserRole = 'admin' | 'employer' | 'worker';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields based on role
  companyName?: string; // For employers
  skills?: string[]; // For workers
  experience?: number; // For workers
  rating?: number; // For workers
  bio?: string;
  profileImage?: string;
}

export interface WorkerProfile extends UserProfile {
  skills: string[];
  experience: number;
  rating: number;
  completedJobs: number;
  availability: {
    isAvailable: boolean;
    schedule?: {
      [key: string]: {
        start: string;
        end: string;
      };
    };
  };
}

export interface EmployerProfile extends UserProfile {
  companyName: string;
  companySize: string;
  industry: string;
  projects: string[];
}

export interface AdminProfile extends UserProfile {
  permissions: string[];
  managedUsers: number;
} 