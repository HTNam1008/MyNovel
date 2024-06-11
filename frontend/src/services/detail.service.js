import { useEffect, useState } from 'react';

function useDetailFetching(url) {
    const [dataDetail, setData] = useState([]);
    const [loadingDetail, setLoading] = useState(true);

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


    return { dataDetail, loadingDetail };
}

export default useDetailFetching;


