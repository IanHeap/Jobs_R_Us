import db from './client';
import type { UniversityInput } from './types';

// -- insert
export function insertUniversity(data: UniversityInput) {
  const stmt = db.prepare(`
    INSERT INTO University (Uni_Name, Uni_PhnNumb, Uni_Email)
    VALUES (@Uni_Name, @Uni_PhnNumb, @Uni_Email)
  `);
  return stmt.run(data);
}

// -- get all
export function getAllUniversities() {
  return db.prepare('SELECT * FROM University').all();
}

// -- get by id
export function getUniversityById(uniId: number) {
  return db.prepare('SELECT * FROM University WHERE Uni_id = ?').get(uniId);
}

// -- update
export function updateUniversity(uniId: number, data: Partial<UniversityInput>) {
  const fields = Object.keys(data) as (keyof UniversityInput)[];
  if (fields.length === 0) return { changes: 0 };
  const set = fields.map((f) => `${f} = @${f}`).join(', ');
  return db.prepare(`UPDATE University SET ${set} WHERE Uni_id = @Uni_id`).run({ ...data, Uni_id: uniId });
}

// -- delete
export function deleteUniversity(uniId: number) {
  return db.prepare('DELETE FROM University WHERE Uni_id = ?').run(uniId);
}
