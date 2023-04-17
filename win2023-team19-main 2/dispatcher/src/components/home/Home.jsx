import React from "react";
import '../commonCSS.css';
import { Link } from 'react-router-dom';
import Header from '../header/header.jsx';

function Home() {
    return (
        <div className="container">
            <Header title={"Home"}/>
            <ul>
                <div className="rowContainer"> <Link to={"/drivers"} className="linkButton"> Drivers </Link> </div>
                <div className="rowContainer"> <Link to={"/rides"} className="linkButton"> In-Progress Rides </Link> </div>
                <div className="rowContainer"> <Link to={"/queue"} className="linkButton"> In Queue </Link> </div>
            </ul>
        </div>
    );
}


export default Home;