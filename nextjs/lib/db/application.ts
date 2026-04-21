import db from './client';
import type { AppStatus } from './types';

// -- get all
export function getAllApplications() {
  return db.prepare('SELECT * FROM Application').all();
}

// -- insert
export function insertApplication(stuId: number, cmpId: number) {
  return db
    .prepare('INSERT INTO Application (Stu_id, Cmp_id) VALUES (?, ?)')
    .run(stuId, cmpId);
}

// -- update status
export function updateApplicationStatus(appId: number, status: AppStatus) {
  return db
    .prepare('UPDATE Application SET App_Status = ? WHERE App_id = ?')
    .run(status, appId);
}

// -- delete
export function deleteApplication(appId: number) {
  return db.prepare('DELETE FROM Application WHERE App_id = ?').run(appId);
}
