import { useState, useCallback } from 'react';

// 定义返回类型
type UseRequestResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  run: (...args: any[]) => Promise<void>; // 触发请求函数
};

/**
 * 封装异步请求自定义hook
 * @param apiFunc 异步请求函数（返回Promise）
 */
export function useRequest<T>(apiFunc: (...args: any[]) => Promise<T>): UseRequestResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // useCallback 缓存，防止组件重复渲染函数重建
  const run = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFunc(...args);
      setData(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return {
    data,
    loading,
    error,
    run
  };
}
