import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux'
// import { signInSuccess } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import googleIcon from '~/assets/google-icon.svg'

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log('first', result)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      })
      const data = await res.json()
      // dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('Could not sign in with google', error)
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
