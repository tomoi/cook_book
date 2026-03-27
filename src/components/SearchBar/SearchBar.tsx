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
        <div className="search_bar">
            {isFocused ? (
                <div>
                    <form>
                        <input
                            className="search_input"
                            autoFocus
                            type="search"
                            value={searchValue}
                            onChange={(event) => {
                                setSearchValue(event.target.value);
                            }}
                            // onBlur={() => setIsFocused(false)}
                        />
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
                <input
                    type="image"
                    src="/assets/search_icon.svg"
                    onClick={() => setIsFocused(!isFocused)}
                />
            )}
        </div>
    );
}
