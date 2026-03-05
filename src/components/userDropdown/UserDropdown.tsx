'use server';

import { getUserSession, signOutAction } from '@/app/actions/auth';
import Link from 'next/link';

export default async function UserDropdown() {
    const userSession = await getUserSession();
    if (userSession !== null) {
        console.log(userSession);
        return (
            <div>
                <p>Welcome, {userSession?.user.name}!</p>
                <button onClick={signOutAction}>Sign Out</button>
            </div>
        );
    }
    console.log(userSession);
    return <Link href="/signin">Sign In</Link>;
}
