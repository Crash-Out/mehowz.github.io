export default function Header({ meta }) {
  return (
    <div className="sticky top-0 z-10 bg-[#17212b] border-b border-[#0e1621] px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#5288c1] flex items-center justify-center text-white font-bold text-lg shrink-0">
          M
        </div>
        <div className="text-left min-w-0">
          <h1 className="text-base font-semibold text-white truncate">
            mehowz | ZenonOrg
          </h1>
          <p className="text-xs text-[#6d8ba4]">
            {meta
              ? `${meta.total_messages} messages \u00b7 ${meta.flagged_groups} flagged`
              : 'Loading...'
            }
            {' '}&middot; @{meta?.channel || 'zenonnetwork'}
          </p>
        </div>
      </div>
      <p className="text-[10px] text-[#6d8ba4] mt-2 text-left leading-snug">
        Complete archive of messages from {meta?.user?.display_name || 'mehowz'} in the Zenon Network Telegram channel.
        Flagged posts contain toxic, aggressive, or threatening language. All messages link to their original source.
      </p>
    </div>
  )
}
