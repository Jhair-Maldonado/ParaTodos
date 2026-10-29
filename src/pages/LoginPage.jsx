import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthForm from '../components/Auth/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <AuthForm
      title="Bienvenido de vuelta"
      subtitle="Ingresa a tu cuenta para continuar comprando"
      submitLabel="Iniciar sesión"
      fields={[
        { id: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
        { id: 'password', label: 'Contraseña', type: 'password', autoComplete: 'current-password' },
      ]}
      onSubmit={({ email }) => { login(email, email.split('@')[0]); navigate('/'); }}
      footer={{ text: '¿No tienes una cuenta?', link: 'Regístrate aquí', to: '/register' }}
    />
  );
};

export default LoginPage;
