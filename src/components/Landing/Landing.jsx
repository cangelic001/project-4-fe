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
            <span className="fw-bold mentai-text display-3">Mentai</span> 
            <span className="fw-bold nori-text display-3">-</span>  
            <span className="fw-bold salmon-text display-3">Log</span>
          </h1>
          
          <h6 className="" style={{ color: "#fcdb7f" }}>Your thoughts deserve a home — start journalling today! <br />Capture your dreams, untangle your emotions, and discover the power of your own voice</h6>
          
          <div className="mt-1" style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="warning" className="mt-1 w-90 fw-bold text-white">
                <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}>
                    New? Start Logging Now
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






