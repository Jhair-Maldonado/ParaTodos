
import Header from './Header';
import Footer from './Footer';
import AccessibilityWidget from '../Accessibility/AccessibilityWidget';
import GuidedTour from '../Assistant/GuidedTour';
import CartDrawer from '../Cart/CartDrawer';
import { Outlet } from 'react-router-dom';
import useAccessibilityStore from '../../store/accessibilityStore';

const MainLayout = () => {
  const { colorBlindMode } = useAccessibilityStore();

  // El estilo inline evita problemas de resolución de URLs relativas del navegador
  // al usar filtros SVG (url(#id)) que a veces fallan cuando se hace desde index.css
  const filterStyle = colorBlindMode !== 'none' ? { filter: `url(#${colorBlindMode}-filter)` } : {};

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 
        Aplicamos el filtro al contenido principal (que fluye normalmente).
        Añadimos pt-20 para compensar el Header absoluto.
      */}
      <div style={filterStyle} className="flex-grow flex flex-col pt-20">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* 
        Los elementos fixed se envuelven en un contenedor "fixed" que cubre el viewport.
      */}
      <div 
        style={{ 
          ...filterStyle, 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 50 
        }}
      >
        {/* El contenedor interno NO debe tener width 100% ni height 100%, solo restablecer los pointer-events */}
        <div style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}><Header /></div>
          <div style={{ pointerEvents: 'auto' }}><AccessibilityWidget /></div>
          <div style={{ pointerEvents: 'auto' }}><GuidedTour /></div>
          <div style={{ pointerEvents: 'auto' }}><CartDrawer /></div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
