import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../commonCSS.css';
import '../commonDetailCSS.css';
import axios from 'axios';
import Header from '../header/header.jsx';

class QueueDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            riderDetails: [],
            rider_sunet: this.props.params.riderId
        };
    }


    componentDidMount() {
        this.setState({ rider_sunet: this.props.params.riderId })
        this.getQueueDetails(this.rider_sunet);
    }

    getQueueDetails(sunetid) {
        let url = 'http://localhost:3001/get_ride_info'
        axios.post(url, { sunet: this.props.params.riderId }).then(
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
                <Header title={"Queue Detail"} backLink={"/queue"}/>
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
                                <span className="value">{detail.driver ? detail.driver : "NONE"}</span>
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
                    <Link to={"/queue/assign/" + this.props.params.riderId} className="linkButton" style={{marginTop: "20px"}}> Assign </Link>
                </ul>
            </div>
        );
    }
}


export default (props) => (
    <QueueDetail
        {...props}
        params={useParams()}
    />
);
