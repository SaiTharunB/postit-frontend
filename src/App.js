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
          <Route path="/" element={<Home key="home"/>}></Route>
          <Route path="/signup" element={<SignUp key="signup"/>}></Route>
          <Route path="/post" element={<CreatePost key="cp"/>}></Route>
          <Route path="*" element={<NoPageFound key="np"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
