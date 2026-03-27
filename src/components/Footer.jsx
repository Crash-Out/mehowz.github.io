export default function Footer() {
  return (
    <div className="bg-[#17212b] border-t border-[#0e1621] px-4 py-3 text-center">
      <p className="text-xs text-[#6d8ba4]">
        Found a toxic post that's missing?{' '}
        <a
          href="https://github.com/Crash-Out/mehowz.github.io/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5288c1] hover:underline"
        >
          Submit a PR
        </a>
        {' '}&middot;{' '}
        <a
          href="https://github.com/Crash-Out/mehowz.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5288c1] hover:underline"
        >
          GitHub
        </a>
      </p>
    </div>
  )
}
