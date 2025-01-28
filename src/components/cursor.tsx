import { Dispatch, SetStateAction } from "react"

interface Props {
  x: number,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
}

export function Cursor({ x, setIsDragging, setIsPlaying }: Props) {
  
  
  return (
    <div 
      onMouseDown={() =>  {
        setIsDragging(true)
        setIsPlaying(false)
      }
    }
      className="absolute z-20 flex justify-center left-0 top-0 w-0.5 h-full bg-red-600"
      style={{ transform: `translateX(${x}px)` }}
    >
      <div 
        style={{ clipPath: 'polygon(50% 0%, 0% 110%, 100% 110%)' }}
        className="w-2 h-1 bg-red-600 absolute bottom-0"
      />
    </div>
  )
}