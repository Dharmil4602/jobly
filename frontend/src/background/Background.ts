// // Scrapping the data from the source

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received: ", request);
    sendResponse({ response: "Message received successfully" });
    return true;
  });

console.log("This is Background.ts, Scrapping the data from the source");
export {};