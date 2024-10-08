import { type ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { fetchPostListSearch, useAppDispatch } from '~/redux/search/searchSlice'

const Search = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState<string>('')
  const handleSearchPost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchData)
    const searchQuery = urlParams.toString()
    if (searchData.trim()) {
      dispatch(fetchPostListSearch(searchData))
      navigate(`/tags?${searchQuery}`)
    }
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchData(searchTermFromUrl)
    }
  }, [location.search])

  return (
    <form className="flex h-12 items-center rounded-lg border-2 border-gray-primary bg-white">
      <Input
        type="text"
        placeholder="Tìm nhanh. VD: Vinhomes Cenntral Park"
        className="w-full border-none pr-24"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchData(e.target.value)
        }}
      />
      <Button
        variant="default"
        size="sm"
        onClick={handleSearchPost}
        className="absolute right-2 hover:bg-none"
      >
        Tìm kiếm
      </Button>
    </form>
  )
}

export default Search
