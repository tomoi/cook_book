'use client';

import { useState } from 'react';
import useSearch from '@/app/hooks/useSearch';
import Link from 'next/link';

interface Recipe {
    id: number;
    title: string;
}

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const searchResults = useSearch(searchValue);

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                    }}
                />
                {/* <input type="submit" value="Search" /> */}
            </form>
            <ul>
                {searchResults ? (
                    searchResults.map((result: Recipe) => {
                        return (
                            <li key={result.id}>
                                <Link
                                    href={`http://localhost:3000/recipe/${result.id}`}
                                >
                                    {result.title}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <p>No results</p>
                )}
            </ul>
        </div>
    );
}
