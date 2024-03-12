import {type PlasmoMessaging, sendToBackground} from "@plasmohq/messaging";
import RECORDING_DOCUMENT_PATH from "url:recording_screen.html";

const startRecordingHandler: PlasmoMessaging.MessageHandler =() => {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, async function (tabs) {
    // Get current tab to focus on it after start recording on recording screen tab
    const currentTab = tabs[0];

    // Create recording screen tab
    const tab = await chrome.tabs.create({
      url: RECORDING_DOCUMENT_PATH,
      pinned: true,
      active: true,
    });

    // Wait for recording screen tab to be loaded and send message to it with the currentTab
    chrome.tabs.onUpdated.addListener(async function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);

        await sendToBackground({
          name: 'start-recording',
          body: {
            currentTab: currentTab,
          },
        })
      }
    });
  });
}

export default startRecordingHandler;