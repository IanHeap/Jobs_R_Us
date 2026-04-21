import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './home.module.css';

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

const CATEGORIES = [
  'Software Engineering',
  'Marketing',
  'Data Science',
  'Design',
  'Business',
  'Internships',
];

async function getFeaturedJobs(): Promise<Job[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/jobs`, { cache: 'no-store' });
  if (!res.ok) return [];
  const jobs: Job[] = await res.json();
  return jobs.slice(0, 3);
}

export default async function HomePage() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>Search for your next job</h1>
        <p>Search thousands of internships, part-time jobs, and full-time careers</p>

        <form action="/jobs" method="GET">
          <div className={styles.searchBar}>
            <input type="text" name="keyword" placeholder="Search job titles, companies, or keywords" />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      {/* Featured Jobs */}
      <div className={styles.section}>
        <h3>Featured Jobs</h3>
        {featuredJobs.length === 0 ? (
          <p style={{ color: '#555' }}>No jobs available yet. Seed the database to get started.</p>
        ) : (
          featuredJobs.map((job) => (
            <div key={job.Job_id} className={styles.jobCard}>
              <h4>{job.Job_Title}</h4>
              <p>{job.Cmp_Name}{job.Job_Location ? ` • ${job.Job_Location}` : ''}</p>
              {job.Job_Desc && <p>{job.Job_Desc}</p>}
              <Link href={`/jobs/${job.Job_id}`} className={styles.applyLink}>
                View Job
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Browse by Category */}
      <div className={styles.section}>
        <h3>Browse by Category</h3>
        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/jobs?category=${encodeURIComponent(cat)}`} className={styles.categoryBox}>
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
