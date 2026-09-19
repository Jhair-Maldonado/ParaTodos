import { useState, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Truck,
  Check,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAccessibilityStore from '../store/accessibilityStore';

const MOCK_SAVED_ADDRESS = {
  id: 'addr-1',
  fullName: 'María González',
  address: 'Jr. Ejemplo 123',
  district: 'Ate',
  city: 'Lima',
  phone: '987654321'
};

const MOCK_PAYMENT_METHODS = [
  { id: 'card-1', type: 'card', name: 'Visa terminada en 4242', icon: CreditCard, details: 'Vence 12/29' },
  { id: 'yape', type: 'yape', name: 'Yape', icon: null, details: 'Pago rápido con QR' },
  { id: 'cash', type: 'cash', name: 'Pago contra entrega', icon: Truck, details: 'Paga al recibir tu pedido' }
];

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { reducedMotion, fontScale } = useAccessibilityStore();
  
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [deliveryData, setDeliveryData] = useState({
    fullName: '',
    address: '',
    district: '',
    city: 'Lima',
    phone: ''
  });
  
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const errorRef = useRef(null);

  const totalUnidades = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getTotal();
  const shippingCost = 10.00;
  const finalTotal = subtotal + shippingCost;

  const scrollToTop = () => {
    if (!reducedMotion) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    if (!useSavedAddress) {
      const newErrors = {};
      if (!deliveryData.fullName.trim()) newErrors.fullName = 'Ingresa tu nombre completo.';
      if (!deliveryData.address.trim()) newErrors.address = 'Ingresa una dirección de entrega.';
      if (!deliveryData.district.trim()) newErrors.district = 'Ingresa tu distrito.';
      if (!deliveryData.phone.trim()) newErrors.phone = 'Ingresa un número de teléfono válido.';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTimeout(() => errorRef.current?.focus(), 50);
        return;
      }
    }
    
    setErrors({});
    setStep(2);
    scrollToTop();
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaymentId) {
      setErrors({ payment: 'Selecciona un método de pago antes de continuar.' });
      setTimeout(() => errorRef.current?.focus(), 50);
      return;
    }
    
    setErrors({});
    setStep(3);
    scrollToTop();
  };

  const handleConfirmPurchase = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Simular latencia de red y procesamiento seguro (Mock)
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setIsSuccess(true);
      scrollToTop();
    }, 800);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
    setErrors({});
    scrollToTop();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // -------------------------------------------------------------
  // ESTADOS TEMPRANOS: Carrito vacío o Éxito
  // -------------------------------------------------------------
  
  if (isSuccess) {
    return (
      <main className={`container mx-auto px-4 py-16 text-center ${!reducedMotion ? 'animate-fade-in' : ''}`}>
        <div className="max-w-xl mx-auto bg-surface border border-border p-8 rounded-3xl shadow-premium">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text mb-4">¡Compra confirmada!</h1>
          <p className="text-lg text-textMuted mb-8">
            Tu pedido ha sido registrado correctamente. Te enviaremos un correo con los detalles del envío.
          </p>
          
          <div className="bg-background rounded-2xl p-6 text-left mb-8 border border-border">
            <p className="text-sm font-bold text-textMuted uppercase mb-1">Número de pedido</p>
            <p className="font-mono text-xl font-bold text-text mb-4">#PT-1042</p>
            
            <p className="text-sm font-bold text-textMuted uppercase mb-1">Dirección de entrega</p>
            <p className="font-medium text-text">
              {useSavedAddress 
                ? `${MOCK_SAVED_ADDRESS.address}, ${MOCK_SAVED_ADDRESS.district}, ${MOCK_SAVED_ADDRESS.city}` 
                : `${deliveryData.address}, ${deliveryData.district}, ${deliveryData.city}`
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              Seguir comprando
            </Link>
            <Link 
              to="/" 
              className="bg-background text-text border border-border px-8 py-4 rounded-xl font-bold text-lg hover:border-text transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={`container mx-auto px-4 py-24 text-center ${!reducedMotion ? 'animate-fade-in' : ''}`}>
        <ShoppingBag className="w-24 h-24 text-textMuted mx-auto mb-6 opacity-30" aria-hidden="true" />
        <h1 className="text-4xl font-extrabold text-text mb-4">Tu carrito está vacío</h1>
        <p className="text-xl text-textMuted mb-8 max-w-md mx-auto">
          No puedes continuar con el pago sin productos. Explora el catálogo para añadir prendas.
        </p>
        <Link 
          to="/catalog" 
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-premium"
        >
          Explorar catálogo
        </Link>
      </main>
    );
  }

  // -------------------------------------------------------------
  // FLUJO DE CHECKOUT PRINCIPAL
  // -------------------------------------------------------------

  const getActiveAddress = () => useSavedAddress ? MOCK_SAVED_ADDRESS : deliveryData;
  const getSelectedPayment = () => MOCK_PAYMENT_METHODS.find(m => m.id === selectedPaymentId);

  return (
    <main 
      className={`container mx-auto px-4 py-8 lg:py-12 ${!reducedMotion ? 'animate-fade-in' : ''}`}
      style={{ fontSize: fontScale === 1.15 ? '1.05rem' : undefined }}
    >
      <h1 className="sr-only">Proceso de pago por pasos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
        
        {/* COLUMNA IZQUIERDA: Flujo de Pasos */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          
          {/* Indicador de Progreso Visual */}
          <nav aria-label="Progreso del pago" className="relative mb-4">
            {/* Línea conectora */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 z-0 rounded-full" aria-hidden="true"></div>
            
            <ol className="relative z-10 flex justify-between items-center m-0 p-0 list-none">
              {[
                { num: 1, title: 'Entrega' },
                { num: 2, title: 'Pago' },
                { num: 3, title: 'Revisión' }
              ].map((s) => {
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;
                
                return (
                  <li key={s.num} className="flex flex-col items-center bg-background px-2 sm:px-4">
                    <span 
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg border-4 transition-colors ${
                        isCompleted 
                          ? 'bg-primary border-background text-white' 
                          : isCurrent 
                            ? 'bg-primary border-primary/20 text-white shadow-md' 
                            : 'bg-surface border-border text-textMuted'
                      }`}
                      aria-current={isCurrent ? 'step' : undefined}
                    >
                      {isCompleted ? <Check className="w-6 h-6" aria-hidden="true" /> : s.num}
                    </span>
                    <span className={`mt-2 font-bold text-sm sm:text-base ${isCurrent || isCompleted ? 'text-text' : 'text-textMuted'}`}>
                      {s.title}
                      <span className="sr-only">
                        {isCompleted ? ' (Completado)' : isCurrent ? ' (Paso actual)' : ' (Pendiente)'}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Renderizado Condicional del Paso Actual */}
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm">
            
            {/* -------------------------------------------------------------
                PASO 1: ENTREGA
                ------------------------------------------------------------- */}
            {step === 1 && (
              <form onSubmit={handleDeliverySubmit} aria-label="Formulario de entrega">
                <header className="mb-6 border-b border-border pb-4 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-extrabold text-text">1. Opciones de entrega</h2>
                </header>

                <fieldset className="mb-8 border-none p-0 m-0">
                  <legend className="sr-only">Selecciona o ingresa una dirección de entrega</legend>
                  
                  <div className="space-y-4">
                    {/* Opción Dirección Guardada */}
                    <label className={`flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors focus-within:ring-4 focus-within:ring-primary/50 ${useSavedAddress ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}>
                      <div className="flex items-center h-6">
                        <input 
                          type="radio" 
                          name="addressOption" 
                          className="w-5 h-5 text-primary focus:ring-0 cursor-pointer"
                          checked={useSavedAddress} 
                          onChange={() => setUseSavedAddress(true)}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="block font-bold text-lg mb-1">Usar dirección guardada</span>
                        <div className="text-textMuted">
                          <p>{MOCK_SAVED_ADDRESS.fullName}</p>
                          <p>{MOCK_SAVED_ADDRESS.address}, {MOCK_SAVED_ADDRESS.district}</p>
                          <p>{MOCK_SAVED_ADDRESS.city}</p>
                          <p>Tel: {MOCK_SAVED_ADDRESS.phone}</p>
                        </div>
                      </div>
                    </label>

                    {/* Opción Nueva Dirección */}
                    <label className={`flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors focus-within:ring-4 focus-within:ring-primary/50 ${!useSavedAddress ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}>
                      <div className="flex items-center h-6">
                        <input 
                          type="radio" 
                          name="addressOption" 
                          className="w-5 h-5 text-primary focus:ring-0 cursor-pointer"
                          checked={!useSavedAddress} 
                          onChange={() => setUseSavedAddress(false)}
                        />
                      </div>
                      <span className="block font-bold text-lg mt-0.5">Ingresar otra dirección</span>
                    </label>
                  </div>
                </fieldset>

                {/* Formulario Nueva Dirección (Desplegable si no usa guardada) */}
                {!useSavedAddress && (
                  <div className={`mt-6 space-y-5 bg-background p-6 rounded-2xl border border-border ${!reducedMotion ? 'animate-fade-in' : ''}`}>
                    <h3 className="font-bold text-lg mb-4">Nueva dirección</h3>
                    
                    <div>
                      <label htmlFor="fullName" className="block text-text font-bold mb-2">
                        Nombre completo <span className="text-error" aria-label="Requerido">*</span>
                      </label>
                      <input 
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={deliveryData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-surface border p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors ${errors.fullName ? 'border-error' : 'border-border hover:border-border/80'}`}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && (
                        <p id="fullName-error" className="text-error font-medium mt-2 flex items-center gap-1" role="alert" tabIndex="-1" ref={errorRef}>
                          <AlertCircle className="w-4 h-4" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-text font-bold mb-2">
                          Dirección (Calle, Av., Número) <span className="text-error" aria-label="Requerido">*</span>
                        </label>
                        <input 
                          id="address"
                          name="address"
                          type="text"
                          value={deliveryData.address}
                          onChange={handleInputChange}
                          className={`w-full bg-surface border p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors ${errors.address ? 'border-error' : 'border-border hover:border-border/80'}`}
                          aria-invalid={!!errors.address}
                          aria-describedby={errors.address ? "address-error" : undefined}
                        />
                        {errors.address && (
                          <p id="address-error" className="text-error font-medium mt-2 flex items-center gap-1" role="alert" tabIndex="-1" ref={!errors.fullName ? errorRef : null}>
                            <AlertCircle className="w-4 h-4" /> {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="district" className="block text-text font-bold mb-2">
                          Distrito <span className="text-error" aria-label="Requerido">*</span>
                        </label>
                        <input 
                          id="district"
                          name="district"
                          type="text"
                          value={deliveryData.district}
                          onChange={handleInputChange}
                          className={`w-full bg-surface border p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors ${errors.district ? 'border-error' : 'border-border hover:border-border/80'}`}
                          aria-invalid={!!errors.district}
                          aria-describedby={errors.district ? "district-error" : undefined}
                        />
                        {errors.district && (
                          <p id="district-error" className="text-error font-medium mt-2 flex items-center gap-1" role="alert" tabIndex="-1">
                            <AlertCircle className="w-4 h-4" /> {errors.district}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-text font-bold mb-2">
                          Teléfono de contacto <span className="text-error" aria-label="Requerido">*</span>
                        </label>
                        <input 
                          id="phone"
                          name="phone"
                          type="tel"
                          value={deliveryData.phone}
                          onChange={handleInputChange}
                          className={`w-full bg-surface border p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors ${errors.phone ? 'border-error' : 'border-border hover:border-border/80'}`}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                          <p id="phone-error" className="text-error font-medium mt-2 flex items-center gap-1" role="alert" tabIndex="-1">
                            <AlertCircle className="w-4 h-4" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-premium"
                  >
                    Continuar al pago <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}

            {/* -------------------------------------------------------------
                PASO 2: PAGO
                ------------------------------------------------------------- */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} aria-label="Selección de método de pago">
                <header className="mb-6 border-b border-border pb-4 flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-extrabold text-text">2. Método de pago</h2>
                </header>

                {errors.payment && (
                  <div className="mb-6 p-4 rounded-xl bg-error/10 border-l-4 border-error flex items-start gap-3" role="alert" tabIndex="-1" ref={errorRef}>
                    <AlertCircle className="w-6 h-6 text-error shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-error font-medium">{errors.payment}</p>
                  </div>
                )}

                <fieldset className="mb-8 border-none p-0 m-0">
                  <legend className="sr-only">Selecciona un método de pago simulado</legend>
                  
                  <div className="space-y-4">
                    {MOCK_PAYMENT_METHODS.map((method) => (
                      <label key={method.id} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors focus-within:ring-4 focus-within:ring-primary/50 ${selectedPaymentId === method.id ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-primary/50'}`}>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value={method.id}
                            className="w-5 h-5 text-primary focus:ring-0 cursor-pointer"
                            checked={selectedPaymentId === method.id} 
                            onChange={() => {
                              setSelectedPaymentId(method.id);
                              if (errors.payment) setErrors({});
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <span className="block font-bold text-lg">{method.name}</span>
                          <span className="block text-textMuted">{method.details}</span>
                        </div>
                        {method.icon && (
                          <div className="text-textMuted bg-surface p-2 rounded-lg" aria-hidden="true">
                            <method.icon className="w-8 h-8" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button 
                    type="button"
                    onClick={handlePrevStep}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-textMuted hover:text-text font-bold px-6 py-4 rounded-xl border border-border hover:bg-surfaceHover transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50"
                  >
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Atrás
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primaryHover transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-premium"
                  >
                    Revisar pedido <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}

            {/* -------------------------------------------------------------
                PASO 3: REVISIÓN Y CONFIRMACIÓN
                ------------------------------------------------------------- */}
            {step === 3 && (
              <div aria-label="Revisión final del pedido">
                <header className="mb-6 border-b border-border pb-4 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-extrabold text-text">3. Revisa y confirma</h2>
                </header>

                <div className="space-y-6 mb-8">
                  {/* Resumen de Entrega */}
                  <div className="bg-background border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-text flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-textMuted" aria-hidden="true" />
                        Entrega
                      </h3>
                      <button 
                        onClick={() => { setStep(1); scrollToTop(); }}
                        className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 -mr-2 -mt-1"
                      >
                        Editar
                      </button>
                    </div>
                    <div className="text-textMuted ml-7">
                      <p className="font-medium text-text">{getActiveAddress().fullName}</p>
                      <p>{getActiveAddress().address}</p>
                      <p>{getActiveAddress().district}, {getActiveAddress().city}</p>
                      <p>Tel: {getActiveAddress().phone}</p>
                    </div>
                  </div>

                  {/* Resumen de Pago */}
                  <div className="bg-background border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-text flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-textMuted" aria-hidden="true" />
                        Pago
                      </h3>
                      <button 
                        onClick={() => { setStep(2); scrollToTop(); }}
                        className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 -mr-2 -mt-1"
                      >
                        Editar
                      </button>
                    </div>
                    <div className="text-textMuted ml-7 font-medium text-text">
                      {getSelectedPayment()?.name}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border pt-6">
                  <button 
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isProcessing}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-textMuted hover:text-text font-bold px-6 py-4 rounded-xl border border-border hover:bg-surfaceHover transition-colors focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-50"
                  >
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Atrás
                  </button>
                  <button 
                    onClick={handleConfirmPurchase}
                    disabled={isProcessing}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-10 py-5 rounded-xl font-extrabold text-xl transition-all focus:outline-none focus:ring-4 focus:ring-green-600/50 shadow-premium ${isProcessing ? 'opacity-90 cursor-wait' : 'hover:bg-green-700'}`}
                    aria-live="polite"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        Confirmar y pagar S/ {finalTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* COLUMNA DERECHA: Resumen Compacto del Pedido */}
        <aside className="lg:col-span-5 xl:col-span-4" aria-label="Resumen de tu pedido">
          <div className="bg-surface border border-border rounded-3xl p-6 lg:p-8 sticky top-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4 flex justify-between items-center">
              Tu pedido
              <span className="text-sm font-medium bg-background px-3 py-1 rounded-full border border-border">
                {totalUnidades} {totalUnidades === 1 ? 'prenda' : 'prendas'}
              </span>
            </h2>
            
            {/* Lista minimalista de ítems */}
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.cartItemId} className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <span className="font-bold text-textMuted bg-background border border-border rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm">
                      {item.quantity}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-text truncate">{item.name}</p>
                      <p className="text-sm text-textMuted">Talla {item.selectedSize} · {item.colorText}</p>
                    </div>
                  </div>
                  <span className="font-bold whitespace-nowrap text-text">S/ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            
            {/* Si estamos editando pasos 1 o 2, permitir ir al catálogo/carrito, sino, ocultar para no distraer */}
            {step < 3 && (
              <div className="mb-6 pb-6 border-b border-border text-sm">
                <Link to="/catalog" className="text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1">
                  Editar carrito
                </Link>
              </div>
            )}

            {/* Totales */}
            <div className="space-y-3 text-textMuted border-t border-border pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-text">S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-bold text-text">S/ {shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xl text-text mt-4 pt-4 border-t border-border">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold text-2xl text-primary">S/ {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default CheckoutPage;
