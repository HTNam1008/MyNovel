import { useState, useEffect } from 'react';

const useWebSocket = (url, interval = 5000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Fetch data immediately on mount

    const intervalId = setInterval(fetchData, interval); // Polling interval

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [url, interval]);

  return { data, loading, error };
};

export default useWebSocket;
