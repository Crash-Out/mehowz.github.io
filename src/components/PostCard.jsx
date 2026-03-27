import { useState } from 'react'
import ReplyPreview from './ReplyPreview'
import { highlightKeywords } from '../utils/highlightKeywords'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageBubble({ msg, isFirst, isLast, groupKeywords }) {
  const keywords = msg.keywords_matched.length > 0 ? msg.keywords_matched : groupKeywords

  return (
    <div className={`bg-[#182533] px-3 py-1.5 ${isFirst ? 'rounded-t-xl rounded-tr-xl rounded-tl-sm pt-2' : ''} ${isLast ? 'rounded-b-xl pb-2' : ''}`}>
      {/* Reply context */}
      {msg.reply_to && <ReplyPreview replyTo={msg.reply_to} />}

      {/* Message content */}
      <div className="text-sm text-white whitespace-pre-wrap break-words leading-relaxed">
        {highlightKeywords(msg.content, keywords)}
      </div>

      {/* Timestamp on last message, or if edited */}
      {isLast && (
        <div className="flex items-center justify-end gap-2 mt-1">
          {msg.edit_date && (
            <span className="text-[10px] text-[#6d8ba4] italic">edited</span>
          )}
          <span className="text-[10px] text-[#6d8ba4]">
            {formatDate(msg.date)}
          </span>
        </div>
      )}
    </div>
  )
}

export default function PostCard({ group }) {
  const [copied, setCopied] = useState(false)
  const permalink = `#post-${group.id}`
  const messages = group.messages

  const handleCopyLink = (e) => {
    e.preventDefault()
    const url = window.location.origin + window.location.pathname + permalink
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div id={`post-${group.id}`} className="flex items-start gap-2.5 mb-3 px-2 sm:px-4 scroll-mt-[100px] sm:scroll-mt-[140px]">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-[#5288c1] flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
        M
      </div>

      {/* Message group */}
      <div className="min-w-0 max-w-[85%] sm:max-w-[75%]">
        {/* Sender name */}
        <div className="bg-[#182533] rounded-t-xl rounded-tl-sm px-3 pt-2 pb-0">
          <div className="text-[#6ab2f2] text-[13px] font-medium">
            mehowz | ZenonOrg
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isFirst={false}
            isLast={i === messages.length - 1}
            groupKeywords={group.keywords_matched}
          />
        ))}

        {/* Group footer: flagged badge, permalink, telegram link */}
        <div className="flex items-center justify-end gap-2 mt-0.5">
          {group.flagged && (
            <span className="text-[10px] text-red-400/70 font-medium">flagged</span>
          )}
          {/* Permalink */}
          <a
            href={permalink}
            onClick={handleCopyLink}
            className="text-[#6d8ba4] hover:text-[#6ab2f2] transition-colors"
            title="Copy link to this post"
          >
            {copied ? (
              <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            )}
          </a>
          {/* Telegram link - goes to first message in group */}
          <a
            href={group.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6d8ba4] hover:text-[#6ab2f2] transition-colors"
            title="View on Telegram"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
