'use client';

import { useState, useEffect } from 'react';

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    //search after a short delay to prevent too many api calls and prevent needing to press the search button
    useEffect(() => {
        const searchDelay = setTimeout(() => {
            console.log(`Searched ${searchValue}`);
            (async () => {
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
                // results = await getBungieId(search);
                // setSearchResults(results);
            })();
        }, 1500);

        return () => clearTimeout(searchDelay);
    }, [searchValue]);
    return (
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
    );
}
