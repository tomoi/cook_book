import { useState, useEffect } from 'react';

interface Recipe {
    id: number;
    title: string;
}

//custom hook to search the database for recipes.
//parameter is the value the user wants to search
//returns results, loading
export default function useSearch(searchValue: string) {
    const [searchResults, setSearchResults] = useState<Recipe[] | undefined>(
        undefined
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //search after a short delay to prevent too many api calls and prevent needing to press the search button

        if (searchValue) {
            setLoading(true);

            const searchDelay = setTimeout(async () => {
                try {
                    const response = await fetch(
                        `http://localhost:3000/api/search/${searchValue}`
                    );
                    const data = await response.json();
                    setSearchResults(await data);
                    setLoading(false);
                    console.log(data);
                } catch (error: any) {
                    console.error(error.message);
                }
            }, 600);

            return () => clearTimeout(searchDelay);
        } else {
            setLoading(false);
        }
    }, [searchValue]);

    return { searchResults, loading };
}
