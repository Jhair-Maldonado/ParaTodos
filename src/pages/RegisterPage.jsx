import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthForm from '../components/Auth/AuthForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <AuthForm
      title="Crea tu cuenta"
      subtitle="No es obligatoria para comprar: sirve para guardar tus datos y preferencias."
      submitLabel="Crear cuenta"
      fields={[
        { id: 'name', label: 'Nombre', type: 'text', autoComplete: 'name' },
        { id: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email' },
        { id: 'password', label: 'Contraseña', type: 'password', autoComplete: 'new-password', hint: 'Mínimo 6 caracteres.' },
      ]}
      onSubmit={({ name, email }) => { login(email, name); navigate('/'); }}
      footer={{ text: '¿Ya tienes una cuenta?', link: 'Inicia sesión', to: '/login' }}
    />
  );
};

export default RegisterPage;
