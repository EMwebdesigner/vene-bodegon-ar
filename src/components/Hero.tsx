import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';

const slides = [
  {
    image: heroSlide1,
    alt: "Productos venezolanos auténticos - arepas, harina pan, toddy, maltín"
  },
  {
    image: heroSlide2,
    alt: "Tienda de productos venezolanos con variedad de marcas"
  },
  {
    image: heroSlide3,
    alt: "Preparación tradicional de arepas venezolanas"
  }
];

const SLIDE_INTERVAL = 5000; // 5 segundos

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

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
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-dark/60" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-primary w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-20">
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
