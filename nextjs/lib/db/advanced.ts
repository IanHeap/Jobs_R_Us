import db from './client';
import type { StudentMajorGPA } from './types';

// -- JOIN: all students with their university info
export function getStudentsWithUniversity() {
  return db.prepare(`
    SELECT s.*, u.Uni_Name, u.Uni_Email, u.Uni_PhnNumb
    FROM Student s
    JOIN University u ON s.Uni_id = u.Uni_id
  `).all();
}

// -- JOIN: one student's applications with company details
export function getStudentApplications(stuId: number) {
  return db.prepare(`
    SELECT a.App_id, a.App_Date, a.App_Status,
           c.Cmp_id, c.Cmp_Name, c.Cmp_Email, c.Cmp_Requirement
    FROM Application a
    JOIN Company c ON a.Cmp_id = c.Cmp_id
    WHERE a.Stu_id = ?
  `).all(stuId);
}

// -- AGGREGATION: average GPA per university
export function getAverageGPAByUniversity() {
  return db.prepare(`
    SELECT u.Uni_Name, ROUND(AVG(s.Stu_GPA), 2) AS Avg_GPA, COUNT(s.Stu_id) AS Student_Count
    FROM Student s
    JOIN University u ON s.Uni_id = u.Uni_id
    WHERE s.Stu_GPA IS NOT NULL
    GROUP BY u.Uni_id
    ORDER BY Avg_GPA DESC
  `).all();
}

// -- AGGREGATION: average GPA per major
export function getAverageGPAByMajor() {
  return db.prepare(`
    SELECT Stu_Major, ROUND(AVG(Stu_GPA), 2) AS Avg_GPA, COUNT(Stu_id) AS Student_Count
    FROM Student
    WHERE Stu_GPA IS NOT NULL AND Stu_Major IS NOT NULL
    GROUP BY Stu_Major
    ORDER BY Avg_GPA DESC
  `).all();
}

// -- AGGREGATION: application count per company
export function getApplicationCountPerCompany() {
  return db.prepare(`
    SELECT c.Cmp_Name, COUNT(a.App_id) AS Application_Count
    FROM Company c
    LEFT JOIN Application a ON c.Cmp_id = a.Cmp_id
    GROUP BY c.Cmp_id
    ORDER BY Application_Count DESC
  `).all();
}

// -- RECOMMENDATION: companies whose requirement keyword matches student's major
export function getRecommendedCompanies(stuId: number) {
  const student = db
    .prepare('SELECT Stu_Major, Stu_GPA FROM Student WHERE Stu_id = ?')
    .get(stuId) as StudentMajorGPA | undefined;

  if (!student?.Stu_Major) return [];

  return db.prepare(`
    SELECT c.*
    FROM Company c
    WHERE c.Cmp_Requirement LIKE ?
    ORDER BY c.Cmp_Name ASC
  `).all(`%${student.Stu_Major}%`);
}

