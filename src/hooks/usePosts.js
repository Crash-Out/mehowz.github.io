import { useState, useEffect, useMemo } from 'react'

export function usePosts() {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const [flaggedOnly, setFlaggedOnly] = useState(false)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'posts.json')
      .then(r => r.json())
      .then(setData)
  }, [])

  const filtered = useMemo(() => {
    if (!data) return []
    let groups = [...data.posts].reverse()
    if (flaggedOnly) {
      groups = groups.filter(g => g.flagged)
    }
    if (!query.trim()) return groups
    const q = query.toLowerCase()
    return groups.filter(g =>
      g.messages.some(m => m.content.toLowerCase().includes(q))
    )
  }, [data, query, flaggedOnly])

  return { meta: data?.meta, posts: filtered, query, setQuery, flaggedOnly, setFlaggedOnly, loading: !data }
}
