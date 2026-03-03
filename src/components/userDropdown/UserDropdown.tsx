'use server';

import { getUserSession } from '@/app/actions/auth';
import Link from 'next/link';

export default async function UserDropdown() {
    const userSession = await getUserSession();
    if (userSession !== null) {
        return <p>Welcome, {userSession?.user.name}!</p>;
    }
    return <Link href="/signin">Sign In</Link>;
}
