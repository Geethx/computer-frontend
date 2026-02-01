import { useState } from "react";
import uploadFile from "../utils/media-upload";


export default function Test(){
  const [file, setFile] = useState(null);

  async function upload(){
    try {
          const url = await uploadFile(file)
          console.log(url)
    } catch{
      console.log("Upload Failed")
    }
  }
 

  return (
    <div className="w-full h-full bg-amber-500 flex flex-col justify-center items-center">
      <input type="file" onChange={(e) => {
        setFile(e.target.files[0])
      }} />

      <button onClick={upload} className="w-[200px] h-[50px] rounded-2xl text-2xl bg-blue-400">Upload</button>

    </div>
  )
}

