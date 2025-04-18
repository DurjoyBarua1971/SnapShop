import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth-context";
import Navbar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
