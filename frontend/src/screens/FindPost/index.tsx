import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardEstate from '~/components/Cards/CardEstate'

import Loading from '~/components/Loading'
import Search from '~/components/Search'
import { type RootState } from '~/redux/store'

const FindPost = () => {
  const listPostData = useSelector((state: RootState) => state.searchReducer)

  return (
    <div className="p-10">
      {listPostData.isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-full border-spacing-6 overflow-hidden rounded-lg border">
            <Search />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {listPostData.results.map((item, index) => (
              <Link to={`/post-detail/${item._id}`} className="p-2" key={index}>
                <CardEstate
                  imageUrls={item.imageUrls}
                  name={item.name}
                  price={item.price}
                  area={item.area}
                  street={item.street}
                  updatedAt={item.updatedAt}
                  unit={item.unit}
                  save={item.save}
                  isOpen
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

export default FindPost
