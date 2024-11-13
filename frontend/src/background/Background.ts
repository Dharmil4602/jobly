// Scrapping the data from the source

let jobData: any = null
let ports: chrome.runtime.Port[] = [];

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "jobly-port") {
      // Add the new port to our list of ports
      ports.push(port);
      
      // Handle port disconnection
      port.onDisconnect.addListener(() => {
        ports = ports.filter(p => p !== port);
      });
  
      // If we have job data when a new connection is made, send it immediately
      if (jobData) {
        port.postMessage({ type: "jobDataUpdated", jobData });
      }
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.jobDetails) {
      jobData = request.jobDetails;
      
      // Broadcast to all connected ports
      ports.forEach(port => {
        try {
          port.postMessage({ type: "jobDataUpdated", jobData });
        } catch (error) {
          console.error("Error sending message to port:", error);
          // Remove disconnected port
          ports = ports.filter(p => p !== port);
        }
      });
      
      sendResponse({ response: "Message received successfully" });
    }
    return true;
  });

console.log("This is Background.ts, Scrapping the data from the source");
export {};