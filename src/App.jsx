import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import ViewRewards from "./pages/ViewRewards";
import EditRewards from "./pages/EditRewards";
import History from "./pages/History";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="site-shell">
        <header className="topbar">
          <h1 className="brand">🌸 Star Tracker</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/rewards" className="nav-link">View Rewards</Link>
            <Link to="/edit-rewards" className="nav-link">Edit Rewards</Link>
            <Link to="/add-member" className="nav-link">Add Member</Link>
            <Link to="/history" className="nav-link">History</Link>
          </nav>
        </header>

        <main className="main-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/rewards" element={<ViewRewards />} />
            <Route path="/edit-rewards" element={<EditRewards />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        <footer className="footer">
          <small>Made with ❤️ for MxB</small>
        </footer>
      </div>
    </Router>
  );
}
