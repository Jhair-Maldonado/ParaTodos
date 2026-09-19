import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, User, LogOut, X, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import useAccessibilityStore from '../../store/accessibilityStore';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';

const Header = () => {
  const { items, openDrawer } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { reducedMotion, simplifiedMode } = useAccessibilityStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // Voice Search Hook
  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  } = useSpeechRecognition();

  // If voice transcript arrives, execute search automatically
  useEffect(() => {
    if (transcript) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(transcript);
      navigate(`/catalog?search=${encodeURIComponent(transcript.trim())}`);
      clearTranscript();
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [transcript, navigate, clearTranscript]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    // Cambiado de sticky a absolute para que el contenedor fijo en MainLayout controle su posición
    <header className="absolute top-0 left-0 z-40 w-full bg-surface border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 -ml-2 rounded-lg hover:bg-surfaceHover lg:hidden" 
            aria-label="Menú principal"
            onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsMobileSearchOpen(false); }}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-text" /> : <Menu className="w-6 h-6 text-text" />}
          </button>
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
            Style<span className="text-secondary">Accesible</span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <Link to="/" className="text-text hover:text-primary transition-colors">Inicio</Link>
          <Link to="/catalog" className="text-text hover:text-primary transition-colors">Catálogo</Link>
          {!simplifiedMode && (
            <Link to="/about" className="text-text hover:text-primary transition-colors">Nosotros</Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Search */}
          <div className="hidden lg:flex flex-col relative group">
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <label htmlFor="desktop-search" className="sr-only">Buscar ropa</label>
                <button type="submit" aria-label="Buscar" className="absolute left-3 text-textMuted hover:text-primary transition-colors">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
                <input 
                  id="desktop-search"
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar ropa..." 
                  className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </form>
              <button
                type="button"
                onClick={toggleVoiceSearch}
                aria-pressed={isListening}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  isListening 
                    ? 'border-error text-error bg-error/10' 
                    : 'border-border text-textMuted hover:text-primary hover:border-primary'
                }`}
              >
                {isListening ? (
                  <Mic className={`w-4 h-4 ${!reducedMotion ? 'animate-pulse' : ''}`} aria-hidden="true" />
                ) : (
                  <Mic className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="text-sm font-medium">{isListening ? 'Escuchando...' : 'Buscar por voz'}</span>
              </button>
            </div>
            {/* Voice Search Feedback / Error Messages */}
            {error && (
              <div className="absolute top-full mt-2 w-full text-center text-sm font-medium text-error bg-error/10 p-2 rounded border border-error/20" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
            {transcript && !error && !isListening && (
              <div className="absolute top-full mt-2 w-full text-center text-sm font-medium text-primary bg-primary/10 p-2 rounded border border-primary/20" role="status" aria-live="polite">
                Buscando: "{transcript}"
              </div>
            )}
          </div>
          
          {/* Mobile Search Toggle */}
          <button 
            className="p-2 lg:hidden rounded-full hover:bg-surfaceHover focus:outline-none focus:ring-2 focus:ring-primary" 
            aria-label="Buscar"
            aria-expanded={isMobileSearchOpen}
            onClick={() => { setIsMobileSearchOpen(!isMobileSearchOpen); setIsMobileMenuOpen(false); }}
          >
            <Search className="w-6 h-6 text-text" />
          </button>
          
          
          {!simplifiedMode && (
            isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline font-bold text-primary mr-2">Hola, {user.name}</span>
                <button 
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-surfaceHover transition-colors group focus:outline-none focus:ring-2 focus:ring-primary" 
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-6 h-6 text-text group-hover:text-error" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="p-2 rounded-full hover:bg-surfaceHover transition-colors group focus:outline-none focus:ring-2 focus:ring-primary" 
                aria-label="Iniciar sesión"
              >
                <User className="w-6 h-6 text-text group-hover:text-primary" />
              </Link>
            )
          )}

          <button 
            onClick={openDrawer}
            className="p-2 relative rounded-full hover:bg-surfaceHover transition-colors group focus:outline-none focus:ring-2 focus:ring-primary" 
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="w-6 h-6 text-text group-hover:text-primary" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 animate-fade-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {isMobileSearchOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-border p-4 shadow-md animate-fade-in">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <form onSubmit={handleSearch} className="relative flex-1 flex items-center">
                <label htmlFor="mobile-search" className="sr-only">Buscar prendas, colores</label>
                <button type="submit" aria-label="Buscar" className="absolute left-3 text-textMuted hover:text-primary z-10 focus:outline-none">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
                <input 
                  id="mobile-search"
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar prendas..." 
                  className="pl-10 pr-4 py-3 w-full bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoFocus
                />
              </form>
              <button
                type="button"
                onClick={toggleVoiceSearch}
                aria-pressed={isListening}
                aria-label="Buscar por voz"
                className={`flex items-center justify-center p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  isListening 
                    ? 'border-error text-error bg-error/10' 
                    : 'border-border text-textMuted bg-background hover:text-primary hover:border-primary'
                }`}
              >
                {isListening ? (
                  <Mic className={`w-5 h-5 ${!reducedMotion ? 'animate-pulse' : ''}`} aria-hidden="true" />
                ) : (
                  <Mic className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
            
            {/* Mobile Feedback */}
            {isListening && (
               <div className="text-center text-sm font-medium text-error py-1" role="status" aria-live="polite">
                 Escuchando...
               </div>
            )}
            {error && (
              <div className="text-center text-sm font-medium text-error bg-error/10 p-2 rounded border border-error/20" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
            {transcript && !error && !isListening && (
              <div className="text-center text-sm font-medium text-primary bg-primary/10 p-2 rounded border border-primary/20" role="status" aria-live="polite">
                Buscando: "{transcript}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-border shadow-md animate-fade-in">
          <nav className="flex flex-col p-4">
            <Link 
              to="/" 
              className="p-4 border-b border-border text-lg font-medium hover:bg-surfaceHover hover:text-primary rounded-t-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              to="/catalog" 
              className={`p-4 border-b border-border text-lg font-medium hover:bg-surfaceHover hover:text-primary transition-colors ${simplifiedMode ? 'rounded-b-lg border-b-0' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>
            {!simplifiedMode && (
              <Link 
                to="/about" 
                className="p-4 text-lg font-medium hover:bg-surfaceHover hover:text-primary rounded-b-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
