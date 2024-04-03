import React from "react";
import ResponsiveAppBar from "./components/navbar";
import Footer from "./components/footer";
import "./stylesheets/index.css";
import Homepage from "./components/homepage";

function App(){
  return(
    <div>
      <ResponsiveAppBar />
      <Homepage />
      <div style={{height: "600px"}}></div>
      <Footer />
    </div>
  );
}

export default App;
