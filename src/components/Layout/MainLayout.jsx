import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AccessibilityWidget from '../Accessibility/AccessibilityWidget';
import GuidedTour from '../Assistant/GuidedTour';
import CartDrawer from '../Cart/CartDrawer';
import useAccessibilityStore from '../../store/accessibilityStore';

const TITLES = {
  '/': 'Inicio', '/catalog': 'Catálogo', '/checkout': 'Pago', '/login': 'Iniciar sesión',
  '/register': 'Crear cuenta', '/about': 'Nosotros',
};

const MainLayout = () => {
  const { colorBlindMode } = useAccessibilityStore();
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const firstRender = useRef(true);

  // Al cambiar de página: título de pestaña, scroll arriba y foco al contenido
  // (antes el lector de pantalla no anunciaba el cambio y la página quedaba a media altura)
  useEffect(() => {
    const name = pathname.startsWith('/product/') ? 'Detalle de prenda' : TITLES[pathname] || 'Página no encontrada';
    document.title = `${name} | ParaTodos`;
    window.scrollTo(0, 0);
    if (firstRender.current) { firstRender.current = false; return; }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  // El filtro de color se aplica con estilo en línea (url(#id) falla desde index.css en algunos navegadores)
  const filterStyle = colorBlindMode !== 'none' ? { filter: `url(#${colorBlindMode}-filter)` } : {};

  return (
    <div className="min-h-screen flex flex-col relative">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>

      {/* El encabezado va primero en el orden del DOM: antes estaba al final y el teclado
          y el lector de pantalla recorrían toda la página antes de llegar al menú. */}
      <div style={filterStyle} className="flex-grow flex flex-col">
        <Header />
        <main id="contenido" ref={mainRef} tabIndex={-1} className="flex-grow pb-28 outline-none">
          <Outlet />
        </main>
        <Footer />
      </div>

      <div style={{ ...filterStyle, position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <div style={{ pointerEvents: 'auto' }}><AccessibilityWidget /></div>
        <div style={{ pointerEvents: 'auto' }}><GuidedTour /></div>
        <div style={{ pointerEvents: 'auto' }}><CartDrawer /></div>
      </div>
    </div>
  );
};

export default MainLayout;
