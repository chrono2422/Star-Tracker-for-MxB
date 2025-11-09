import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import ViewRewards from "./pages/ViewRewards";
import EditRewards from "./pages/EditRewards";
import History from "./pages/History";
import Auth from "./pages/Auth";
import "./App.css";

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <Router>
      <div className="site-shell">
        <header className="topbar">
          <h1 className="brand">🌸 Star Tracker</h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/rewards">View Rewards</Link>
            <Link to="/edit-rewards">Edit Rewards</Link>
            <Link to="/add-member">Add Member</Link>
            <Link to="/history">History</Link>
          </nav>
        </header>

        <main className="main-area">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/add-member" element={<PrivateRoute><AddMember /></PrivateRoute>} />
            <Route path="/rewards" element={<PrivateRoute><ViewRewards /></PrivateRoute>} />
            <Route path="/edit-rewards" element={<PrivateRoute><EditRewards /></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          </Routes>
        </main>

        <footer className="footer">
          <small>Made with ❤️ for MxB</small>
        </footer>
      </div>
    </Router>
  );
}
