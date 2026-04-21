import db from './client';
import type { JobInput } from './types';

// -- insert
export function insertJob(data: JobInput) {
  return db.prepare(`
    INSERT INTO Job (Job_Title, Job_Desc, Job_Location, Job_Type, Job_Category, Cmp_id)
    VALUES (@Job_Title, @Job_Desc, @Job_Location, @Job_Type, @Job_Category, @Cmp_id)
  `).run(data);
}

// -- get all (with company name)
export function getAllJobs() {
  return db.prepare(`
    SELECT j.*, c.Cmp_Name, c.Cmp_Email
    FROM Job j
    JOIN Company c ON j.Cmp_id = c.Cmp_id
    ORDER BY j.Job_id ASC
  `).all();
}

// -- get by id (with company name)
export function getJobById(jobId: number) {
  return db.prepare(`
    SELECT j.*, c.Cmp_Name, c.Cmp_Email
    FROM Job j
    JOIN Company c ON j.Cmp_id = c.Cmp_id
    WHERE j.Job_id = ?
  `).get(jobId);
}

// -- search by keyword (title or category) and optional category filter
export function searchJobs(keyword?: string, category?: string) {
  const conditions: string[] = [];
  const bindings: string[] = [];

  if (keyword) {
    conditions.push('(j.Job_Title LIKE ? OR c.Cmp_Name LIKE ? OR j.Job_Category LIKE ?)');
    bindings.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }
  if (category) {
    conditions.push('j.Job_Category = ?');
    bindings.push(category);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return db.prepare(`
    SELECT j.*, c.Cmp_Name, c.Cmp_Email
    FROM Job j
    JOIN Company c ON j.Cmp_id = c.Cmp_id
    ${where}
    ORDER BY j.Job_id ASC
  `).all(...bindings);
}

// -- update
export function updateJob(jobId: number, data: Partial<JobInput>) {
  const fields = Object.keys(data) as (keyof JobInput)[];
  if (fields.length === 0) return { changes: 0 };
  const set = fields.map((f) => `${f} = @${f}`).join(', ');
  return db.prepare(`UPDATE Job SET ${set} WHERE Job_id = @Job_id`).run({ ...data, Job_id: jobId });
}

// -- delete
export function deleteJob(jobId: number) {
  return db.prepare('DELETE FROM Job WHERE Job_id = ?').run(jobId);
}
