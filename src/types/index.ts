export type UserRole = 'tenant' | 'manager' | 'broker' | 'owner' | 'admin';

export type AlertLevel = 'level_0_ok' | 'level_1_caution' | 'level_2_warning' | 'level_3_emergency';

export type ReservePlan = 'light' | 'standard' | 'premium';

export type ApplicationStatus = 'draft' | 'submitted' | 'condition_review' | 'approved' | 'active' | 'terminated';

export interface TenantProfile {
  id: string;
  fullName: string;
  fullNameKana: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  occupationCategory: string;
  savingsBracket: string;
  monthlyIncomeAvg?: number;
  pensionMonthly?: number;
  verificationStatus: 'unverified' | 'pending' | 'verified';
}

export interface Application {
  id: string;
  tenant: TenantProfile;
  propertyName: string;
  roomNumber: string;
  monthlyRent: number;
  status: ApplicationStatus;
  score: 'AAA' | 'A+' | 'A' | 'B';
  reservePlan: ReservePlan;
  reserveMonths: number;
  reservedAmount: number;
  safetyFrequency: 'daily' | 'every_2_days' | 'weekly' | 'none';
  residualGoodsAgreed: boolean;
  alertLevel: AlertLevel;
  lastCheckIn?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes: string;
}

export interface SafetyLog {
  id: string;
  timestamp: string;
  channel: 'web' | 'line' | 'sms' | 'iot';
  status: 'checked_in' | 'no_response' | 'escalated' | 'resolved';
  notes: string;
}
