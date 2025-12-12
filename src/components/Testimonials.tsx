import { useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María García',
    location: 'Palermo, CABA',
    text: 'Encontré todos los productos que extrañaba de Venezuela. La harina PAN y los tequeños son exactamente como los de allá. ¡Excelente atención!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    location: 'Martínez, GBA',
    text: 'Soy cliente hace 3 años y nunca me fallaron. Los productos siempre frescos y con el sabor auténtico. Súper recomendado para toda la comunidad venezolana.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana Pérez',
    location: 'Belgrano, CABA',
    text: 'Me encanta poder preparar arepas y cachapas como las hacía mi abuela. Gracias VeneBodegón por traer un pedacito de Venezuela a Argentina.',
    rating: 5,
  },
];

const Testimonials = () => {
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
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonios" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="fade-up inline-block text-yellow-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Lo que dicen nuestros clientes
          </span>
          <h2 className="fade-up section-title text-gray-dark" style={{ transitionDelay: '0.1s' }}>
            Testimonios de Nuestros Clientes
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="fade-up bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 relative"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-flag/20">
                <Quote size={48} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-primary text-yellow-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-medium leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-flag rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-medium">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
