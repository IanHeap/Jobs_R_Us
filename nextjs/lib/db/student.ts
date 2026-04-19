import db from './client';
import type { StudentInput } from './types';

// -- insert
export function insertStudent(data: StudentInput) {
  const stmt = db.prepare(`
    INSERT INTO Student (Stu_Name, Stu_Age, Stu_JobExp, Stu_GPA, Stu_Major,
      Stu_Courses, Stu_GradYr, Stu_PhnNumb, Stu_Email, Uni_id)
    VALUES (@Stu_Name, @Stu_Age, @Stu_JobExp, @Stu_GPA, @Stu_Major,
      @Stu_Courses, @Stu_GradYr, @Stu_PhnNumb, @Stu_Email, @Uni_id)
  `);
  return stmt.run(data);
}

// -- delete
export function deleteStudent(stuId: number) {
  return db.prepare('DELETE FROM Student WHERE Stu_id = ?').run(stuId);
}

// -- get by id
export function getStudentById(stuId: number) {
  return db.prepare('SELECT * FROM Student WHERE Stu_id = ?').get(stuId);
}

// -- search by major
export function searchStudentsByMajor(major: string) {
  return db.prepare('SELECT * FROM Student WHERE Stu_Major = ?').all(major);
}

// -- search by major, course keyword, and/or grad year
export function searchStudents(filters: { major?: string; course?: string; gradYr?: number }) {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters.major) {
    conditions.push('Stu_Major = ?');
    params.push(filters.major);
  }
  if (filters.course) {
    conditions.push('Stu_Courses LIKE ?');
    params.push(`%${filters.course}%`);
  }
  if (filters.gradYr) {
    conditions.push('Stu_GradYr = ?');
    params.push(filters.gradYr);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return db.prepare(`SELECT * FROM Student ${where}`).all(...params);
}

// -- filter by GPA range
export function filterStudentsByGPA(minGpa: number, maxGpa: number) {
  return db
    .prepare('SELECT * FROM Student WHERE Stu_GPA >= ? AND Stu_GPA <= ?')
    .all(minGpa, maxGpa);
}

// -- update
export function updateStudent(stuId: number, data: Partial<StudentInput>) {
  const fields = Object.keys(data) as (keyof StudentInput)[];
  if (fields.length === 0) return { changes: 0 };
  const set = fields.map((f) => `${f} = @${f}`).join(', ');
  return db.prepare(`UPDATE Student SET ${set} WHERE Stu_id = @Stu_id`).run({ ...data, Stu_id: stuId });
}
