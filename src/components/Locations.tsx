import { useEffect, useRef, useState, useCallback } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import sucursalMartinez from '@/assets/sucursal-martinez.jpg';
import sucursalPalermo from '@/assets/sucursal-palermo.jpg';
import sucursalBelgrano from '@/assets/sucursal-belgrano.jpg';
import sucursalSanIsidro from '@/assets/sucursal-sanisidro.jpg';

const locations = [
  {
    id: 1,
    name: 'VeneBodegón Martínez',
    address: 'Av. Santa Fe 2345, Martínez, Buenos Aires',
    phone: '+54 11 3600-3950',
    hours: 'Lun-Sáb: 9:00 - 20:00 | Dom: 10:00 - 14:00',
    mapUrl: 'https://maps.google.com/?q=Martinez,+Buenos+Aires,+Argentina',
    image: sucursalMartinez,
  },
  {
    id: 2,
    name: 'VeneBodegón Palermo',
    address: 'Av. Córdoba 4567, Palermo, CABA',
    phone: '+54 11 3600-3951',
    hours: 'Lun-Sáb: 9:00 - 21:00 | Dom: 10:00 - 15:00',
    mapUrl: 'https://maps.google.com/?q=Palermo,+Buenos+Aires,+Argentina',
    image: sucursalPalermo,
  },
  {
    id: 3,
    name: 'VeneBodegón Belgrano',
    address: 'Av. Cabildo 1234, Belgrano, CABA',
    phone: '+54 11 3600-3952',
    hours: 'Lun-Sáb: 9:00 - 20:00 | Dom: Cerrado',
    mapUrl: 'https://maps.google.com/?q=Belgrano,+Buenos+Aires,+Argentina',
    image: sucursalBelgrano,
  },
  {
    id: 4,
    name: 'VeneBodegón San Isidro',
    address: 'Av. Centenario 789, San Isidro, Buenos Aires',
    phone: '+54 11 3600-3953',
    hours: 'Lun-Vie: 10:00 - 19:00 | Sáb: 9:00 - 14:00',
    mapUrl: 'https://maps.google.com/?q=San+Isidro,+Buenos+Aires,+Argentina',
    image: sucursalSanIsidro,
  },
];

// Duplicate locations for infinite scroll effect
const extendedLocations = [...locations, ...locations, ...locations];

const Locations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(locations.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Handle infinite loop reset
  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
      
      // Reset to middle set without animation
      if (currentIndex >= locations.length * 2) {
        setCurrentIndex(locations.length);
      } else if (currentIndex < locations.length) {
        setCurrentIndex(locations.length + currentIndex);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning]);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const LocationCard = ({ location }: { location: typeof locations[0] }) => (
    <div className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] px-2">
      <div 
        className="relative rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full min-h-[380px] group"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${location.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
          <h3 className="font-heading font-bold text-xl mb-4 drop-shadow-lg">
            {location.name}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-yellow-primary mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm drop-shadow-md">{location.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-primary flex-shrink-0" />
              <a
                href={`tel:${location.phone.replace(/\s/g, '')}`}
                className="text-white/90 text-sm hover:text-yellow-primary transition-colors drop-shadow-md"
              >
                {location.phone}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-yellow-primary mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm drop-shadow-md">{location.hours}</p>
            </div>
          </div>

          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-primary text-black font-semibold text-sm py-3 px-4 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-blue-flag hover:text-white transition-all duration-300"
          >
            Ver en Google Maps
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="localidades" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="fade-up inline-block text-yellow-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Visitanos
          </span>
          <h2 className="fade-up section-title text-gray-dark" style={{ transitionDelay: '0.1s' }}>
            Nuestras Sucursales
          </h2>
          <p className="fade-up section-subtitle" style={{ transitionDelay: '0.2s' }}>
            4 ubicaciones para estar siempre cerca tuyo
          </p>
        </div>

        {/* Desktop Infinite Slider */}
        <div 
          className="hidden md:block relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-primary p-3 rounded-full shadow-lg transition-all duration-300 -ml-2"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} className="text-gray-dark" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-yellow-primary p-3 rounded-full shadow-lg transition-all duration-300 -mr-2"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} className="text-gray-dark" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden mx-8">
            <div
              ref={sliderRef}
              className="flex gap-4"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / 3)}% - ${currentIndex * (16 / 3)}px))`,
                transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
              }}
            >
              {extendedLocations.map((location, index) => (
                <LocationCard key={`${location.id}-${index}`} location={location} />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {locations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(locations.length + index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (currentIndex % locations.length) === index
                    ? 'bg-yellow-primary w-8'
                    : 'bg-gray-medium/30 hover:bg-gray-medium/50'
                }`}
                aria-label={`Ir a sucursal ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="fade-up rounded-xl shadow-card overflow-hidden"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <button
                onClick={() => toggleAccordion(location.id)}
                className="w-full relative overflow-hidden"
                aria-expanded={openAccordion === location.id}
              >
                {/* Background Image for Mobile */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${location.image})` }}
                />
                <div className="absolute inset-0 bg-black/50" />
                
                <div className="relative z-10 px-6 py-4 flex items-center justify-between text-left">
                  <h3 className="font-heading font-bold text-white drop-shadow-lg">{location.name}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-yellow-primary transition-transform duration-300 ${
                      openAccordion === location.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <div
                className={`bg-gray-dark overflow-hidden transition-all duration-300 ${
                  openAccordion === location.id ? 'max-h-64' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-yellow-primary mt-0.5 flex-shrink-0" />
                      <p className="text-white/90 text-sm">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-yellow-primary flex-shrink-0" />
                      <a
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-white/90 text-sm hover:text-yellow-primary transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-yellow-primary mt-0.5 flex-shrink-0" />
                      <p className="text-white/90 text-sm">{location.hours}</p>
                    </div>
                  </div>

                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-primary text-black font-semibold text-sm py-2 w-full flex items-center justify-center gap-2 rounded-lg hover:bg-blue-flag hover:text-white transition-all duration-300"
                  >
                    Ver en Google Maps
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
