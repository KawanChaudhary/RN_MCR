import {useEffect, useRef, useState} from 'react';

function usePagination(fetchCb, limit = 10, initialSkip = 0) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadMoreThrottle = useRef(null);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const skip = page * limit;
      const {items, total} = await fetchCb({limit, skip});
      if (Array.isArray(items)) {
        setData(prev => [...prev, ...items]);
        setPage(prev => prev + 1);
        setTotal(total);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = () => {
    loadMore();
  };

  useEffect(() => {
    if (!loadMoreThrottle.current) {
      loadMoreThrottle.current = setTimeout(() => {
        loadMoreThrottle.current = null;
      }, 1000);
      loadMore();
    }
  }, []);

  return {data, loading, total, page, onEndReached};
}

export default usePagination;
