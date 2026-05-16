import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Routesfind from "./Routesfind"
import AddRoutes from "./AddRoutes"

const App = () => {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/routes" element={<Routesfind/>}/>
      <Route path="/add" element={<AddRoutes/>}/>
    </Routes>
  </BrowserRouter>
    
  </>
}

export default App