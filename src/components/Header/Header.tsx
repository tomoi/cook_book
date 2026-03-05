import UserDropdown from '../userDropdown/UserDropdown';

import Link from 'next/link';

export default function Header() {
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
                    <li></li>
                    <li></li>
                </ul>
            </nav>
            <UserDropdown />
        </div>
    );
}
