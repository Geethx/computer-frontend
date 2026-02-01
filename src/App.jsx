import { Route, Routes } from "react-router-dom"
import AdminPage from "./pages/admin.jsx"
import HomePage from "./pages/home.jsx"
import LoginPage from "./pages/login.jsx"
import Test from "./components/test.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className="w-full h-screen bg-primary text-secondary">
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/admin/*" element={<AdminPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />}/>

      </Routes>
    </div>
  )
}

export default App
