export default function Header({ meta }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="sticky top-0 z-10 bg-[#17212b] border-b border-[#0e1621] px-4 py-2 sm:py-3">
      <button onClick={scrollToTop} className="flex items-center gap-3 w-full text-left cursor-pointer">
        {/* Avatar */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5288c1] flex items-center justify-center text-white font-bold text-sm sm:text-lg shrink-0">
          M
        </div>
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-semibold text-white truncate">
            mehowz | ZenonOrg
          </h1>
          <p className="text-[10px] sm:text-xs text-[#6d8ba4]">
            {meta
              ? `${meta.total_messages} messages \u00b7 ${meta.flagged_groups} flagged`
              : 'Loading...'
            }
            {' '}&middot; @{meta?.channel || 'zenonnetwork'}
          </p>
        </div>
      </button>
      <p className="hidden sm:block text-[10px] text-[#6d8ba4] mt-2 text-left leading-snug">
        Complete archive of messages from {meta?.user?.display_name || 'mehowz'} in the Zenon Network Telegram channel.
        Flagged posts contain toxic, aggressive, or threatening language. All messages link to their original source.
      </p>
    </div>
  )
}
