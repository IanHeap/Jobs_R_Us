import db from './client';
import type { CompanyInput } from './types';

// -- insert
export function insertCompany(data: CompanyInput) {
  const stmt = db.prepare(`
    INSERT INTO Company (Cmp_Name, Cmp_Requirement, Cmp_PhnNumb, Cmp_Email)
    VALUES (@Cmp_Name, @Cmp_Requirement, @Cmp_PhnNumb, @Cmp_Email)
  `);
  return stmt.run(data);
}

// -- delete
export function deleteCompany(cmpId: number) {
  return db.prepare('DELETE FROM Company WHERE Cmp_id = ?').run(cmpId);
}

// -- get by id
export function getCompanyById(cmpId: number) {
  return db.prepare('SELECT * FROM Company WHERE Cmp_id = ?').get(cmpId);
}

// -- get all
export function getAllCompanies() {
  return db.prepare('SELECT * FROM Company').all();
}

// -- search requirement string
export function searchCompaniesByRequirement(keyword: string) {
  return db
    .prepare('SELECT * FROM Company WHERE Cmp_Requirement LIKE ?')
    .all(`%${keyword}%`);
}

// -- update
export function updateCompany(cmpId: number, data: Partial<CompanyInput>) {
  const fields = Object.keys(data) as (keyof CompanyInput)[];
  if (fields.length === 0) return { changes: 0 };
  const set = fields.map((f) => `${f} = @${f}`).join(', ');
  return db.prepare(`UPDATE Company SET ${set} WHERE Cmp_id = @Cmp_id`).run({ ...data, Cmp_id: cmpId });
}
