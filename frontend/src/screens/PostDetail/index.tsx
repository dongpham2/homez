import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { type RootState } from '~/redux/store'
import { fetchDetailPost, useAppDispatch } from '~/screens/Home/homeSlice'

const PostDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const detailPost = useSelector((state: RootState) => state.homeReducer)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDetailPost(id!))
      } catch (error) {
        throw new Error()
      }
    }

    if (id) {
      fetchData()
    }
  }, [id, dispatch])
  return <div>PostDetail</div>
}

export default PostDetail
