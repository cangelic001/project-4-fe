import Carousel from 'react-bootstrap/Carousel';
import './CarouselLanding.css';
import Chartpic from '../../assets/Charts.png';
import Createpic from '../../assets/CreateLog.png';
import Viewpic from '../../assets/ViewLogs.png';

function CarouselLanding() {

    const textData = [
        {
          text: "Every Bug Fixed is a Student’s Confidence Gained—Keep Inspiring!",
          image: Createpic
        },
        {
          text: "You’re Not Just Teaching Code, You’re Shaping Problem-Solvers!",
          image: Viewpic
        },
        {
          text: "From Hello World to Full-Stack Mastery—Your Guidance Makes It Possible!",
          image: Chartpic
        }
      ];

    return (
        <>
            <Carousel className="carousel-container text-center p-4">
                {textData.map((info, index) => (
                    <Carousel.Item key={index}>
                        <div className="carousel-box">
                            <h5 className="fw-bold cobalt">{info.text}</h5>
                            <img src={info.image} alt={info.text} className="carousel-image" />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default CarouselLanding;