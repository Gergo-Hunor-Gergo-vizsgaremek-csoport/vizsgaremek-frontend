/*import React, { useState } from 'react';

export const FilterModal: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetchResults = async () => {
        setLoading(true);

        // 1. Dinamikusan beimportáljuk a modult (csak amikor a gombra kattintanak!)
        const { getFilteredResults } = await import('./filterServices');

        // 2. Meghívjuk az importált modul függvényét, és megvárjuk az eredményt
        const data = await getFilteredResults('electronics', 500);

        setResults(data);
        setLoading(false);
    };
}*/