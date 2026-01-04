import { useEffect, useRef } from 'react';

const AboutUs = () => {
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
    <section id="nosotros" ref={sectionRef} className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-up order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-primary/20 rounded-2xl -rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80"
                alt="Interior de un bodegón con productos latinoamericanos"
                className="relative rounded-2xl shadow-card-hover w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-flag text-white p-6 rounded-xl shadow-lg">
                <p className="font-heading font-bold text-2xl">+5</p>
                <p className="text-sm">Años de experiencia</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="fade-up inline-block text-yellow-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Quiénes Somos
            </span>
            <h2 className="fade-up section-title text-left text-gray-dark mb-6" style={{ transitionDelay: '0.1s' }}>
              Sabores de <span className="text-blue-flag">Venezuela</span> en tu mesa
            </h2>
            <div className="fade-up space-y-4 text-gray-medium leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              <p>
                Somos un bodegón dedicado a ofrecer <strong className="text-gray-dark">productos venezolanos auténticos</strong> en Argentina. 
                Traemos sabores tradicionales, productos frescos y atención cercana para que disfrutes como en casa.
              </p>
              <p>
                Desde harinas y condimentos hasta dulces típicos y bebidas, en VeneBodegón encontrarás todo lo que necesitas 
                para preparar tus platos favoritos con el sabor original de nuestra tierra.
              </p>
              <p>
                Nuestro compromiso es mantener viva la tradición culinaria venezolana, ofreciendo productos de calidad 
                y un servicio cercano que te haga sentir como en familia.
              </p>
            </div>

            <div className="fade-up mt-8 flex flex-wrap gap-6" style={{ transitionDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌽</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-dark">Productos Frescos</p>
                  <p className="text-sm text-gray-medium">Importados semanalmente</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-flag/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-dark">Atención Personalizada</p>
                  <p className="text-sm text-gray-medium">Te asesoramos siempre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
