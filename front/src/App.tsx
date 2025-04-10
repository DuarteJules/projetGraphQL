import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import React from "react";
import Home from "./pages/Home/Home.tsx";
import Header from "./components/header/Header";
import SignIn from "@/pages/signIn/SignIn.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";


const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
        <Toaster/>
    </Router>
  );
};

export default App;
