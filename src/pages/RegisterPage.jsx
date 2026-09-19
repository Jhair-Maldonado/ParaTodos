import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    
    // Mock registration & auto-login
    if (password.length >= 6) {
      login(email, name);
      navigate('/');
    } else {
      setError('La contraseña debe tener al menos 6 caracteres.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-premium border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-text mb-2">Crea tu cuenta</h1>
          <p className="text-textMuted">Únete a nosotros para una experiencia de compra accesible</p>
        </div>

        {error && (
          <div className="bg-error/10 border-l-4 border-error p-4 mb-6 rounded-r-lg">
            <p className="text-error font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text font-bold mb-2" htmlFor="name">
              Nombre Completo
            </label>
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
              placeholder="Tu Nombre"
              aria-required="true"
            />
          </div>

          <div>
            <label className="block text-text font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
              placeholder="tu@email.com"
              aria-required="true"
            />
          </div>

          <div>
            <label className="block text-text font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
              placeholder="••••••••"
              aria-required="true"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-all shadow-lg"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center mt-8 text-textMuted">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline focus:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
