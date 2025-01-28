import { MouseEvent, useLayoutEffect, useRef, useState } from "react";
import { bars } from "./constants/bars";
import { Cursor } from "./components/cursor";
import { PlayPauseButton } from "./components/play-pause-button";

function App() {
  const [isPlaying, setIsPlaying] = useState(false) ;
  const [isDragging, setIsDragging] = useState(false) ;

  const [x, setX] = useState(0) ;

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerBoundingClientRect, setContainerBoundingClientRect] = useState({ x: 0, right: 0 })

  function handleMouseMove(e: MouseEvent) {
    if(!isDragging) return 

    if(e.clientX < containerBoundingClientRect.x) return 
    if(e.clientX > containerBoundingClientRect.right) return

    setX(e.clientX - containerBoundingClientRect.x) ;
  }

  requestAnimationFrame(() => {
    if(!isPlaying) return  ;

    // 142 = 144px (container width) - 2px (cursor width) 
    if(x >= 142) {
      setTimeout(() => {
        setIsPlaying(false)
        setX(0)
      }, 500);

      return
    }
    
    setX(x + 1)
  })

  useLayoutEffect(() => {
    if(!containerRef.current) return

    const node = containerRef.current

    const { x, right } = node.getBoundingClientRect()
            
    setContainerBoundingClientRect({ x, right })
  }, [])

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)} 
      className="w-full h-dvh flex justify-center items-center"
    >
      <section
        className="h-16 p-1 flex items-center w-52 bg-gray-500 rounded-xl shadow-lg shadow-black/20"
      >
        <div className="flex-grow h-full flex items-center justify-center">
          <div
            style={{ boxShadow: 'inset 0px 0px 10px black' }}  
            className="h-11 w-11 p-0.5 bg-gray-800 rounded-full"
          >
            <PlayPauseButton
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying} 
            />
          </div>
        </div>
        <div
          ref={containerRef}
          className="h-12 relative w-36 bg-gray-700 overflow-hidden rounded-lg"
        >
          <Cursor
            x={x}
            setIsPlaying={setIsPlaying}
            setIsDragging={setIsDragging} 
          />
          <div className="w-full py-3 h-full flex justify-between">
            {bars.map(( {index, scaleY} ) => (
              <div
                key={index} 
                className="w-px bg-gray-500 h-full rounded-full box"
                style={{ transform: `scaleY(${scaleY})` }} 
              />
            ))}
          </div>
          <div 
            style={{ clipPath: `inset(0px ${144 - x}px 0px 0px)` }}
            className="absolute inset-0 w-full py-3 h-full flex justify-between"
          >
            {bars.map(( {index, scaleY} ) => (
              <div
                key={index} 
                className="w-px bg-white h-full rounded-full box"
                style={{ transform: `scaleY(${scaleY})` }} 
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

export default App
