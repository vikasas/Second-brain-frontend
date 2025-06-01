import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./components/Home";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Toaster } from "react-hot-toast";
import { Sharedhome } from "./components/Sharedhome"

function App(){
  return(
    <BrowserRouter>
    <div><Toaster
  position="top-center"
  reverseOrder={false}
/></div>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="signin" element={<Signin/>} />
          <Route path="share" element={<Sharedhome/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;