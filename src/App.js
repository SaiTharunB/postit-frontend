import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home";
import CreatePost from './Components/CreatePost';
import SignUp from "./Components/SignUp";
import NoPageFound from "./Components/NoPageFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/post" element={<CreatePost/>}></Route>
          <Route path="*" element={<NoPageFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
