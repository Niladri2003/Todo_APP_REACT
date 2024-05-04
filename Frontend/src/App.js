import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
