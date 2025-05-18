import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook, FaHome } from 'react-icons/fa';
import './Login.css'; // We'll reuse the same styles
import { useSelector } from 'react-redux';

function SignUp() {
  const navigate = useNavigate();
  
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
  
    useEffect(() => {
      if (user && token) {
        navigate('/user');
      }
    }, [user, token, navigate]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/users/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.error || 'Email is already registered');
      }
    } catch (err) {
      setError('Server error. Please try again later.' + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="back-btn" type="button" onClick={() => navigate('/home')}>
          <FaHome style={{ marginRight: '0.5rem' }} /> Home
        </button>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join Eventer and start creating amazing events</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            {error && (
              <div style={{ color: 'red', marginTop: '0.5rem', fontSize: '0.95rem' }}>{error}</div>
            )}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="auth-button">Create Account</button>

          <div className="social-login">
            <p>Or sign up with</p>
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <FaGoogle /> Google
              </button>
              <button type="button" className="social-button facebook">
                <FaFacebook /> Facebook
              </button>
            </div>
          </div>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;