import { useEffect, useState, useRef, useCallback } from 'react'
import PostCard from './PostCard'

const PAGE_SIZE = 30

export default function PostList({ posts, loading }) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  // Reset visible count when posts change (search/filter)
  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [posts])

  // Scroll to post if URL has a #post-{id} hash
  useEffect(() => {
    if (!loading && posts.length > 0 && window.location.hash) {
      const targetId = window.location.hash.replace('#post-', '')

      // Find the group - could be the group ID or a message ID within a group
      let idx = posts.findIndex(g => String(g.id) === targetId)
      if (idx < 0) {
        idx = posts.findIndex(g => g.messages.some(m => String(m.id) === targetId))
      }

      if (idx >= 0 && idx >= visible) {
        setVisible(idx + PAGE_SIZE)
      }

      // Use the group's anchor element (always the group ID)
      const anchorId = idx >= 0 ? `post-${posts[idx].id}` : window.location.hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(anchorId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }, [loading, posts.length])

  // IntersectionObserver to load more when sentinel is visible
  const observerRef = useRef(null)
  const sentinelCallback = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(v => Math.min(v + PAGE_SIZE, posts.length))
      }
    }, { rootMargin: '400px' })
    if (node) observerRef.current.observe(node)
  }, [posts.length])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#6d8ba4] text-sm">
        Loading messages...
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#6d8ba4] text-sm py-12">
        No messages found.
      </div>
    )
  }

  const shown = posts.slice(0, visible)
  const hasMore = visible < posts.length

  return (
    <div className="flex-1 py-3">
      {shown.map(group => (
        <PostCard key={group.id} group={group} />
      ))}
      {hasMore && (
        <div ref={sentinelCallback} className="flex justify-center py-4 text-[#6d8ba4] text-xs">
          Loading more...
        </div>
      )}
    </div>
  )
}
