import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Harinas & Cereales',
    image: 'https://jeta-imports.com/cdn/shop/files/harina-pan-de-maiz-amarillo-precocida-1kg-premium-yellow-corn-flour-962204.jpg?v=1736035132&width=713',
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
    image: 'https://venezuelan-treats.myshopify.com/cdn/shop/files/48dc864eaee413c0a10c2f7c4017be95_540x.jpg?v=1613713504',
    examples: ['Cocosette', 'Susy', 'Toronto', 'Pirulin'],
    accent: 'yellow',
  },
  {
    id: 4,
    title: 'Bebidas & Refrescos',
    image: 'https://scontent.fepa10-1.fna.fbcdn.net/v/t1.6435-9/30624265_1875501535794497_5995601764840112128_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9eae26&_nc_eui2=AeHv5HA715HJKPbvJkFRjg0oI8EbkGmY0oAjwRuQaZjSgN8NAHTLuX0wKlSH3Apeb2g&_nc_ohc=NaswO8PqbjEQ7kNvwEYyvaH&_nc_oc=Adlh4cW2TOMWcvflqPSlZjTuSYCkSyXb3vw0x69LfkhsUXoPhIfx_zEoeDvZIt594XdaaGL-Sz2mREfynTTvl4MG&_nc_zt=23&_nc_ht=scontent.fepa10-1.fna&_nc_gid=abXmGs3UEBJeWGSsWowVlw&oh=00_Afo4xI8pOJSFxkonpgyMbeb-V6nUzO0KaNW5hUzSAVF2VQ&oe=69833E63',
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
    image: 'https://static.bainet.es/clip/abac80ec-3631-4526-b559-f2e4970fb2a1_source-aspect-ratio_1600w_0.jpg',
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
    <section id="productos" ref={sectionRef} className="py-12 lg:py-16 bg-gray-50">
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
