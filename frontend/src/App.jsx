import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Hero, Navbar, NewItineraryForm, LoginRegistrationCard, About, StarsCanvas, TripRoutes, PDFViewer } from './components'
import Album from "./components/Album";
import NewMapView from "./components/NewMapView";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        {/* Background image section */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>

        {/* Background color section (below the image) */}
        <div className="bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <div className="relative z-0">
                    <Hero />
                    <StarsCanvas />
                  </div>
                  <About/>
                </div>
              } 
            />
            <Route path="/itinerary" element={<NewItineraryForm />} />
            <Route path="/auth" element={<LoginRegistrationCard />} />
            <Route path="/album" element={<Album />} />
            <Route path="/routes" element={<TripRoutes />} />
            <Route path="/map" element={<NewMapView/>} />
            <Route path="/pdf" element={<PDFViewer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App
