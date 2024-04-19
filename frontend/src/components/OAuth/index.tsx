// import { signInSuccess } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import googleIcon from '~/assets/google-icon.svg'
import { Button } from '~/components/Button'
import { fetchSignIn, useAppDispatch } from '~/redux/user/userSlice'

import app from '~/firebase'

const OAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      })
      const data = await res.json()
      dispatch(fetchSignIn(data))
      navigate('/')
    } catch (error) {
      throw new Error()
    }
  }
  return (
    <Button
      className="mb-5 mt-10 flex items-center gap-4 bg-white px-28 py-4"
      onClick={handleGoogleClick}
      type="button"
    >
      <img src={googleIcon} alt="googleIcon" />
      Sign in with Google
    </Button>
  )
}

export default OAuth
