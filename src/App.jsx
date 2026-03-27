import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PostList from './components/PostList'
import Footer from './components/Footer'
import { usePosts } from './hooks/usePosts'

export default function App() {
  const { meta, posts, query, setQuery, flaggedOnly, setFlaggedOnly, loading } = usePosts()

  return (
    <div className="min-h-screen bg-[#0e1621] flex flex-col max-w-2xl mx-auto">
      <Header meta={meta} />
      <SearchBar
        query={query}
        setQuery={setQuery}
        keywords={meta?.keywords}
        flaggedOnly={flaggedOnly}
        setFlaggedOnly={setFlaggedOnly}
        resultCount={posts.length}
      />
      <PostList posts={posts} loading={loading} />
      <Footer />
    </div>
  )
}
