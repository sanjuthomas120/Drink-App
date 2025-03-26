import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
   <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Menu />} />
    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
