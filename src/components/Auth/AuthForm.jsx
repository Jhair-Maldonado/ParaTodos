import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

// Formulario compartido por "Iniciar sesión" y "Crear cuenta" (antes eran dos copias).
// Errores anunciados al lector de pantalla, campos marcados como inválidos y ayuda visible antes del error.
const AuthForm = ({ title, subtitle, fields, submitLabel, onSubmit, footer }) => {
  const [values, setValues] = useState(Object.fromEntries(fields.map((f) => [f.id, ''])));
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const summaryRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    fields.forEach((f) => {
      const v = values[f.id].trim();
      if (!v) found[f.id] = `Escribe tu ${f.label.toLowerCase()}.`;
      else if (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) found[f.id] = 'El correo debe tener el formato nombre@correo.com.';
      else if (f.type === 'password' && v.length < 6) found[f.id] = 'La contraseña debe tener al menos 6 caracteres.';
    });
    setErrors(found);
    if (Object.keys(found).length) {
      setTimeout(() => document.getElementById(Object.keys(found)[0])?.focus(), 30);
      return;
    }
    onSubmit(values);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-premium border-2 border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-text mb-2">{title}</h1>
          <p className="text-textMuted">{subtitle}</p>
        </div>

        {errorCount > 0 && (
          <div ref={summaryRef} role="alert" className="bg-error/10 border-l-4 border-error p-4 mb-6 rounded-r-lg flex gap-2">
            <AlertCircle className="w-6 h-6 text-error shrink-0" aria-hidden="true" />
            <p className="text-error font-bold">Revisa {errorCount === 1 ? 'el campo marcado' : `los ${errorCount} campos marcados`}.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {fields.map((f) => {
            const isPassword = f.type === 'password';
            const describedBy = [f.hint && `${f.id}-hint`, errors[f.id] && `${f.id}-error`].filter(Boolean).join(' ') || undefined;
            return (
              <div key={f.id}>
                <label className="block text-text font-bold mb-2" htmlFor={f.id}>{f.label}</label>
                {f.hint && <p id={`${f.id}-hint`} className="text-sm text-textMuted mb-2">{f.hint}</p>}
                <div className="relative">
                  <input
                    id={f.id}
                    type={isPassword && showPassword ? 'text' : f.type}
                    autoComplete={f.autoComplete}
                    value={values[f.id]}
                    onChange={(e) => setValues((p) => ({ ...p, [f.id]: e.target.value }))}
                    aria-invalid={!!errors[f.id]}
                    aria-describedby={describedBy}
                    aria-required="true"
                    className={`w-full bg-background border-2 p-4 rounded-xl text-text ${isPassword ? 'pr-28' : ''} ${errors[f.id] ? 'border-error' : 'border-borderStrong'}`}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] px-3 rounded-lg font-bold text-primary flex items-center gap-1 hover:bg-surfaceHover"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  )}
                </div>
                {errors[f.id] && (
                  <p id={`${f.id}-error`} className="text-error font-bold mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" aria-hidden="true" /> {errors[f.id]}
                  </p>
                )}
              </div>
            );
          })}

          <button type="submit" className="w-full bg-primary text-onPrimary py-4 rounded-xl font-bold text-lg hover:bg-primaryHover shadow-lg">
            {submitLabel}
          </button>
        </form>

        <p className="text-center mt-8 text-textMuted">
          {footer.text}{' '}
          <Link to={footer.to} className="text-primary font-bold underline underline-offset-4">{footer.link}</Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
