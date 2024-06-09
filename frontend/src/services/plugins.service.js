import { useEffect, useState } from 'react';

function usePluginsFetching(url) {
    const [dataPlugins, setData] = useState([]);
    const [loadingPlugins, setLoading] = useState(true);

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
    console.log(dataPlugins)

    return { dataPlugins, loadingPlugins };
}

export default usePluginsFetching;


