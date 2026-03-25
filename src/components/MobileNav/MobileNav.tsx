'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileNav() {
    const [showNav, setShowNav] = useState(false);
    return (
        <nav>
            {showNav && (
                <div>
                    <input
                        type="image"
                        src="/assets/close_icon.svg"
                        onClick={() => setShowNav(false)}
                    />
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
                    </ul>
                </div>
            )}
            {!showNav && (
                <input
                    type="image"
                    src="/assets/menu_icon.svg"
                    onClick={() => setShowNav(true)}
                />
            )}
        </nav>
    );
}
