import { Link } from "react-router-dom"
import CarouselLanding from "../CarouselLanding/CarouselLanding";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const Landing = () => {
  return (
    <div>
      <Container>
    
        <div className="mt-3 text-center" style={{display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
          <h1 className="fw-bold mb-1"> 
            <span className="fw-bold cobalt">CodeBrew.io</span>
          </h1>
          <h4 className="fw-bold mb-1"> 
            <span className="fw-bold cobalt">Tutor Platform</span>
          </h4>
          <span>Brewing tomorrow's tech talent, today.</span>
          
          <h6 className="" style={{ color: "gray" }}></h6>
          
          <div className="mt-1" style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
            <Button className="mt-1 w-90 fw-bold text-white">
                <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}>
                    New Tutor? Sign Up
                </Link>
            </Button>
          </div>

          <CarouselLanding />

        </div>

      </ Container>
    </div>
  );
};

export default Landing;






