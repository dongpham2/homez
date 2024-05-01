import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CardReport from '~/components/Cards/CardReport'
import Search from '~/components/Search'
import { type RootState } from '~/redux/store'

const ListPosts = () => {
  const listPostData = useSelector((state: RootState) => state.searchReducer)
  return (
    <div className="p-10">
      <div className="relative w-full border-spacing-6 overflow-hidden rounded-lg border">
        <Search />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {listPostData.results.map((item, index) => (
          <Link to="" className="p-2" key={index}>
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
    </div>
  )
}

export default ListPosts
