import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bodegon.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.querySelector('#productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Productos venezolanos auténticos - arepas, harina pan, malta y más"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gray-dark/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          Productos Venezolanos en Argentina
        </h1>
        <p
          className="text-xl md:text-2xl lg:text-3xl text-yellow-primary font-semibold mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Disfrutá los sabores de nuestra tierra
        </p>
        <button
          onClick={scrollToProducts}
          className="btn-primary text-lg px-8 py-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          Ver Catálogo
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <button
          onClick={scrollToProducts}
          aria-label="Scroll hacia abajo"
          className="text-white/80 hover:text-yellow-primary transition-colors"
        >
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
