import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Hero, Navbar, ItineraryForm, LoginRegistrationCard } from './components'

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/itinerary" element={<ItineraryForm />} />
          <Route path="/auth" element={<LoginRegistrationCard />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
