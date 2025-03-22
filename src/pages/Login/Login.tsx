import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Intentando iniciar sesión con:', email);
  };

  return (
    <div className="login-container">
      
      <div className="login-content">
        <div className="image-container">
          {/* Espacio para la imagen del jugador de fútbol */}
          <div className="player-image-placeholder"></div>
        </div>
        
        <div className="login-form-container">
          <div className="login-form-title">
            <h2>INICIAR SESION</h2>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Usuario</label>
              <input
                type="email"
                id="email"
                placeholder="Escribeaquí@tucorreo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="forgot-password">
              <a href="/recuperar">Olvido Su Contraseña?</a>
            </div>
            
            <div className="login-actions">
              <button type="submit" className="login-button">Iniciar</button>
              <button type="button" className="register-button" onClick={() => window.location.href = '/registro'}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;