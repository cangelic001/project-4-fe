import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
            <Col md={6}>
                <h1 className="text-center mb-4 mentai-text">Sign Up</h1>
                {message && <Alert variant="info">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" className="mb-3 nori-text">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            name="username"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3 nori-text">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="confirm" className="mb-4 nori-text">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm your password"
                            value={passwordConf}
                            name="passwordConf"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button 
                            variant="warning" 
                            type="submit" 
                            disabled={isFormInvalid()}
                            className="text-white"
                        >
                            Sign Up
                        </Button>
                        <Button 
                            variant="outline-warning" 
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
    </>
  );
};

export default SignUpForm;
