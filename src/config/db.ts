import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

export const db = pgp(process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/auth_db');
