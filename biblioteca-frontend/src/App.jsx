import Navbar from './components/Navbar';
import Home from './pages/Home';
import CrearLibro from './pages/CrearLibro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
     <Router>
      <main className="font-serif min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crear" element={<CrearLibro />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
