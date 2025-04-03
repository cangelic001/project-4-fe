import { Link } from "react-router-dom";
import CarouselLanding from "../CarouselLanding/CarouselLanding";
import Button from "react-bootstrap/Button";
import "./Landing.css";
import cupPhoto from "../../assets/coffee-cup-blue-background.jpg"

const Landing = () => {
  return (
    <div className="landing-container">
      <img src={cupPhoto} alt="Landing" className="landing-image" />
      
      <div className="landing-content">

        <h1 className="fw-bold mb-1"> 
          <span className="fw-bold cobalt">CodeBrew.edu</span>
        </h1>

        <h4 className="fw-bold mb-1"> 
          <span className="fw-bold cobalt">Tutor Platform</span>
        </h4>
        
        <h6 className="" style={{ color: "gray" }}>Brewing tomorrow's tech talent, today.</h6>
        
        <div className="mt-1" style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
          <Button className="landing-button mt-1 text-white">
            <Link to="/sign-up">New Tutor? Sign Up</Link>
          </Button>
        </div>

        <CarouselLanding className="carou-container"/>
      </div>
    </div>
  );
};

export default Landing;







