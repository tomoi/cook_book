'use client';

import { useState } from 'react';
import useSearch from '@/app/hooks/useSearch';
import Link from 'next/link';

interface Recipe {
    id: number;
    title: string;
}

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchResults = useSearch(searchValue);

    return (
        <div>
            {isFocused ? (
                <div>
                    <form>
                        <input
                            autoFocus
                            type="text"
                            value={searchValue}
                            onChange={(event) => {
                                setSearchValue(event.target.value);
                            }}
                            onBlur={() => setIsFocused(false)}
                        />

                        <input type="submit" value="Search" />
                    </form>
                    <ul>
                        {searchResults.searchResults ? (
                            searchResults.searchResults.map(
                                (result: Recipe) => {
                                    return (
                                        <li key={result.id}>
                                            <Link
                                                href={`http://localhost:3000/recipe/${result.id}`}
                                            >
                                                {result.title}
                                            </Link>
                                        </li>
                                    );
                                }
                            )
                        ) : (
                            <li>No results</li>
                        )}
                    </ul>
                    {searchResults.loading && <p>Loading...</p>}
                </div>
            ) : (
                <button onClick={() => setIsFocused(!isFocused)}>
                    Open SearchBar
                </button>
            )}
        </div>
    );
}
