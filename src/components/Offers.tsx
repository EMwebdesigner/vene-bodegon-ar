import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

const offers = [
  {
    id: 1,
    name: 'Pirulin chocolate lata mediana',
    image: 'https://www.purochocolate.life/wp-content/uploads/2022/08/Pirulin.jpg',
    originalPrice: 16.999,
    offerPrice: 13.599,
    discount: 20,
  },
  {
    id: 2,
    name: 'Pack Malta x6',
    image: 'https://fmradiostereo.com/wp-content/uploads/2024/03/malta_crop1630671509918.jpg_1497.png',
    originalPrice: 4800,
    offerPrice: 3840,
    discount: 20,
  },
  {
    id: 3,
    name: 'Queso de Mano 500g',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80',
    originalPrice: 3200,
    offerPrice: 2560,
    discount: 20,
  },
  {
    id: 4,
    name: 'Tequeños Congelados x12',
    image: 'https://tofuu.getjusto.com/orioneat-local/resized2/qHwz7gDZvxceWvmLM-x-300.webp',
    originalPrice: 5500,
    offerPrice: 4400,
    discount: 20,
  },
  {
    id: 5,
    name: 'Johnnie Walker - Black Label 750cc',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80',
    originalPrice: 69000,
    offerPrice: 55200,
    discount: 20,
  },
  {
    id: 6,
    name: 'Combo Arepa Feliz',
    image: 'https://adnamerica.com/sites/default/files/styles/social_media/public/2023-05/arepas%20venezolanas.jpg?itok=r36SU4GE',
    originalPrice: 8500,
    offerPrice: 6800,
    discount: 20,
  },
];

const Offers = () => {
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

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola! Quiero consultar sobre la oferta: ${productName}`);
    window.open(`https://wa.me/5491136003950?text=${message}`, '_blank');
  };

  return (
    <section id="ofertas" ref={sectionRef} className="py-12 lg:py-16 bg-gray-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="fade-up inline-block text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
            Aprovechá nuestras promos
          </span>
          <h2 className="fade-up section-title text-yellow-primary" style={{ transitionDelay: '0.1s' }}>
            Ofertas del Momento
          </h2>
          <p className="fade-up text-lg text-white/70 mt-4" style={{ transitionDelay: '0.2s' }}>
            Productos seleccionados con descuentos especiales
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="fade-up bg-white rounded-xl overflow-hidden shadow-card-hover group relative"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              {/* Discount Badge */}
              <div className="badge-discount">
                -{offer.discount}%
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-gray-dark mb-4">
                  {offer.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-medium line-through text-sm">
                    ${offer.originalPrice.toLocaleString('es-AR')}
                  </span>
                  <span className="text-red-flag font-bold text-2xl">
                    ${offer.offerPrice.toLocaleString('es-AR')}
                  </span>
                </div>
                <button
                  onClick={() => handleWhatsAppClick(offer.name)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Comprar por WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
