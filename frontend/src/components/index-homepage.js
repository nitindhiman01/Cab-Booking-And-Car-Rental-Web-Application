import React from 'react';
import ResponsiveAppBar from "./navbar";
import Footer from "./footer";
import "../stylesheets/index.css";
import Homepage from "./homepage";

function IndexHomePage(){
    return(
        <div>
            <ResponsiveAppBar />
            <Homepage />
            <div style={{height: "600px"}}></div>
            <Footer />
        </div>
    );
}

export default IndexHomePage;