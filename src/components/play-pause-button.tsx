import { Dispatch, SetStateAction } from "react"

interface Props {
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export function PlayPauseButton({ isPlaying, setIsPlaying }: Props) {
  return (
    <div
      onClick={() => setIsPlaying(!isPlaying)}
      style={{ boxShadow: 'inset 0px 0px 2px rgba(255, 255, 255, 0.2)' }}
      className="h-full w-full bg-gray-600 rounded-full flex items-center justify-center gap-0.5 cursor-pointer active:scale-95 duration-100 ease-in-out"
    >
      {isPlaying ?
        (
          <>
            <div className="w-0.5 h-3 rounded-[0.3px] bg-white" />
            <div className="w-0.5 h-3 rounded-[0.3px] bg-white" />
          </>
        )
        :
        (
          <div 
            style={{ clipPath: 'polygon(50% 20%, 0% 100%, 100% 100%)' }} 
            className="w-3 h-3 bg-white rotate-90 translate-x-0.5" 
          />
        )
      }
    </div>
  )
}