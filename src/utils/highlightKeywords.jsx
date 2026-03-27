import React from 'react'

export function highlightKeywords(text, keywords) {
  if (!keywords || keywords.length === 0) return text

  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

  const parts = text.split(pattern)
  return parts.map((part, i) => {
    if (pattern.test(part)) {
      pattern.lastIndex = 0
      return (
        <span key={i} className="bg-red-500/30 text-red-300 rounded px-0.5">
          {part}
        </span>
      )
    }
    return part
  })
}
