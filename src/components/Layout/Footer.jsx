
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
              ParaTodos
            </Link>
            <p className="mt-4 text-textMuted leading-relaxed">
              ParaTodos. Diseñamos experiencias de compra sin barreras, 
              con herramientas integradas para daltónicos y personas con dificultades visuales.
            </p>
          </div>
          
          <div>
            <h2 className="font-bold text-lg mb-4">Comprar</h2>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-textMuted hover:text-primary underline-offset-4 hover:underline">Ver catálogo</Link></li>
              <li><Link to="/checkout" className="text-textMuted hover:text-primary underline-offset-4 hover:underline">Ir al pago</Link></li>
              <li><Link to="/about" className="text-textMuted hover:text-primary underline-offset-4 hover:underline">Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Ayuda</h2>
            <p className="text-textMuted">
              Usa el botón «Guía» (abajo a la derecha) para ver paso a paso cómo comprar.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Accesibilidad</h2>
            <p className="text-textMuted mb-4">
              Usa el botón «Accesibilidad» (abajo a la izquierda) para agrandar el texto, cambiar el contraste o ajustar los colores.
            </p>
            <p className="text-sm font-medium mt-4">Diseñado siguiendo las pautas WCAG 2.1 nivel AA.</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-textMuted text-sm">
          <p>&copy; {new Date().getFullYear()} ParaTodos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
