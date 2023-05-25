import React from "react";
import "./Modal.css";
import axios from 'axios';


class Modal extends React.Component {

  completeRide(rider, driver) {
    let url = 'http://localhost:3001/ride_status_update'
    let status = (this.props.type === "completed" ? "COMPLETED" : "IN PROGRESS");
    axios.post(url, {
        rider_sunetid: rider,
        driver_sunetid: driver,
        status: status
    }).then(
        (res) => {
          this.props.closeModal();
          let url = "/rides";
          window.location.href = url;
        }
    ).catch(
        console.error
    )
  }

    render() {
    return (
      <div className="modalBackground">
        <div className="blurBackground"> 
          <div className="modalContainer">
            <button onClick={this.props.closeModal} id="closeX"><i className="fas fa-times"></i></button>
            <div className="control">
              <h2> {this.props.text}</h2> 
              <button onClick={() => this.completeRide(this.props.riderSunetid, this.props.driverSunetid)} className="button"> Yes </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;