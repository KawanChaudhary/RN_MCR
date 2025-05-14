import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchComments } from './fetchComments';

export default function usePagination(limit = 10) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const throttleRef = useRef(null);

  const skip = page * limit;

  const loadMore = useCallback(async () => {
    if (loading || (total && items.length >= total)) return;

    setLoading(true);
    try {
      const { comments, total: newTotal } = await fetchComments({ limit, skip });
      setItems(prev => [...prev, ...comments]);
      setTotal(prev => prev || newTotal);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit, skip, loading, items.length, total]);

  useEffect(() => {
    loadMore();
    return () => {
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, []);

  const onEndReached = () => {
    if (throttleRef.current) return;

    throttleRef.current = setTimeout(() => {
      throttleRef.current = null;
    }, 1000);
    loadMore();
  };

  return {
    items,
    loading,
    total,
    onEndReached,
  };
}
