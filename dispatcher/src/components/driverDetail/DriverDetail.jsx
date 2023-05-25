import React from 'react';
import { useParams } from 'react-router-dom';
import '../commonDetailCSS.css';
import axios from 'axios';
import Header from '../header/header.jsx';

class DriverDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            driverDetails: []
        };
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    getDriverDetails() {
        let url = 'http://localhost:3001/get_driver_info'
        axios.post(url, { sunet: this.props.params.driverId }).then(
            (res) => {
                this.setState({ driverDetails: res.data });
            }
        ).catch(
            console.error
        )
    }

    render() {
        return (
            <div className="detail">
                <Header title={"Driver Detail"} backLink={"/drivers"}/>
                <ul>
                    {this.state.driverDetails.map((detail) => (
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
                            <span className="label">RIDER SUNETID:</span>
                            <span className="value">{detail.rider_sunet}</span>
                        </li>
                    </React.Fragment>
                    ))}
                </ul>
            </div>
        );
    }
}

export default (props) => (
    <DriverDetail
        {...props}
        params={useParams()}
    />
);
