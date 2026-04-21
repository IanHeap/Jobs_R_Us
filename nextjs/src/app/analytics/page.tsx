import Navbar from '../../components/Navbar';
import styles from './analytics.module.css';

type GpaByMajor = { Stu_Major: string; Avg_GPA: number; Student_Count: number };
type GpaByUniversity = { Uni_Name: string; Avg_GPA: number; Student_Count: number };
type AppPerCompany = { Cmp_Name: string; Application_Count: number };

async function fetchJson<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AnalyticsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const [gpaByMajor, gpaByUniversity, appsPerCompany] = await Promise.all([
    fetchJson<GpaByMajor>(`${baseUrl}/api/analytics/avg-gpa-by-major`),
    fetchJson<GpaByUniversity>(`${baseUrl}/api/analytics/avg-gpa-by-university`),
    fetchJson<AppPerCompany>(`${baseUrl}/api/analytics/applications-per-company`),
  ]);

  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.card}>
          <h2>Average GPA by Major</h2>
          {gpaByMajor.length === 0 ? (
            <p className={styles.empty}>No data available.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Major</th>
                  <th>Avg GPA</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {gpaByMajor.map((row) => (
                  <tr key={row.Stu_Major}>
                    <td>{row.Stu_Major}</td>
                    <td>{row.Avg_GPA}</td>
                    <td>{row.Student_Count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.card}>
          <h2>Average GPA by University</h2>
          {gpaByUniversity.length === 0 ? (
            <p className={styles.empty}>No data available.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>University</th>
                  <th>Avg GPA</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {gpaByUniversity.map((row) => (
                  <tr key={row.Uni_Name}>
                    <td>{row.Uni_Name}</td>
                    <td>{row.Avg_GPA}</td>
                    <td>{row.Student_Count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.card}>
          <h2>Applications per Company</h2>
          {appsPerCompany.length === 0 ? (
            <p className={styles.empty}>No data available.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Applications</th>
                </tr>
              </thead>
              <tbody>
                {appsPerCompany.map((row) => (
                  <tr key={row.Cmp_Name}>
                    <td>{row.Cmp_Name}</td>
                    <td>{row.Application_Count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </>
  );
}
