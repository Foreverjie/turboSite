import { useState } from 'react'
import { put } from 'utils/upload'

export default function Upload() {
  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(
    undefined,
  )

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setImage(i)
    }
  }

  const uploadToServer = async () => {
    const res = await put(image)
    console.log(res)
    setCreateObjectURL(res)
  }

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  )
}
