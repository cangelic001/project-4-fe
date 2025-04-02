import { Card } from "react-bootstrap";
import "./CardBasic.css"

const CardBasic = ({ title, text }) => {
    return (
        <Card border="light" style={{ height: "300px" , color:"#ffa50a"}}>
            <Card.Body className="card-carousel-body">
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardBasic;