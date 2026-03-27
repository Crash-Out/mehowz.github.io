export default function ReplyPreview({ replyTo }) {
  if (!replyTo) return null

  const displayName = replyTo.first_name || replyTo.user_name || 'Unknown'
  const preview = replyTo.content.length > 150
    ? replyTo.content.slice(0, 150) + '...'
    : replyTo.content

  return (
    <a
      href={replyTo.telegram_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-1.5 no-underline"
    >
      <div className="border-l-2 border-[#6ab2f2] pl-2 py-0.5 rounded-r bg-white/5 hover:bg-white/10 transition-colors">
        <div className="text-[#6ab2f2] text-xs font-medium">
          {displayName}
        </div>
        <div className="text-[#8b9daf] text-xs leading-snug truncate">
          {preview}
        </div>
      </div>
    </a>
  )
}
