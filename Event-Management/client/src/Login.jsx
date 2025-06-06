import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (user && token) {
      navigate('/user');
    }
  }, [user, token, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/users/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setAuth({ token: data.token, user: data.user }));
        navigate('/user');
      } else {
        setError(data.error || 'Invalid email or password');
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
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Eventer</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
            <div className="input-icon" style={{ position: 'relative' }}>
              <FaLock />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888',
                  fontSize: '1.2rem',
                  padding: 0
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">Sign In</button>
          {error && (
            <div style={{ color: 'red', marginTop: '0.75rem', textAlign: 'center' }}>{error}</div>
          )}
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;