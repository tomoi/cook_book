'use client';

import { useState, useEffect, Suspense } from 'react';

interface Recipe {
    id: number;
    title: string;
}

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<Recipe[]>();

    useEffect(() => {
        console.log(searchValue);
        //search after a short delay to prevent too many api calls and prevent needing to press the search button
        if (searchValue) {
            const searchDelay = setTimeout(async () => {
                console.log(`Searched ${searchValue}`);

                try {
                    const response = await fetch(
                        `http://localhost:3000/api/search/${searchValue}`
                    );
                    const data = await response.json();
                    setSearchResults(data);
                    console.log(data);
                } catch (error: any) {
                    console.error(error.message);
                }
            }, 1500);

            return () => clearTimeout(searchDelay);
        }
    }, [searchValue]);

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
                <input type="submit" value="Search" />
            </form>
            <ul>
                {searchResults ? (
                    searchResults.map((result) => {
                        return (
                            <div key={result.id}>
                                <p>{result.title}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>No results</p>
                )}
            </ul>
        </div>
    );
}
