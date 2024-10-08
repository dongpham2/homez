import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CardReport from '~/components/Cards/CardReport'
import Loading from '~/components/Loading'
import Search from '~/components/Search'
import { type RootState } from '~/redux/store'
import { fetchPostLists, useAppDispatch } from '~/screens/Home/homeSlice'

const ListPosts = () => {
  const dispatch = useAppDispatch()
  const postListData = useSelector((state: RootState) => state.homeReducer)

  useEffect(() => {
    dispatch(fetchPostLists())
  }, [dispatch])
  
  return (
    <div className="p-10">
      {postListData.idLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-full border-spacing-6 overflow-hidden rounded-lg border">
            <Search />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {postListData?.postLists.map((item, index) => (
              <Link to={`/post-detail/${item._id}`} className="p-2" key={index}>
                <CardReport
                  imageUrls={item.imageUrls}
                  name={item.name}
                  price={item.price}
                  area={item.area}
                  street={item.street}
                  updatedAt={item.updatedAt}
                  unit={item.unit}
                  save={item.save}
                  isOpen
                  isOutStanding={false}
                  vote={false}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ListPosts
