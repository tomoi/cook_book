'use server';

import { useSignedInStatus } from '@/app/hooks/_useSignedInStatus';
import Link from 'next/link';

export default async function UserDropdown() {
    const userSession = await useSignedInStatus();
    if (userSession !== null) {
        console.log(userSession);
        return <p>Welcome, {userSession.user.name}!</p>;
    }
    return <Link href="/signin">Sign In</Link>;
}
