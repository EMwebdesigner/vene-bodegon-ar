import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import logoVenebodegon from '@/assets/logo-venebodegon.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" onClick={() => scrollToSection('#inicio')} className="inline-block mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={logoVenebodegon} 
                  alt="VeneBodegón - Almacén & Bebidas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Productos venezolanos auténticos en Argentina. Traemos los sabores de nuestra tierra para que disfrutes como en casa.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/venebodegon.ar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-primary hover:text-black transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/5491136003950"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-primary hover:text-black transition-all duration-300"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Menú Rápido</h4>
            <ul className="space-y-3">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Productos', href: '#productos' },
                { name: 'Ofertas', href: '#ofertas' },
                { name: 'Testimonios', href: '#testimonios' },
                { name: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-yellow-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Sucursales</h4>
            <ul className="space-y-4">
              {[
                { name: 'Martínez', address: 'Av. Santa Fe 2345' },
                { name: 'Palermo', address: 'Av. Córdoba 4567' },
                { name: 'Belgrano', address: 'Av. Cabildo 1234' },
                { name: 'San Isidro', address: 'Av. Centenario 789' },
              ].map((location) => (
                <li key={location.name} className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-yellow-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">{location.name}</span>
                    <span className="text-white/60 block">{location.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+5491136003950"
                  className="flex items-center gap-3 text-white/70 hover:text-yellow-primary transition-colors text-sm"
                >
                  <Phone size={16} />
                  +54 11 3600-3950
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5491136003950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-yellow-primary transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp Directo
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/venebodegon.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-yellow-primary transition-colors text-sm"
                >
                  <Instagram size={16} />
                  @venebodegon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} VeneBodegón. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-yellow-primary text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/60 hover:text-yellow-primary text-sm transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
