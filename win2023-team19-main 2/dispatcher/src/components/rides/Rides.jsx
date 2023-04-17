import '../commonCSS.css';
import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../modal/Modal';
import Header from '../header/header.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Rides extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: [],
            show: false, 
            driverButton: undefined,
            riderButton: undefined,
            driverNameButton: undefined, 
            modalText: "",
            modalType: "",
        };
    }  

    getRides() {
        let url = 'http://localhost:3001/get_drivers'
        axios.get(url).then(
            (res) => {
                const drivers = res.data;
                if (drivers.length > 0) {
                    drivers.sort((a, b) => a.sunetid.localeCompare(b.sunetid));
                }
                this.setState({ 
                    drivers: drivers
                });
            }
        ).catch(
            console.error
        )
    }
    
    componentDidMount() {
        this.getRides();
    }


    toggleModal(driverSunetid, riderSunetid, driverName, text, type) {
        this.setState({ 
            show: !this.state.show,
            driverButton: driverSunetid, 
            riderButton: riderSunetid,
            driverNameButton: driverName, 
            modalText: text, 
            modalType: type
        })
    }

    render() {
        return (
            <div className="container">
                <Header title={"In-Progress Rides"} backLink="/"/>
                <ul>
                    {this.state.drivers.map((driver) => (
                        <div key={driver.sunetid} className="rowContainer">
                            <Link to={"/rides/" + driver['sunetid']} key={driver['name'] + "link"} className="linkButton"> 
                                <div className ="userInfoContainer"> 
                                <div className ="userInfo"> <i className="fa-solid fa-car"></i> &nbsp; {driver['name']} </div> 
                                <div className ="userInfo"><i className="fa-solid fa-user"></i> &nbsp; {driver['rider_sunet']} </div> 
                                </div> 
                            </Link>
                            <button onClick={() => driver['rider_sunet'] !== 'NONE' && this.toggleModal(driver['sunetid'], driver['rider_sunet'], driver['name'], "Has "+driver['name']+" arrived?", "inProgress")} key={driver + "button2"} className={`smallButton ${driver['rider_sunet'] === 'NONE' ? 'grayButton' : ''}`}> <i className="fa-solid fa-location-dot"></i> </button>
                            <button onClick={() => driver['rider_sunet'] !== 'NONE' && this.toggleModal(driver['sunetid'], driver['rider_sunet'], driver['name'], "Confirm "+driver['name']+"'s drop off?", "completed")} key={driver + "button"} className={`smallButton ${driver['rider_sunet'] === 'NONE' ? 'grayButton' : ''}`}> <i className="fas fa-check"></i> </button>
                        </div>
                    ))}
                </ul>
                {this.state.show ? <Modal closeModal={this.toggleModal.bind(this)} driverSunetid={this.state.driverButton} riderSunetid={this.state.riderButton} driverName={this.state.driverNameButton} text={this.state.modalText} type={this.state.modalType}/> : null}
            </div>
        );
    }

}

export default Rides;
