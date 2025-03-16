import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuestionnairesFilters } from "@/lib/types/getQuestionnairesFilters";

interface UseInfiniteScrollProps<T> {
  queryKey: string | any[];
  queryFn: (filters: any) => Promise<any>;
  select: (data: any) => T[];
  initialFilters: any;
  pageSize: number;
}

export function useInfiniteScroll<T>({
  queryKey,
  queryFn,
  select,
  initialFilters,
  pageSize,
}: UseInfiniteScrollProps<T>) {
  const [filters, setFilters] = useState<QuestionnairesFilters>({
    ...initialFilters,
    page: 1,
    pageSize,
  });
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => queryFn(filters),
    select,
  });

  useEffect(() => {
    if (!data) return;

    if (filters.page === 1) {
      setItems(data);
    } else {
      setItems((prev) => [...prev, ...data]);
    }
    setHasMore(data.length === filters.pageSize);
  }, [data, filters.page, filters.pageSize]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isFetching) {
        setFilters((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    },
    [hasMore, isFetching]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const moveItems = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const newOrder = [...prev];
      const [movedItem] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedItem);
      return newOrder;
    });
  }, []);

  return {
    filters,
    setFilters,
    items,
    hasMore,
    isFetching,
    loadMoreRef,
    moveItems,
  };
}
