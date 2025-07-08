import React from 'react';
import './ourteam.css';
import ShreyasPhoto from './Shreyas.jpg'; 
import SanjitPhoto from "./Sanjit.jpg";
import SarangPhoto from "./Sarang.jpg";

function OurTeam() {
  return (
    <div className="team-container">
      <div className="team-member">
        <img src={ShreyasPhoto} alt="Shreyas" className="team-photo" />
        <p className="team-name">Shreyas</p>
      </div>
      <div className="team-member">
        <img src={SanjitPhoto} alt="Sanjit" className="team-photo" />
        <p className="team-name">Sanjit</p>
      </div>
      <div className="team-member">
        <img src={SarangPhoto} alt="Sarang" className="team-photo" />
        <p className="team-name">Sarang</p>
      </div>
    </div>
  );
}

export default OurTeam;
