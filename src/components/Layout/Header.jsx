import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, User, LogOut, X, Mic, MicOff } from 'lucide-react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import useAccessibilityStore from '../../store/accessibilityStore';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';
import { speak } from '../../utils/speech';

// Buscador único (antes había dos copias casi idénticas: escritorio y móvil)
const SearchForm = ({ id, compact, onDone }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [term, setTerm] = useState(params.get('search') || '');
  const [heard, setHeard] = useState('');
  const { reducedMotion } = useAccessibilityStore();
  const { isSupported, isListening, transcript, error, startListening, stopListening, clearTranscript } = useSpeechRecognition();

  // Cuando llega lo reconocido por voz: se muestra en el campo, se informa y se busca
  useEffect(() => {
    if (!transcript) return;
    const text = transcript.trim();
    /* eslint-disable react-hooks/set-state-in-effect */
    setTerm(text);
    setHeard(text);
    /* eslint-enable react-hooks/set-state-in-effect */
    clearTranscript();
    navigate(`/catalog?search=${encodeURIComponent(text)}&voz=1`);
    onDone?.();
  }, [transcript, navigate, clearTranscript, onDone]);

  const submit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    setHeard('');
    navigate(`/catalog?search=${encodeURIComponent(term.trim())}`);
    onDone?.();
  };

  const toggleVoice = () => {
    if (isListening) { stopListening(); return; }
    speak('Te escucho. Di qué prenda buscas.');
    setTimeout(startListening, 900);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={submit} role="search" className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="sr-only">Buscar prendas o colores</label>
        <div className="relative flex-1 min-w-[12rem]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted pointer-events-none" aria-hidden="true" />
          <input
            id={id}
            type="search"
            value={term}
            onChange={(e) => { setTerm(e.target.value); setHeard(''); }}
            placeholder="Ej.: camisa azul"
            enterKeyHint="search"
            className={`w-full pl-10 pr-3 bg-background border-2 border-borderStrong rounded-full text-text placeholder:text-textMuted ${compact ? 'py-3' : 'py-2 lg:w-64'}`}
          />
        </div>
        <button type="submit" className="min-h-[44px] px-4 rounded-full bg-primary text-onPrimary font-bold hover:bg-primaryHover">
          Buscar
        </button>
        {isSupported && (
          <button
            type="button"
            onClick={toggleVoice}
            aria-pressed={isListening}
            aria-label={isListening ? 'Detener búsqueda por voz' : 'Buscar por voz'}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 px-3 rounded-full border-2 font-bold transition-colors ${
              isListening ? 'border-error text-error bg-error/10' : 'border-borderStrong text-text hover:border-primary'
            }`}
          >
            {isListening
              ? <MicOff className={`w-5 h-5 ${!reducedMotion ? 'animate-pulse' : ''}`} aria-hidden="true" />
              : <Mic className="w-5 h-5" aria-hidden="true" />}
            <span className="hidden xl:inline text-sm">{isListening ? 'Detener' : 'Voz'}</span>
          </button>
        )}
      </form>
      <div aria-live="assertive" className="absolute top-full left-0 right-0 mt-2 z-10">
        {isListening && <p className="text-sm font-bold text-text bg-surface border-2 border-primary p-2 rounded-lg">Escuchando… di, por ejemplo, «polo negro».</p>}
        {error && <p role="alert" className="text-sm font-bold text-error bg-surface border-2 border-error p-2 rounded-lg">{error}</p>}
        {heard && !isListening && !error && (
          <p className="text-sm font-bold text-text bg-surface border-2 border-borderStrong p-2 rounded-lg">
            Escuché: «{heard}». Si no es correcto, corrígelo en el campo.
          </p>
        )}
      </div>
    </div>
  );
};

const navClass = ({ isActive }) =>
  `px-1 py-2 border-b-4 font-semibold transition-colors ${isActive ? 'border-primary text-text' : 'border-transparent text-text hover:border-borderStrong'}`;

const Header = () => {
  const { items, openDrawer } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { simplifiedMode, fontScale } = useAccessibilityStore();
  // Con texto grande se usa siempre el encabezado compacto para evitar desbordes (WCAG 1.4.10)
  const compact = fontScale >= 1.25;
  const wide = compact ? 'hidden' : 'hidden lg:flex';
  const narrow = compact ? '' : 'lg:hidden';
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const closeMobileSearch = () => setIsMobileSearchOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface border-b-2 border-border shadow-sm">
      <div className="container mx-auto px-4 min-h-[5rem] py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <button
            className={`p-3 -ml-3 rounded-lg hover:bg-surfaceHover ${narrow}`}
            aria-label="Menú principal"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsMobileSearchOpen(false); }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-text" aria-hidden="true" /> : <Menu className="w-6 h-6 text-text" aria-hidden="true" />}
          </button>
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">ParaTodos</Link>
        </div>

        <nav aria-label="Principal" className={`${wide} items-center gap-6`}>
          <NavLink to="/" end className={navClass}>Inicio</NavLink>
          <NavLink to="/catalog" className={navClass}>Catálogo</NavLink>
          {!simplifiedMode && <NavLink to="/about" className={navClass}>Nosotros</NavLink>}
        </nav>

        <div className="flex flex-wrap items-center gap-1 sm:gap-3">
          {!compact && <div className="hidden lg:block"><SearchForm id="desktop-search" /></div>}

          <button
            className={`p-3 rounded-full hover:bg-surfaceHover ${narrow}`}
            aria-label="Buscar"
            aria-expanded={isMobileSearchOpen}
            onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMobileMenuOpen(false); }}
          >
            <Search className="w-6 h-6 text-text" aria-hidden="true" />
          </button>

          {/* La cuenta se mantiene visible también en navegación simplificada */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              <span className="hidden md:inline font-bold text-text">Hola, {user.name}</span>
              <button onClick={logout} className="p-3 rounded-full hover:bg-surfaceHover" aria-label="Cerrar sesión">
                <LogOut className="w-6 h-6 text-text" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-3 rounded-full hover:bg-surfaceHover flex items-center gap-2" aria-label="Iniciar sesión">
              <User className="w-6 h-6 text-text" aria-hidden="true" />
            </Link>
          )}

          <button
            onClick={openDrawer}
            className="p-3 relative rounded-full hover:bg-surfaceHover"
            aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
          >
            <ShoppingCart className="w-6 h-6 text-text" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[22px] h-[22px] px-1 bg-error text-onPrimary text-sm font-bold rounded-full flex items-center justify-center" aria-hidden="true">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className={`${narrow} absolute top-full left-0 w-full bg-surface border-b-2 border-border p-4 pb-24 shadow-md`}>
          <SearchForm id="mobile-search" compact onDone={closeMobileSearch} />
        </div>
      )}

      {isMobileMenuOpen && (
        <nav id="mobile-nav" aria-label="Principal" className={`${narrow} absolute top-full left-0 w-full bg-surface border-b-2 border-border shadow-md flex flex-col p-4`}>
          {[['/', 'Inicio'], ['/catalog', 'Catálogo'], ...(!simplifiedMode ? [['/about', 'Nosotros']] : [])].map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `p-4 text-lg font-semibold rounded-lg ${isActive ? 'bg-primary/10 text-text border-l-4 border-primary' : 'text-text hover:bg-surfaceHover'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
