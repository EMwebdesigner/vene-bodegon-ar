import { useState, useEffect, useRef } from 'react';
import { Send, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  privacidad: boolean;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  privacidad?: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    privacidad: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresá un email válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    if (!formData.privacidad) {
      newErrors.privacidad = 'Debés aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: '¡Mensaje enviado!',
      description: 'Gracias por contactarnos. Nos comunicaremos en breve.',
    });

    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
      privacidad: false,
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="fade-up inline-block text-yellow-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Escribinos
          </span>
          <h2 className="fade-up section-title text-gray-dark" style={{ transitionDelay: '0.1s' }}>
            Contacto
          </h2>
          <p className="fade-up section-subtitle" style={{ transitionDelay: '0.2s' }}>
            Estamos para ayudarte con cualquier consulta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="fade-up" style={{ transitionDelay: '0.3s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-dark mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="form-error">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-dark mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`form-input ${errors.telefono ? 'error' : ''}`}
                    placeholder="+54 11 1234-5678"
                  />
                  {errors.telefono && <p className="form-error">{errors.telefono}</p>}
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-dark mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Motivo de contacto"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-dark mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className={`form-input resize-none ${errors.mensaje ? 'error' : ''}`}
                  placeholder="Contanos en qué podemos ayudarte..."
                />
                {errors.mensaje && <p className="form-error">{errors.mensaje}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacidad"
                    checked={formData.privacidad}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-gray-medium text-yellow-primary focus:ring-yellow-primary"
                  />
                  <span className="text-sm text-gray-medium">
                    Acepto la{' '}
                    <a href="#" className="text-blue-flag hover:underline">
                      política de privacidad
                    </a>{' '}
                    y el tratamiento de mis datos personales. *
                  </span>
                </label>
                {errors.privacidad && <p className="form-error">{errors.privacidad}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 grid sm:grid-cols-3 gap-6">
              <a
                href="https://wa.me/5491136003950"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-medium hover:text-green-600 transition-colors"
              >
                <MessageCircle size={20} />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/venebodegon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-medium hover:text-pink-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-sm">@venebodegon</span>
              </a>
              <a
                href="tel:+5491136003950"
                className="flex items-center gap-3 text-gray-medium hover:text-blue-flag transition-colors"
              >
                <Phone size={20} />
                <span className="text-sm">+54 11 3600-3950</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="fade-up" style={{ transitionDelay: '0.4s' }}>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-full min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52582.36657892421!2d-58.55849367832032!3d-34.50594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb0a54ab9d0e3%3A0x6fe49ef8ea34e1a0!2sMart%C3%ADnez%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1699900000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación VeneBodegón"
              />
              
              {/* Map Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-72 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-red-flag mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-dark text-sm">VeneBodegón Martínez</p>
                    <p className="text-gray-medium text-xs mt-1">Av. Santa Fe 2345, Martínez</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Martinez,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-sm text-blue-flag hover:underline"
                >
                  Ver ruta en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
