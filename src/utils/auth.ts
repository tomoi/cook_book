import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { Pool } from 'pg';

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: { 
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },
    plugins: [nextCookies()]
});
