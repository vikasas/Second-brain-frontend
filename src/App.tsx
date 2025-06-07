import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Toaster } from "react-hot-toast";
import { Sharedhome } from "./components/Sharedhome";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/:sharelink" element={<Sharedhome />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
