import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Contacts from "@/components/pages/Contacts";
import DealPipeline from "@/components/pages/DealPipeline";
import Calendar from "@/components/pages/Calendar";
import Leaderboard from "@/components/pages/Leaderboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="pipeline" element={<DealPipeline />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-progress"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;