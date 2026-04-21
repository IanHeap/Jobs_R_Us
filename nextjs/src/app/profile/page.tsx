import Navbar from '../../components/Navbar';
import styles from './profile.module.css';

type Student = {
  Stu_id: number;
  Stu_Name: string;
  Stu_Age: number | null;
  Stu_JobExp: string | null;
  Stu_GPA: number | null;
  Stu_Major: string | null;
  Stu_Courses: string | null;
  Stu_GradYr: number | null;
  Stu_PhnNumb: string | null;
  Stu_Email: string;
  Uni_id: number;
  Uni_Name?: string;
};

async function getStudent(): Promise<Student | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/analytics/students-with-university`, { cache: 'no-store' });
  if (!res.ok) return null;
  const students: Student[] = await res.json();
  return students[0] ?? null;
}

export default async function ProfilePage() {
  const student = await getStudent();

  if (!student) {
    return (
      <>
        <Navbar />
        <div className={styles.profileContainer}>
          <p>No profile found. Seed the database to get started.</p>
        </div>
      </>
    );
  }

  const skills = student.Stu_Courses ? student.Stu_Courses.split(',').map((s) => s.trim()) : [];
  const experiences = student.Stu_JobExp
    ? student.Stu_JobExp.split('. ').filter(Boolean)
    : [];

  return (
    <>
      <Navbar />

      <div className={styles.profileContainer}>
        <div className={styles.profileTop}>
          <div className={styles.profileInfo}>
            <h2>{student.Stu_Name}</h2>
            {student.Stu_Major && student.Uni_Name && (
              <p>{student.Stu_Major} Student • {student.Uni_Name}</p>
            )}
            <p>Email: {student.Stu_Email}</p>
            {student.Stu_GPA && <p>GPA: {student.Stu_GPA}</p>}
            {student.Stu_GradYr && <p>Graduation Year: {student.Stu_GradYr}</p>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className={styles.section}>
            <h3>Skills</h3>
            <div className={styles.skills}>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        )}

        {experiences.length > 0 && (
          <div className={styles.section}>
            <h3>Experience</h3>
            {experiences.map((exp, i) => (
              <div key={i} className={styles.experienceItem}>
                <p>{exp}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
