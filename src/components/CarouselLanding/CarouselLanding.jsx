import Carousel from 'react-bootstrap/Carousel';
import './CarouselLanding.css';
import Chartpic from '../../assets/Charts.png';
import Createpic from '../../assets/CreateLog.png';
import Viewpic from '../../assets/ViewLogs.png';

function CarouselLanding() {

    const textData = [
        {
          text: "Jot down your thoughts",
          image: Createpic
        },
        {
          text: "Reflect on your journey",
          image: Viewpic
        },
        {
          text: "Chart your vibes",
          image: Chartpic
        }
      ];

    return (
        <>
            <Carousel className="carousel-container text-center p-4">
                {textData.map((info, index) => (
                    <Carousel.Item key={index}>
                        <div className="carousel-box">
                            <h4 style={{ color: "#ff94a6" }} className="fw-bold">{info.text}</h4>
                            <img src={info.image} alt={info.text} className="carousel-image" />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default CarouselLanding;