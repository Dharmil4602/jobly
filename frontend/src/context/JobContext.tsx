// src/context/JobContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface JobContextType {
    jobData: any;
    setJobData: (data: any) => void;
  }

export const JobContext = createContext<JobContextType>({
    jobData: null,
    setJobData: () => {},
  });

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobData, setJobData] = useState(null);
  const [port, setPort] = useState<chrome.runtime.Port | null>(null)

useEffect(() => {
    let port: chrome.runtime.Port | null = null;

    const connectPort = () => {
      // Create a new port connection
      port = chrome.runtime.connect({ name: "jobly-port" });

      // Set up message listener
      port.onMessage.addListener((message) => {
        if (message.type === "jobDataUpdated") {
          setJobData(message.jobData);
        }
      });

      // Handle disconnection
      port.onDisconnect.addListener(() => {
        console.log("Port disconnected, attempting to reconnect...");
        // Remove old port
        port = null;
        // Reconnect after a short delay
        setTimeout(connectPort, 1000);
      });
    };

    // Initial connection
    connectPort();

    // Cleanup function
    return () => {
      if (port) {
        port.disconnect();
      }
    };
  }, []);

  return (
    <JobContext.Provider value={{ jobData, setJobData  }}>
      {children}
    </JobContext.Provider>
  );
};
