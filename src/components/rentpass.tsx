import type {
  AlertLevel,
  Application,
  ApplicationStatus,
  InformationCategory,
  MonitoringStatus,
  StatusTone,
} from '@/types';
import { applicationStatusMeta, disclosureMatrix, monitoringStatusMeta } from '@/types';

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
};

const toneClassName: Record<StatusTone, string> = {
  neutral: 'badge-primary',
  info: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
};

export function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`badge ${toneClassName[tone]}`}>{label}</span>;
}

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const meta = applicationStatusMeta[status];
  return <StatusBadge label={meta.label} tone={meta.tone} />;
}

export function MonitoringStatusBadge({ status }: { status: MonitoringStatus }) {
  const meta = monitoringStatusMeta[status];
  return <StatusBadge label={meta.label} tone={meta.tone} />;
}

type ChecklistItem = {
  label: string;
  status: 'done' | 'pending' | 'missing' | 'not_required';
  description?: string;
};

const checklistLabel: Record<ChecklistItem['status'], string> = {
  done: '対策済み',
  pending: '確認中',
  missing: '追加確認',
  not_required: '不要',
};

const checklistTone: Record<ChecklistItem['status'], StatusTone> = {
  done: 'success',
  pending: 'info',
  missing: 'warning',
  not_required: 'neutral',
};

export function AssuranceChecklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">入居安心チェックリスト</h3>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              alignItems: 'center',
              borderBottom: '1px solid var(--border-color)',
              display: 'grid',
              gap: '0.75rem',
              gridTemplateColumns: '1fr auto',
              paddingBottom: '0.75rem',
            }}
          >
            <div>
              <strong>{item.label}</strong>
              {item.description ? <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.description}</p> : null}
            </div>
            <StatusBadge label={checklistLabel[item.status]} tone={checklistTone[item.status]} />
          </div>
        ))}
      </div>
    </div>
  );
}

type ConditionCardProps = {
  title: string;
  description: string;
  items: string[];
  tone?: StatusTone;
};

export function ConditionCard({ title, description, items, tone = 'info' }: ConditionCardProps) {
  return (
    <section className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <StatusBadge label="推奨条件" tone={tone} />
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{description}</p>
      <ul style={{ display: 'grid', gap: '0.5rem', listStyle: 'none' }}>
        {items.map((item) => (
          <li key={item}>✅ {item}</li>
        ))}
      </ul>
    </section>
  );
}

export function RiskMitigationSummary({ application }: { application: Application }) {
  const { paymentAssurance } = application;

  return (
    <div className="grid-cols-3">
      <div className="card">
        <h3 className="card-title">支払い対策</h3>
        <p>{paymentAssurance.prepaymentMonths}か月分前払い条件</p>
        <p style={{ color: 'var(--text-secondary)' }}>RentPassは資金を預かりません。</p>
      </div>
      <div className="card">
        <h3 className="card-title">見守り</h3>
        <p>{application.safetyFrequency === 'none' ? '利用なし' : '定期安否確認あり'}</p>
        <p style={{ color: 'var(--text-secondary)' }}>未応答時は段階的に通知します。</p>
      </div>
      <div className="card">
        <h3 className="card-title">緊急連絡</h3>
        <p>{application.emergencyContacts.length}名登録</p>
        <p style={{ color: 'var(--text-secondary)' }}>確認済み連絡先を優先します。</p>
      </div>
    </div>
  );
}

export function OwnerReportCard({ application }: { application: Application }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">入居安心レポート</h2>
        <ApplicationStatusBadge status={application.status} />
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        {application.propertyName} {application.roomNumber} / 月額家賃 {application.monthlyRent.toLocaleString()}円
      </p>
      <AssuranceChecklist
        items={[
          { label: '本人確認', status: application.tenant.verificationStatus === 'verified' ? 'done' : 'pending' },
          { label: '前払い条件', status: application.paymentAssurance.prepaymentMonths > 0 ? 'done' : 'missing' },
          { label: '保証会社', status: application.paymentAssurance.guaranteeStatus === 'approved' ? 'done' : 'pending' },
          { label: '見守り設定', status: application.safetyFrequency === 'none' ? 'not_required' : 'done' },
          { label: '緊急連絡先', status: application.emergencyContacts.length >= 2 ? 'done' : 'missing' },
        ]}
      />
    </section>
  );
}

export function CheckInCard({ onCheckInHref = '#' }: { onCheckInHref?: string }) {
  return (
    <section className="card" style={{ textAlign: 'center' }}>
      <h2 className="card-title" style={{ justifyContent: 'center' }}>今日の確認</h2>
      <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>お変わりありませんか？</p>
      <a className="btn btn-success btn-lg" href={onCheckInHref}>
        元気です
      </a>
      <p style={{ marginTop: '1rem' }}>
        <a className="nav-link" href="#support">相談したい</a>
      </p>
    </section>
  );
}

const alertLevelLabel: Record<AlertLevel, string> = {
  none: '正常',
  caution: '確認待ち',
  warning: '要確認',
  urgent: '緊急対応',
};

const alertLevelTone: Record<AlertLevel, StatusTone> = {
  none: 'success',
  caution: 'warning',
  warning: 'warning',
  urgent: 'danger',
};

export function AlertCard({ level, title, description }: { level: AlertLevel; title: string; description: string }) {
  return (
    <section className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <StatusBadge label={alertLevelLabel[level]} tone={alertLevelTone[level]} />
      </div>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </section>
  );
}

export function DisclosureScopePanel({ categories }: { categories: InformationCategory[] }) {
  return (
    <section className="card">
      <div className="card-header">
        <h3 className="card-title">オーナーへの開示範囲</h3>
        <StatusBadge label="要約のみ" tone="info" />
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {categories.map((category) => (
          <div key={category} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <span>{category}</span>
            <code>{disclosureMatrix[category].owner}</code>
          </div>
        ))}
      </div>
      <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
        オーナーには、原則として通帳画像・本人確認書類画像・健康情報は表示されません。
      </p>
    </section>
  );
}
