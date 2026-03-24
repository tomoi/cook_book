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

    //if loading, show loading
    if (searchResults.loading) {
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
                <p>Loading...</p>
            </div>
        );
    }

    //if not loading, return normally
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
            </form>
            <ul>
                {/* If the user wrote anything in the text box, show results. otherwise prompt the user to write */}
                {searchValue !== '' &&
                    searchResults.searchResults?.map((result: Recipe) => {
                        return (
                            <li key={result.id}>
                                <Link
                                    href={`http://localhost:3000/recipe/${result.id}`}
                                >
                                    {result.title}
                                </Link>
                            </li>
                        );
                    })}
                {/* if the array is empty, display no results */}
                {searchResults.searchResults?.length == 0 && (
                    <li>No Results</li>
                )}
            </ul>
        </div>
    );
}
