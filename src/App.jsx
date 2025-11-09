import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import ViewRewards from "./pages/ViewRewards";
import EditRewards from "./pages/EditRewards";
import History from "./pages/History";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";


export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="site-shell">
        <header className="topbar">
          <h1 className="brand">🌸 Star Tracker</h1>
          {user && (
            <nav className="nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/rewards" className="nav-link">View Rewards</Link>
              <Link to="/edit-rewards" className="nav-link">Edit Rewards</Link>
              <Link to="/add-member" className="nav-link">Add Member</Link>
              <Link to="/history" className="nav-link">History</Link>
              <button
                className="btn-ghost"
                onClick={() => auth.signOut()}
                style={{ marginLeft: "10px" }}
              >
                Logout
              </button>
            </nav>
          )}
        </header>

        <main className="main-area">
          {!user ? (
            <Login />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-member" element={<AddMember />} />
              <Route path="/rewards" element={<ViewRewards />} />
              <Route path="/edit-rewards" element={<EditRewards />} />
              <Route path="/history" element={<History />} />
            </Routes>
          )}
        </main>

        <footer className="footer">
          <small>Made with ❤️ for MxB</small>
        </footer>
      </div>
    </Router>
  );
}

