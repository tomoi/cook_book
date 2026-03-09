'use server';

import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import UserDropdown from '../userDropdown/UserDropdown';

import Link from 'next/link';

export default async function Header() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/recipeinput">Recipe Form</Link>
                    </li>
                    <li>
                        <Link href="/search">Search</Link>
                    </li>
                    <li></li>
                </ul>
            </nav>
            <UserDropdown session={session} />
        </div>
    );
}
