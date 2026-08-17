import {
  AlertCard,
  AssuranceChecklist,
  CheckInCard,
  ConditionCard,
  DisclosureScopePanel,
  OwnerReportCard,
  RiskMitigationSummary,
} from '@/components/rentpass';
import { demoApplications, demoAssuranceChecklist } from '@/mocks/rentpass';

export default function DemoPage() {
  const elderlyApplication = demoApplications[0];
  const monitoringAlertApplication = demoApplications[2];

  return (
    <main className="container">
      <section style={{ marginBottom: '2rem' }}>
        <span className="nav-badge">MVP demo</span>
        <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginTop: '1rem' }}>
          RentPass UI コンポーネント確認
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '760px', marginTop: '1rem' }}>
          Stigma-freeな状態表示、入居安心チェックリスト、オーナー向けレポート、見守りチェックイン、開示範囲のサンプルです。
          本番データではなく、fixturesのデモケースを利用しています。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <RiskMitigationSummary application={elderlyApplication} />
      </section>

      <section className="grid-cols-2" style={{ marginBottom: '2rem' }}>
        <AssuranceChecklist items={demoAssuranceChecklist} />
        <ConditionCard
          title="推奨受け入れ条件"
          description="この申込をオーナーに説明するための条件セットです。"
          items={[
            '6か月分前払い条件',
            '保証会社申請',
            '週3回の見守り',
            '緊急連絡先2名の維持',
            '孤独死保険または残置物対策の確認',
          ]}
          tone="success"
        />
      </section>

      <section className="grid-cols-2" style={{ marginBottom: '2rem' }}>
        <OwnerReportCard application={elderlyApplication} />
        <CheckInCard />
      </section>

      <section className="grid-cols-2" style={{ marginBottom: '2rem' }}>
        <AlertCard
          level={monitoringAlertApplication.alertLevel}
          title="見守り未応答アラート"
          description="予定された安否確認に応答がありません。本人再通知、緊急連絡先、管理会社対応の順に記録します。"
        />
        <DisclosureScopePanel
          categories={[
            'identity_document_image',
            'bankbook_or_balance_images',
            'asset_verification_status',
            'prepayment_months',
            'monitoring_settings',
            'emergency_contact_details',
          ]}
        />
      </section>
    </main>
  );
}
