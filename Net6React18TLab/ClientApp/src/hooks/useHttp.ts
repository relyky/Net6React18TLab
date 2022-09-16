import { useState, useEffect, useCallback, useMemo, useDebugValue } from 'react'
import { useAppDispatch } from 'store/hooks'
import { setBlocking } from 'store/metaDataSlice'

///## post data with JSON only.
///# ref→[Using Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
export function postData(url: string, data?: object) {
  const authToken = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string)

  const headers = {
    'Content-Type': 'application/json'
  }

  if (authToken != null)
    headers['Authorization'] = `Bearer ${authToken}`

  return fetch(url, {
    headers,
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'omit',
    method: 'POST',
    referrer: 'no-referrer',
  }).then(resp => {
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
    return resp.json()
  })
}

//============================================================================
type DataType = object[] | object | null

interface PostDataOptions {
  initData?: DataType,
  immediately?: boolean,
}

const defaultOption: PostDataOptions = {
  initData: [],
  immediately: false,
};

/// 載入資料
export function usePostData(url: string, args?: object, option?: PostDataOptions)
  : [data: DataType, loading: boolean, error: Error | null, refetch: () => void] {
  const attrs = useMemo<PostDataOptions>(() => ({ ...defaultOption, ...option }), [option])
  const [data, setData] = useState<DataType>(attrs.initData as DataType)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const dispatch = useAppDispatch();

  const refetch = useCallback(() => {
    setLoading(true)
    dispatch(setBlocking(true))
    postData(url, args)
      .then(data => {
        console.info('usePostData OK', { data })
        setData(data)
        setError(null)
      })
      .catch((error) => {
        console.error('usePostData FAIL', { error })
        setData(attrs.initData as DataType)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
        dispatch(setBlocking(false))
      })
  }, [attrs.initData, url, args, dispatch
  ])

  //# DidMount
  useEffect(() => {
    if (attrs.immediately) refetch();
  }, [attrs.immediately, refetch]);

  useDebugValue({ option: attrs, data, loading, error })
  return [data, loading, error, refetch];
}

/// 載入資料：只在初始化執行一次。設計用於載入基本資料。
export function useLoad(url: string, args?: object, initData: DataType = [])
  : [data: DataType, loading: boolean, error: Error | null] {
  const [data, setData] = useState<DataType>(initData)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useState(() => {
    setLoading(true)
    postData(url, args)
      .then(data => {
        console.info('useLoad OK', { data })
        setData(data)
        setError(null)
      })
      .catch((error) => {
        console.error('useLoad FAIL', { error })
        setData(initData)
        setError(error)
      })
      .finally(() => setLoading(false))
  })

  useDebugValue({ data, loading, error })
  return [data, loading, error];
}