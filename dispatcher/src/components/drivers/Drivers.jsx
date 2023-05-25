import '../commonCSS.css';
import { Link } from 'react-router-dom';
import React from "react";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../header/header.jsx';

class Drivers extends React.Component {
    constructor(props) {
        console.log("DRIVERS PROOF OF CONCEPT")
        super(props);
        this.state = {
            drivers: []
        };
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers() {
        let url = 'http://localhost:3001/get_drivers'
        axios.get(url).then(
            (res) => {
                this.setState({ drivers: res.data });
            }
        ).catch(
            console.error
        )
    }



    toggleActive(driver) {
        console.log(driver)
    }


    render() {
        return (
            <div className="container">
                <Header title={"Drivers"} backLink="/"/>
                <ul>
                {this.state.drivers.map((driver) => (
                    <div className="rowContainer" key={driver["sunet"]}>
                        <Link to={"/drivers/" + driver["sunetid"]} key={driver["name"]+"link"} className="linkButton"> {driver["name"]} </Link>
                        <button onClick={() => this.toggleActive(driver["sunet"])} key={driver["name"]+"button"} className="smallButton"> <i className="fas fa-minus"></i> </button>
                    </div>
                    ))}
                </ul>
                {(this.state.drivers.length === 0) && <h1 className="defaultMessage">No Drivers On Shift</h1>}
            </div>
        );
    }
}

export default Drivers;
