import React from 'react';
import { useParams } from 'react-router-dom';
import '../commonCSS.css';
import '../commonDetailCSS.css';
import axios from 'axios';
import Header from '../header/header.jsx';

class RiderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            riderDetails: []
        };
    }

    componentDidMount() {
        this.getRiderSunet();
    }

    getRiderSunet() {
        let url = 'http://localhost:3001/get_driver_info'
        axios.post(url, { sunet: this.props.params.driverId }).then(
            (res) => {
                if (res.data[0]["rider_sunet"] !== null) {
                    this.getRiderDetails(res.data[0]["rider_sunet"]);
                }
            }
        ).catch(
            console.error
        )
    }

    getRiderDetails(sunetid) {
        let url = 'http://localhost:3001/get_ride_info'
        axios.post(url, { sunet: sunetid }).then(
            (res) => {
                this.setState({ riderDetails: res.data });
            }
        ).catch(
            console.error
        )
    }

    render() {
        return (
            <div className="detail">
                <Header title={"Ride Detail"} backLink={"/rides"}/>
                <ul>
                    {this.state.riderDetails.map((detail) => (
                        <React.Fragment key={detail.SUNETID}>
                        <li>
                            <span className="label">Name:</span>
                            <span className="value">{detail.name}</span>
                        </li>
                        <li>
                            <span className="label">SUNETID:</span>
                            <span className="value">{detail.sunetid}</span>
                        </li>
                        <li>
                            <span className="label">Phone Number:</span>
                            <span className="value">{detail.phonenumber}</span>
                        </li>
                        <li>
                            <span className="label">Start:</span>
                            <span className="value">{detail.start}</span>
                        </li>
                        <li>
                            <span className="label">Destination:</span>
                            <span className="value">{detail.destination}</span>
                        </li>
                        <li>
                            <span className="label">Status:</span>
                            <span className="value">{detail.status}</span>
                        </li>
                        <li>
                            <span className="label">Driver:</span>
                            <span className="value">{detail.driver}</span>
                        </li>
                        <li>
                            <span className="label">Rider Password:</span>
                            <span className="value">{detail.rider_password}</span>
                        </li>
                        <li>
                            <span className="label">Number of Passengers:</span>
                            <span className="value">{detail.num_passengers}</span>
                        </li>
                        <li>
                            <span className="label">ETA (minutes):</span>
                            <span className="value">{detail.eta_minutes}</span>
                        </li>
                        </React.Fragment>
                    ))}
                </ul>
                {(this.state.riderDetails.length === 0) && <h1 className="defaultMessage">No Rider Assigned</h1>}
            </div>
        );
    }
}

export default (props) => (
    <RiderDetail
        {...props}
        params={useParams()}
    />
);
