import './Footer.css';
import softUni from '../images/softuni.png';
import vsc from '../images/vsc.png';
import firebase from '../images/firebase.png';
import react from '../images/react.png';

function Footer() {
  return (
    <div className="wrapper">
      <div className="footer">
        <div>
          <h4>
            Fuel Tracker - we care about our customers, their trips and
            expences.
          </h4>
        </div>
        <div className="footer-images">
          <h4>Powered By:</h4>
          <img alt="SoftUni" src={softUni} />
          <img alt="React" src={react} />
          <img alt="Firebase" src={firebase} />
          <img alt="Visual Studio Code" src={vsc} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
