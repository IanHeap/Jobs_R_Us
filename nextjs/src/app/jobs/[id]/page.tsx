import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import ApplyButton from './ApplyButton';
import styles from './jobDetail.module.css';

type Job = {
  Job_id: number;
  Job_Title: string;
  Job_Desc: string | null;
  Job_Location: string | null;
  Job_Type: string | null;
  Job_Category: string | null;
  Cmp_id: number;
  Cmp_Name: string;
};

async function getJob(id: string): Promise<Job | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/jobs/${id}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json();
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  return (
    <>
      <Navbar />

      <div className={styles.jobContainer}>
        <div className={styles.jobHeader}>
          <h2>{job.Job_Title}</h2>
          <div className={styles.companyInfo}>
            <span><strong>Company:</strong> {job.Cmp_Name}</span>
            {job.Job_Location && <span><strong>Location:</strong> {job.Job_Location}</span>}
            {job.Job_Type && <span><strong>Type:</strong> {job.Job_Type}</span>}
          </div>
        </div>

        {job.Job_Desc && (
          <div className={styles.section}>
            <h3>Job Description</h3>
            <p>{job.Job_Desc}</p>
          </div>
        )}

        {job.Job_Category && (
          <div className={styles.section}>
            <h3>Category</h3>
            <p>{job.Job_Category}</p>
          </div>
        )}

        <ApplyButton jobId={job.Job_id} companyId={job.Cmp_id} />
      </div>
    </>
  );
}
