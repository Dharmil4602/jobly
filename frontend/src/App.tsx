import JobDetails from "./components/jobDetails/JobDetails";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <div className="min-h-screen">
      <JobProvider>
        <JobDetails />
      </JobProvider>
    </div>
  );
}

export default App;
