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
    dispatch(fetchDetailPost(id!))
  }, [id, dispatch])
  return <div>PostDetail</div>
}

export default PostDetail
