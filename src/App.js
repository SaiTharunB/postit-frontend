import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import NoPageFound from "./Components/NoPageFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<NoPageFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
