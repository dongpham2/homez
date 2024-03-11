import personalIcon from '~/assets/personal-infor-icon.svg'
import userIcon from '~/assets/user-icon.svg'

const userOptionChoices = [
  {
    icon: personalIcon,
    title: 'Quản lý tin đăng',
  },
  {
    icon: userIcon,
    title: 'Thông tin cá nhân',
  },
  {
    icon: userIcon,
    title: 'Thay đổi mật khẩu',
  },
]

const UserOptions = () => {
  return (
    <div className="auto-auto box-shadow-0 text-gray-color animation-toggleOptions-0.3s ease transition-all-0.3s ease will-change-opacity opacity transition-mr-10 absolute inset-auto z-50 m-0 -mb-32 flex min-w-[220px] translate-x-[-10px] translate-y-[58.8px] transform transform overflow-hidden rounded-10 bg-white p-9 px-4 py-4">
      <ul className="flex flex-col gap-4">
        {userOptionChoices.map((item, index) => (
          <li className="flex cursor-pointer items-center gap-3" key={index}>
            <img src={item.icon} alt="icon" className="h-5 w-5" />
            <div className="font-normal">{item.title}</div>
          </li>
        ))}
        <div className="flex cursor-pointer items-center gap-3">Đăng xuất</div>
      </ul>
    </div>
  )
}

export default UserOptions
