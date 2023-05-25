import React from "react";
import '../commonCSS.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/header.jsx';

class Queue extends React.Component {
    constructor(props) {
        console.log("QUEUE PROOF OF CONCEPT")
        super(props);
        this.state = {
            drivers: []
        };
    }

    componentDidMount() {
        this.getQueue();
    }

    getQueue() {
        let url = 'http://localhost:3001/get_unassigned_rides'
        axios.get(url).then(
            (res) => {
                this.setState({ drivers: res.data });
            }
        ).catch(
            console.error
        )
    }

    render() {
        return (
            <div className="container">
                <Header title={"Queue"} backLink="/"/>
                <ul>
                    {this.state.drivers.map((driver) => (
                        <div className="rowContainer" key={driver.sunetid}> <Link to={"/queue/" + driver["sunetid"]} key={driver["name"]} className="linkButton"> {driver["name"]} </Link> </div>
                    ))}
                </ul>
                {(this.state.drivers.length === 0) && <h1 className="defaultMessage">No Riders in the Queue</h1>}
            </div>
        );
    }

}

export default Queue;
