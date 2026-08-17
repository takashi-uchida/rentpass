export type UserRole =
  | 'tenant'
  | 'manager'
  | 'manager_admin'
  | 'broker'
  | 'owner'
  | 'guarantor_partner'
  | 'insurance_partner'
  | 'support_partner'
  | 'system_admin';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface StatusMeta<TStatus extends string> {
  status: TStatus;
  label: string;
  description: string;
  tone: StatusTone;
  ownerVisible: boolean;
}

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'document_review'
  | 'additional_info_requested'
  | 'condition_design'
  | 'owner_review'
  | 'conditionally_approved'
  | 'contract_preparation'
  | 'active_tenancy'
  | 'rejected'
  | 'cancelled';

export const applicationStatusMeta: Record<ApplicationStatus, StatusMeta<ApplicationStatus>> = {
  draft: {
    status: 'draft',
    label: '下書き',
    description: '入居希望者または管理会社が申込を作成中です。',
    tone: 'neutral',
    ownerVisible: false,
  },
  submitted: {
    status: 'submitted',
    label: '申込提出済み',
    description: '信用パスが申込に紐づきました。',
    tone: 'info',
    ownerVisible: false,
  },
  document_review: {
    status: 'document_review',
    label: '書類確認中',
    description: '本人確認、収入、資産、緊急連絡先を確認中です。',
    tone: 'info',
    ownerVisible: false,
  },
  additional_info_requested: {
    status: 'additional_info_requested',
    label: '追加提出依頼中',
    description: '不足情報を入居希望者に依頼しています。',
    tone: 'warning',
    ownerVisible: false,
  },
  condition_design: {
    status: 'condition_design',
    label: '条件設計中',
    description: '前払い、保証、見守り、緊急連絡体制を組み立て中です。',
    tone: 'info',
    ownerVisible: false,
  },
  owner_review: {
    status: 'owner_review',
    label: 'オーナー確認待ち',
    description: '入居安心レポートをオーナーへ共有済みです。',
    tone: 'info',
    ownerVisible: true,
  },
  conditionally_approved: {
    status: 'conditionally_approved',
    label: '条件付き承認',
    description: '提示条件を満たす前提で受け入れ候補になっています。',
    tone: 'success',
    ownerVisible: true,
  },
  contract_preparation: {
    status: 'contract_preparation',
    label: '契約準備中',
    description: '契約、初回支払い、保証、保険手続きを進めています。',
    tone: 'info',
    ownerVisible: true,
  },
  active_tenancy: {
    status: 'active_tenancy',
    label: '入居中',
    description: '契約・入居開始後。見守り管理へ移行しています。',
    tone: 'success',
    ownerVisible: true,
  },
  rejected: {
    status: 'rejected',
    label: '見送り',
    description: '今回の条件では受け入れ不可です。',
    tone: 'danger',
    ownerVisible: true,
  },
  cancelled: {
    status: 'cancelled',
    label: '取消',
    description: '申込が取り下げられました。',
    tone: 'neutral',
    ownerVisible: false,
  },
};

export const applicationStatusTransitions: Record<ApplicationStatus, readonly ApplicationStatus[]> = {
  draft: ['submitted', 'cancelled'],
  submitted: ['document_review', 'cancelled'],
  document_review: ['additional_info_requested', 'condition_design', 'cancelled'],
  additional_info_requested: ['document_review', 'cancelled'],
  condition_design: ['owner_review', 'cancelled'],
  owner_review: ['conditionally_approved', 'condition_design', 'rejected'],
  conditionally_approved: ['contract_preparation'],
  contract_preparation: ['active_tenancy'],
  active_tenancy: [],
  rejected: [],
  cancelled: [],
};

export function canTransitionApplicationStatus(from: ApplicationStatus, to: ApplicationStatus): boolean {
  return applicationStatusTransitions[from].includes(to);
}

export type MonitoringStatus =
  | 'scheduled'
  | 'waiting_check_in'
  | 'checked_in'
  | 'no_response'
  | 'reminded'
  | 'contacting_emergency_contact'
  | 'manager_handling'
  | 'external_support_requested'
  | 'resolved';

export const monitoringStatusMeta: Record<MonitoringStatus, StatusMeta<MonitoringStatus>> = {
  scheduled: {
    status: 'scheduled',
    label: '予定済み',
    description: '次回チェックイン予定が設定されています。',
    tone: 'neutral',
    ownerVisible: true,
  },
  waiting_check_in: {
    status: 'waiting_check_in',
    label: '応答待ち',
    description: '本人への安否確認を送信済みです。',
    tone: 'info',
    ownerVisible: true,
  },
  checked_in: {
    status: 'checked_in',
    label: '応答済み',
    description: '本人から応答がありました。',
    tone: 'success',
    ownerVisible: true,
  },
  no_response: {
    status: 'no_response',
    label: '未応答',
    description: '判定時間を過ぎても応答がありません。',
    tone: 'warning',
    ownerVisible: true,
  },
  reminded: {
    status: 'reminded',
    label: '再通知済み',
    description: '本人へ再通知済みです。',
    tone: 'warning',
    ownerVisible: true,
  },
  contacting_emergency_contact: {
    status: 'contacting_emergency_contact',
    label: '緊急連絡先へ連絡中',
    description: '緊急連絡先への通知・連絡中です。',
    tone: 'warning',
    ownerVisible: true,
  },
  manager_handling: {
    status: 'manager_handling',
    label: '管理会社対応中',
    description: '管理会社担当者が対応しています。',
    tone: 'warning',
    ownerVisible: true,
  },
  external_support_requested: {
    status: 'external_support_requested',
    label: '外部支援依頼中',
    description: '訪問・支援法人等へ連携中です。',
    tone: 'danger',
    ownerVisible: true,
  },
  resolved: {
    status: 'resolved',
    label: '解決済み',
    description: '安否確認または誤検知として解決しました。',
    tone: 'success',
    ownerVisible: true,
  },
};

export const monitoringStatusTransitions: Record<MonitoringStatus, readonly MonitoringStatus[]> = {
  scheduled: ['waiting_check_in'],
  waiting_check_in: ['checked_in', 'no_response'],
  checked_in: ['scheduled'],
  no_response: ['reminded'],
  reminded: ['checked_in', 'contacting_emergency_contact'],
  contacting_emergency_contact: ['checked_in', 'manager_handling'],
  manager_handling: ['external_support_requested', 'resolved'],
  external_support_requested: ['resolved'],
  resolved: ['scheduled'],
};

export function canTransitionMonitoringStatus(from: MonitoringStatus, to: MonitoringStatus): boolean {
  return monitoringStatusTransitions[from].includes(to);
}

export type ContractStatus =
  | 'not_started'
  | 'preparing'
  | 'waiting_signature'
  | 'waiting_initial_payment'
  | 'ready_to_move_in'
  | 'active'
  | 'ended'
  | 'cancelled';

export type ReservePlan = 'light' | 'standard' | 'premium';

export type PrepaymentStatus =
  | 'not_used'
  | 'proposed'
  | 'manager_confirmed'
  | 'owner_presented'
  | 'payment_requested'
  | 'payment_confirmed'
  | 'cancelled';

export type GuaranteeStatus =
  | 'not_required'
  | 'not_applied'
  | 'applying'
  | 'additional_info_required'
  | 'approved'
  | 'rejected'
  | 'cancelled';

export type CollectionStatus =
  | 'not_used'
  | 'setup_required'
  | 'setting_up'
  | 'active'
  | 'failed'
  | 'suspended'
  | 'cancelled';

export type RentReserveStatus =
  | 'not_used'
  | 'proposed'
  | 'awaiting_contract'
  | 'awaiting_deposit'
  | 'deposited'
  | 'releasing'
  | 'completed'
  | 'refund_pending'
  | 'refunded'
  | 'cancelled';

export type InsuranceStatus =
  | 'not_required'
  | 'recommended'
  | 'required'
  | 'applying'
  | 'active'
  | 'rejected'
  | 'expired'
  | 'cancelled';

export type PaymentDestinationType =
  | 'management_company_account'
  | 'owner_account'
  | 'guarantee_company'
  | 'collection_agency'
  | 'trust_company'
  | 'unknown';

export interface PaymentAssurance {
  applicationId: string;
  reservePlan: ReservePlan;
  prepaymentStatus: PrepaymentStatus;
  prepaymentMonths: number;
  expectedPrepaymentAmount: number;
  paymentDestinationType: PaymentDestinationType;
  guaranteeStatus: GuaranteeStatus;
  collectionStatus: CollectionStatus;
  rentReserveStatus: RentReserveStatus;
  insuranceStatus: InsuranceStatus;
  rentpassHoldsFunds: false;
  lastVerifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

export type DisclosureRole =
  | 'tenant'
  | 'manager'
  | 'manager_admin'
  | 'owner'
  | 'guarantor_partner'
  | 'insurance_partner'
  | 'support_partner'
  | 'system_admin';

export type DisclosureLevel =
  | 'none'
  | 'status_only'
  | 'summary'
  | 'masked_detail'
  | 'full_detail'
  | 'consent_required'
  | 'restricted';

export type InformationCategory =
  | 'basic_profile'
  | 'identity_verification_status'
  | 'identity_document_image'
  | 'income_verification_status'
  | 'income_documents'
  | 'asset_verification_status'
  | 'bankbook_or_balance_images'
  | 'prepayment_months'
  | 'payment_status'
  | 'guarantee_status'
  | 'rent_reserve_status'
  | 'monitoring_settings'
  | 'monitoring_history'
  | 'health_or_lifestyle_notes'
  | 'emergency_contact_details'
  | 'residual_goods_consent'
  | 'owner_assurance_report'
  | 'audit_log';

export const disclosureMatrix: Record<InformationCategory, Record<DisclosureRole, DisclosureLevel>> = {
  basic_profile: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'consent_required',
    insurance_partner: 'consent_required',
    support_partner: 'consent_required',
    system_admin: 'masked_detail',
  },
  identity_verification_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'status_only',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  identity_document_image: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'none',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  income_verification_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'status_only',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  income_documents: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'none',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  asset_verification_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'status_only',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  bankbook_or_balance_images: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'none',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  prepayment_months: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'consent_required',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  payment_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'summary',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  guarantee_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'full_detail',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  rent_reserve_status: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'none',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  monitoring_settings: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'none',
    insurance_partner: 'consent_required',
    support_partner: 'consent_required',
    system_admin: 'masked_detail',
  },
  monitoring_history: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'status_only',
    guarantor_partner: 'none',
    insurance_partner: 'none',
    support_partner: 'consent_required',
    system_admin: 'masked_detail',
  },
  health_or_lifestyle_notes: {
    tenant: 'full_detail',
    manager: 'restricted',
    manager_admin: 'restricted',
    owner: 'none',
    guarantor_partner: 'none',
    insurance_partner: 'none',
    support_partner: 'consent_required',
    system_admin: 'none',
  },
  emergency_contact_details: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'masked_detail',
    guarantor_partner: 'none',
    insurance_partner: 'none',
    support_partner: 'consent_required',
    system_admin: 'masked_detail',
  },
  residual_goods_consent: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'none',
    insurance_partner: 'consent_required',
    support_partner: 'consent_required',
    system_admin: 'masked_detail',
  },
  owner_assurance_report: {
    tenant: 'full_detail',
    manager: 'full_detail',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'none',
    insurance_partner: 'none',
    support_partner: 'none',
    system_admin: 'masked_detail',
  },
  audit_log: {
    tenant: 'summary',
    manager: 'summary',
    manager_admin: 'full_detail',
    owner: 'summary',
    guarantor_partner: 'summary',
    insurance_partner: 'summary',
    support_partner: 'summary',
    system_admin: 'masked_detail',
  },
};

export function getDisclosureLevel(category: InformationCategory, role: DisclosureRole): DisclosureLevel {
  return disclosureMatrix[category][role];
}

export function canViewInformation(category: InformationCategory, role: DisclosureRole): boolean {
  const level = getDisclosureLevel(category, role);
  return level !== 'none' && level !== 'consent_required' && level !== 'restricted';
}

export type ConsentType =
  | 'service_terms'
  | 'privacy_policy'
  | 'manager_review'
  | 'owner_report_share'
  | 'guarantor_application'
  | 'insurance_application'
  | 'monitoring_service'
  | 'support_partner_share'
  | 'payment_status_share';

export type ConsentStatus = 'not_requested' | 'requested' | 'granted' | 'revoked' | 'expired';

export interface ConsentRecord {
  id: string;
  tenantId: string;
  consentType: ConsentType;
  status: ConsentStatus;
  scope: InformationCategory[];
  sharedWith: DisclosureRole[];
  purpose: string;
  version: string;
  agreedAt?: string;
  revokedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type AlertLevel = 'none' | 'caution' | 'warning' | 'urgent';

export interface TenantProfile {
  id: string;
  fullName: string;
  fullNameKana: string;
  email: string;
  phone: string;
  birthDate: string;
  age: number;
  occupationCategory: 'employee' | 'freelance' | 'sole_proprietor' | 'pension' | 'multiple_income' | 'other';
  savingsBracket: string;
  monthlyIncomeAvg?: number;
  pensionMonthly?: number;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  verificationStatus: 'not_requested' | 'pending' | 'verified' | 'unreachable' | 'needs_recheck';
}

export interface Application {
  id: string;
  tenant: TenantProfile;
  propertyName: string;
  roomNumber: string;
  monthlyRent: number;
  status: ApplicationStatus;
  paymentAssurance: PaymentAssurance;
  safetyFrequency: 'daily' | 'three_times_weekly' | 'weekly' | 'none';
  residualGoodsAgreed: boolean;
  alertLevel: AlertLevel;
  lastCheckIn?: string;
  emergencyContacts: EmergencyContact[];
  notes: string;
}

export interface SafetyLog {
  id: string;
  timestamp: string;
  channel: 'web' | 'line' | 'sms' | 'phone' | 'iot';
  status: MonitoringStatus;
  notes: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorRole: UserRole;
  action: string;
  entityType: 'application' | 'tenant' | 'document' | 'owner_report' | 'monitoring' | 'payment_assurance' | 'consent';
  entityId: string;
  fromStatus?: string;
  toStatus?: string;
  reason?: string;
  createdAt: string;
}
