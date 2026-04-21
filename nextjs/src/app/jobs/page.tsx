import Link from 'next/link';
import Navbar from '../../components/Navbar';
import styles from './jobs.module.css';

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

async function getJobs(keyword?: string, category?: string): Promise<Job[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const params = new URLSearchParams();
  if (keyword) params.set('keyword', keyword);
  if (category) params.set('category', category);
  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${baseUrl}/api/jobs${query}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

type SearchParams = Promise<{ keyword?: string; category?: string }>;

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const { keyword, category } = await searchParams;
  const jobs = await getJobs(keyword, category);

  const heading = category
    ? `${category} Jobs`
    : keyword
    ? `Results for "${keyword}"`
    : 'All Jobs';

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <h3>{heading}</h3>

        <form method="GET" action="/jobs">
          <div className={styles.filterBar}>
            <input
              type="text"
              name="keyword"
              defaultValue={keyword ?? ''}
              placeholder="Search job titles, companies, or keywords"
            />
            <button type="submit">Search</button>
          </div>
        </form>

        {jobs.length === 0 ? (
          <p className={styles.empty}>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.Job_id} className={styles.jobCard}>
              <h4>{job.Job_Title}</h4>
              <p>{job.Cmp_Name}{job.Job_Location ? ` • ${job.Job_Location}` : ''}</p>
              {job.Job_Desc && <p>{job.Job_Desc}</p>}
              <div>
                {job.Job_Type && <span className={styles.badge}>{job.Job_Type}</span>}
                {job.Job_Category && <span className={styles.badge}>{job.Job_Category}</span>}
              </div>
              <Link href={`/jobs/${job.Job_id}`} className={styles.viewLink}>
                View Job
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
