'use client';

import { useState } from 'react';
import styles from './jobDetail.module.css';

export default function ApplyButton({ jobId, companyId }: { jobId: number; companyId: number }) {
  const [status, setStatus] = useState<'idle' | 'applied' | 'error' | 'already'>('idle');

  async function handleApply() {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Stu_id: 1, Cmp_id: companyId }),
    });

    if (res.ok) {
      setStatus('applied');
    } else if (res.status === 409) {
      setStatus('already');
    } else {
      setStatus('error');
    }
  }

  if (status === 'applied' || status === 'already') {
    return (
      <span className={styles.appliedMsg}>
        {status === 'applied' ? 'Applied!' : 'Already applied'}
      </span>
    );
  }

  return (
    <>
      <button className={styles.applyBtn} onClick={handleApply}>
        Apply Now
      </button>
      {status === 'error' && (
        <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
      )}
    </>
  );
}
