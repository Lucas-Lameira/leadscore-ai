import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LeadDetail from "./pages/LeadDetail";
import NewAnalysis from "./pages/NewAnalysis";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/analyze" element={<NewAnalysis />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
