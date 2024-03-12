import { useState } from "react"
import {sendToBackground} from "@plasmohq/messaging";

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <button onClick={() => {
        sendToBackground({ name: 'create-recording-tab'})
        // chrome.runtime.sendMessage({ name: 'create-recording-tab' });
      }}>
        Record
      </button>
    </div>
  )
}

export default IndexPopup
