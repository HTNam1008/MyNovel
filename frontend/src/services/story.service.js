    import { useEffect, useState } from 'react';

    function useStoryFetching(url) {
        const [dataStory, setData] = useState([]);
        const [loadingStory, setLoading] = useState(true);

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


        return { dataStory, loadingStory };
    }

    export default useStoryFetching;


