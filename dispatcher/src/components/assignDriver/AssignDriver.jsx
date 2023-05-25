import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../commonCSS.css';
import Header from '../header/header.jsx';
import axios from 'axios';

class AssignDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drivers: []
        };
    }

    componentDidMount() {
        this.getDrivers();
    }

    assign(riderId, driver) {
        let url = 'http://localhost:3001/driver_assigned'
        axios.post(url, {
            driver: driver["sunetid"],
            sunet: riderId
        }).then(
            (res) => console.log(res.data)
        ).catch(
            console.error
        )
    }

    getDrivers() {
        let url = 'http://localhost:3001/get_drivers'
        axios.get(url).then((res) => {
            let drivers = [];
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i]["rider_sunet"] === "NONE") {
                    drivers.push(res.data[i]);
                }
            }
            this.setState({ drivers: drivers }); 
        })
    }

    render() {
        return (
            <div className="container">
                <Header title={"Assign " + this.props.params.riderId + " to"} backLink = {"/queue/" + this.props.params.riderId}/>
                <ul>
                    {this.state.drivers.map((driver) => (
                        driver["rider_sunet"] === "NONE" &&
                         <div key={driver.sunetid} className="rowContainer"><Link to={"/rides"} key={driver["sunetid"]} onClick={() => this.assign(this.props.params.riderId, driver)} className="linkButton"> {driver["name"]} </Link></div>
                    ))}
                </ul>
                {(this.state.drivers.length === 0) && <h1 className="defaultMessage">No Drivers Available</h1>}
            </div>
        );
    }
}

export default (props) => (
    <AssignDriver
        {...props}
        params={useParams()}
    />
);
