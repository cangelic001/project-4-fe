import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import { Form, Button, Alert } from 'react-bootstrap';
import LoadingSpinner from './Spinner';
import './SignInForm.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsSigningIn(true);
    setLoading(true);
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
      setLoading(false);
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="text-center mb-4">Sign In</h1>
        {message && <Alert variant="info">{message}</Alert>}
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          {isSigningIn && (
            <div className="spinner-container">
              <LoadingSpinner />
            </div>
          )}

          <div className="d-flex justify-content-between">
            <Button className="text-white" variant="primary" type="submit" disabled={loading}>
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button variant="outline-primary" onClick={() => navigate('/')} disabled={loading}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
