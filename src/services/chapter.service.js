import { useEffect, useState } from 'react';

function useChapterFetching(url) {
    const [dataChapters, setData] = useState([]);
    const [loadingChapters, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [url]);


    return { dataChapters, loadingChapters };
}

export default useChapterFetching;


