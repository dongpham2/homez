import { bouncy } from 'ldrs'

const Loading = () => {
  bouncy.register()
  return (
    <div className="fixed inset-0 z-50">
      <div className="h-full w-full bg-black opacity-70" />
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <l-bouncy size="50" speed="1.75" color="#f9ae49" />
      </div>
    </div>
  )
}

export default Loading
