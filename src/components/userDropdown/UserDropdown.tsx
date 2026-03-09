'use client';

// import { auth } from '@/utils/auth';
// import { redirect } from 'next/navigation';
// import { headers } from 'next/headers';

import { signOutAction } from '@/app/actions/auth';
import Link from 'next/link';

export default function UserDropdown({ session }: { session: any }) {
    if (!session) {
        return <Link href="/signin">Sign In</Link>;
    } else {
        return (
            <div>
                <p>Welcome, {session?.user.name}!</p>
                <button onClick={signOutAction}>Sign Out</button>
            </div>
        );
    }
}
