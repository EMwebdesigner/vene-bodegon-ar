import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Harinas & Cereales',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    examples: ['Harina PAN', 'Harina Juana', 'Maíz pilado', 'Avena en hojuelas'],
    accent: 'yellow',
  },
  {
    id: 2,
    title: 'Condimentos',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    examples: ['Adobo criollo', 'Onoto', 'Comino', 'Ajo en pasta'],
    accent: 'red',
  },
  {
    id: 3,
    title: 'Dulces y Snacks',
    image: 'https://images.unsplash.com/photo-1499195333224-3ce974eecb47?w=400&q=80',
    examples: ['Cocosette', 'Susy', 'Toronto', 'Pirulin'],
    accent: 'yellow',
  },
  {
    id: 4,
    title: 'Bebidas & Refrescos',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80',
    examples: ['Malta', 'Frescolita', 'Ron Santa Teresa', 'Whisky Old Parr'],
    accent: 'red',
  },
  {
    id: 5,
    title: 'Lácteos y Quesos',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
    examples: ['Queso de mano', 'Queso llanero', 'Queso guayanés', 'Nata criolla'],
    accent: 'yellow',
  },
  {
    id: 6,
    title: 'Productos Congelados',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
    examples: ['Tequeños', 'Empanadas', 'Hallacas', 'Cachapas'],
    accent: 'red',
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="productos" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="fade-up inline-block text-yellow-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Nuestros Productos
          </span>
          <h2 className="fade-up section-title text-gray-dark" style={{ transitionDelay: '0.1s' }}>
            Catálogo de Productos
          </h2>
          <p className="fade-up section-subtitle" style={{ transitionDelay: '0.2s' }}>
            Explorá nuestras categorías y encontrá todo lo que necesitás
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="fade-up card-product group"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              {/* Accent bar */}
              <div
                className={`h-1 ${
                  category.accent === 'yellow' ? 'bg-yellow-primary' : 'bg-red-flag'
                }`}
              />

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-gray-dark mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-1 mb-6">
                  {category.examples.map((example) => (
                    <li key={example} className="text-gray-medium text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-primary rounded-full" />
                      {example}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary inline-flex items-center gap-2 text-sm w-full justify-center"
                >
                  Ver Catálogo Completo
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
