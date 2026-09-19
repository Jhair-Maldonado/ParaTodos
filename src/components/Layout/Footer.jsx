
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
              Style<span className="text-secondary">Accesible</span>
            </Link>
            <p className="mt-4 text-textMuted leading-relaxed">
              Moda para todos. Diseñamos experiencias de compra sin barreras, 
              con herramientas integradas para daltónicos y personas con dificultades visuales.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Comprar</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Hombre</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Mujer</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Accesorios</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Novedades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Asistencia</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Guía de tallas</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Envíos y devoluciones</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Centro de ayuda</Link></li>
              <li><Link to="#" className="text-textMuted hover:text-primary transition-colors focus:ring-2 focus:ring-primary rounded">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Accesibilidad</h4>
            <p className="text-textMuted mb-4">
              Usa nuestro menú flotante para ajustar los colores y contraste de la página.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold" aria-hidden="true">A</span>
              <span className="text-sm font-medium">Cumplimiento WCAG 2.1 AA</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-textMuted text-sm">
          <p>&copy; {new Date().getFullYear()} StyleAccesible. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
