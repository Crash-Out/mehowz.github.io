import { useState, useCallback } from 'react'

export default function SearchBar({ query, setQuery, keywords, flaggedOnly, setFlaggedOnly, resultCount }) {
  const [input, setInput] = useState(query)

  const handleChange = useCallback((e) => {
    setInput(e.target.value)
    clearTimeout(window._searchTimeout)
    window._searchTimeout = setTimeout(() => setQuery(e.target.value), 150)
  }, [setQuery])

  const handleKeywordClick = useCallback((keyword) => {
    setInput(keyword)
    setQuery(keyword)
  }, [setQuery])

  const handleClear = useCallback(() => {
    setInput('')
    setQuery('')
  }, [setQuery])

  return (
    <div className="sticky top-[88px] z-10 bg-[#17212b] px-4 py-2 border-b border-[#0e1621]">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6d8ba4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Search messages..."
            className="w-full bg-[#242f3d] text-white text-sm rounded-lg pl-9 pr-8 py-2 placeholder-[#6d8ba4] outline-none focus:ring-1 focus:ring-[#5288c1]"
          />
          {input && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6d8ba4] hover:text-white text-lg leading-none"
            >
              &times;
            </button>
          )}
        </div>
        {/* Flagged toggle */}
        <button
          onClick={() => setFlaggedOnly(!flaggedOnly)}
          className={`text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
            flaggedOnly
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-[#242f3d] text-[#6d8ba4] hover:bg-[#2b3a4a] hover:text-white'
          }`}
        >
          Flagged only
        </button>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-[#6d8ba4]">
          {resultCount} message{resultCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Keyword chips */}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {keywords.map(k => (
            <button
              key={k}
              onClick={() => handleKeywordClick(k)}
              className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                input.toLowerCase() === k
                  ? 'bg-[#5288c1] text-white'
                  : 'bg-[#242f3d] text-[#6d8ba4] hover:bg-[#2b3a4a] hover:text-white'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
