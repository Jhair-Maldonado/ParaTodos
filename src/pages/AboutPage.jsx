import { Heart, Eye, Users, GraduationCap, Mic, Layout, Zap, ArrowRight, Accessibility } from 'lucide-react';
import useAccessibilityStore from '../store/accessibilityStore';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const { simplifiedMode, reducedMotion } = useAccessibilityStore();

  return (
    <div className="animate-fade-in pb-20">
      {/* Sección 1 — Encabezado */}
      <section className="bg-surface border-b border-border py-12 md:py-20 relative isolate overflow-hidden">
        {!simplifiedMode && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50" aria-hidden="true"></div>
        )}
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text mb-6">
            Moda accesible para todos
          </h1>
          <p className="text-xl text-textMuted leading-relaxed font-medium">
            ParaTodos es una propuesta de comercio electrónico inclusivo orientada a facilitar la compra de ropa para personas con distintas necesidades visuales y de interacción.
          </p>
        </div>
      </section>

      {/* Sección 2 — Nuestro propósito */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-sm text-center">
            <Heart className={`w-12 h-12 text-error mx-auto mb-6 ${!reducedMotion ? 'animate-bounce' : ''}`} aria-hidden="true" />
            <h2 className="text-3xl font-extrabold text-text mb-4">Nuestro propósito</h2>
            <p className="text-lg text-textMuted leading-relaxed">
              ParaTodos busca reducir barreras presentes en tiendas online tradicionales, facilitando la identificación de productos, colores, tallas y acciones durante el proceso de compra.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 3 — Accesibilidad */}
      <section className="py-12 md:py-16 bg-surface border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Accessibility className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold text-text mb-4">Accesibilidad integrada</h2>
            {!simplifiedMode && (
              <p className="text-lg text-textMuted max-w-2xl mx-auto">
                Implementamos herramientas diseñadas para adaptarse a tus preferencias visuales y cognitivas.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={Eye} title="Modos adaptados para daltonismo" desc="Filtros especializados." />
            <FeatureCard icon={Zap} title="Alto contraste" desc="Mejora la legibilidad." />
            <FeatureCard icon={Layout} title="Navegación simplificada" desc="Menos distracciones." />
            <FeatureCard icon={Mic} title="Búsqueda por voz" desc="Encuentra usando tu voz." />
          </div>
          
          {!simplifiedMode && (
            <div className="mt-8 text-center text-textMuted text-sm font-medium">
              * También incluye: Ajuste del tamaño del texto, movimiento reducido, asistencia guiada y descripciones textuales de los colores.
            </div>
          )}
        </div>
      </section>

      {/* Sección 4 — Para quién está pensado */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-secondary/10 p-8 rounded-full">
                <Users className="w-24 h-24 text-secondary" aria-hidden="true" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-extrabold text-text mb-6">Para quién está pensado</h2>
              <p className="text-lg text-textMuted leading-relaxed mb-6">
                Buscamos facilitar la experiencia de diversas personas, asegurando que todos puedan comprar sin frustraciones:
              </p>
              <ul className="space-y-3">
                <ListItem text="Personas con baja visión" />
                <ListItem text="Personas con daltonismo" />
                <ListItem text="Usuarios con dificultades de lectura" />
                <ListItem text="Usuarios con poca experiencia tecnológica" />
                <ListItem text="Personas que prefieren formas alternativas de interacción" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5 — Proyecto académico */}
      <section className="py-12 md:py-16 bg-surface border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-6" aria-hidden="true" />
          <h2 className="text-2xl font-extrabold text-text mb-4">Proyecto académico</h2>
          <p className="text-lg text-textMuted leading-relaxed mb-8">
            ParaTodos es un prototipo académico desarrollado en el curso de Interacción Hombre-Máquina. 
            Su objetivo es evaluar la usabilidad, accesibilidad, interacción y la experiencia del usuario. 
            <strong className="block mt-4 text-text">No es una tienda comercial real.</strong>
          </p>
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-xl font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50">
            Explorar catálogo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Componentes auxiliares
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
    <div className="bg-surface shadow-sm w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-primary">
      <Icon className="w-6 h-6" aria-hidden="true" />
    </div>
    <h3 className="font-bold text-text mb-2">{title}</h3>
    <p className="text-sm text-textMuted">{desc}</p>
  </div>
);

const ListItem = ({ text }) => (
  <li className="flex items-center gap-3 text-text font-medium bg-surface p-3 rounded-lg border border-border shadow-sm">
    <div className="w-2 h-2 rounded-full bg-secondary"></div>
    {text}
  </li>
);

export default AboutPage;
