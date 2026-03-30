'use server';

import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import UserDropdown from '../userDropdown/UserDropdown';

import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import MobileNav from '../MobileNav/MobileNav';

export default async function Header() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <header>
            <div id="desktop_header">
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
                        <li>
                            <UserDropdown session={session} />
                        </li>
                    </ul>
                </nav>
                <h2>Cook Book</h2>

                <SearchBar />
            </div>
            <div id="mobile_header">
                <MobileNav />
                <h2>Cook Book</h2>
                {/* <UserDropdown session={session} /> */}
                <SearchBar />
            </div>
        </header>
    );
}
