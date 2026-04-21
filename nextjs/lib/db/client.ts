import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'lib', 'db', 'jobs_r_us.db');
const SCHEMA_PATH = path.join(process.cwd(), 'lib', 'db', 'schema.sql');

const db = new Database(DB_PATH);

db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);

export default db;
