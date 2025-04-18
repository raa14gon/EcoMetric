import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import  { Calculator }  from "../pages/Calculator";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}