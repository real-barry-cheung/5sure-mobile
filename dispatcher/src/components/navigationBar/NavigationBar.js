import { React } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {
  return (
    <>
      <div className="navigationBar">
        <ul className="ulclass">
            <li>
                <Link to="/">
                <span>Home</span>
                </Link>
            </li>
            <li>
                <Link to="/drivers">
                <span>Drivers</span>
                </Link>
            </li>
            <li>
                <Link to="/rides">
                <span>In-Progress Rides</span>
                </Link>
            </li>
            <li>
                <Link to="/queue">
                <span>In Queue</span>
                </Link>
            </li>
        </ul>
      </div>
    </>
  );
}
