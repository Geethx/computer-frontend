import { useState } from "react";

export default function Test(){
  const [count,setCount] = useState(0);
  const [status,setStatus] = useState("Sleeping");
  const [isVisible,setIsVisible] = useState(true);

  return (
    <div className="w-full h-full bg-amber-500 flex flex-col justify-center items-center">
      <h1>{isVisible}</h1>
      <button onClick={() => {
          setIsVisible(!isVisible)
        }}>{isVisible?"X":"O"}</button>
      {isVisible && <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center">
        
        <h1 className="text-[55px]">{count}</h1>

        <div className="w-full h-[50px] bg-sky-400 flex justify-center items-center gap-3">
        <button className="w-[100px] h-[45px] bg-red-800 text-white" onClick={() => setCount(count - 1)}>Decrement</button>
        <button className="w-[100px] h-[45px] bg-green-400 text-white" onClick={() => setCount(count + 1)}>Increment</button>
        </div>

        <h1 className="text-[55px]">{status}</h1>

        <div className="w-full h-[50px] bg-sky-400 flex justify-center items-center gap-3">
        <button className="w-[100px] h-[45px] bg-red-800 text-white" onClick={() => setStatus("Sleeping")}>Sleep</button>
        <button className="w-[100px] h-[45px] bg-green-400 text-white" onClick={() => setStatus("Awake")}>Awake</button>
        </div>

      </div>}
    </div>
  )
}

