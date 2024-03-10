import { v4 as uuidv4 } from 'uuid'

import uploadIcon from '~/assets/upload.svg'

interface ICardReportProps {
  title?: string
  datetime?: string
  content?: string
  attachments?: { file_url?: string; file_name?: string }[]
}
const CardReport = ({ title, datetime, content, attachments }: ICardReportProps) => {
  return (
    <div className="relative mb-10 w-full basis-1/2 rounded border-2 border-black bg-white p-4">
      <h2 className="mb-4 border-b border-gray-primary pb-4 text-xl font-bold not-italic leading-normal text-black">
        {title}
      </h2>
      <div className="mb-4 border-b border-gray-primary pb-4 text-base font-normal not-italic leading-6 text-black">
        {content}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-nowrap text-base font-medium not-italic leading-normal">ファイル名:</div>
        <div className="flex flex-col gap-y-1">
          {attachments?.map((attachment) => (
            <div className="flex items-center gap-x-5" key={uuidv4()}>
              <div className="line-clamp-1 lg:line-clamp-none">{attachment.file_name}</div>
              <a
                className="flex cursor-pointer items-center gap-2 rounded-sm border-2 border-black px-3 py-2"
                type="button"
                href={attachment.file_url}
              >
                <img src={uploadIcon} alt="uploadIcon" className="max-w-fit lg:max-w-full" />
                <span className="hidden text-base font-bold not-italic leading-normal text-black md:inline-block">
                  ダウンロードする
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-bl-0 absolute -left-[2px] -top-5 rounded-br-[5px] rounded-tl-[5px] rounded-tr-[5px] bg-black px-1 py-2 text-xs font-medium leading-normal text-white">
        {datetime}
      </div>
    </div>
  )
}

export default CardReport
