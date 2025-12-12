import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Products from '@/components/Products';
import Offers from '@/components/Offers';
import Testimonials from '@/components/Testimonials';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VeneBodegón - Productos Venezolanos en Argentina | Harina PAN, Malta, Tequeños</title>
        <meta
          name="description"
          content="Tu bodegón venezolano en Argentina. Encontrá Harina PAN, malta, tequeños, queso de mano y todos los productos típicos de Venezuela. 4 sucursales en Buenos Aires."
        />
        <meta
          name="keywords"
          content="productos venezolanos argentina, harina pan, malta, tequeños, comida venezolana, bodegón venezolano, arepas, cachapas"
        />
        <meta property="og:title" content="VeneBodegón - Productos Venezolanos en Argentina" />
        <meta
          property="og:description"
          content="Encontrá todos los productos venezolanos que extrañás. Harina PAN, malta, tequeños, queso de mano y más. ¡Sabores de tu tierra en Argentina!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_AR" />
        <link rel="canonical" href="https://venebodegon.com.ar" />
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "VeneBodegón",
            "description": "Productos venezolanos auténticos en Argentina",
            "url": "https://venebodegon.com.ar",
            "telephone": "+54-11-3600-3950",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Av. Santa Fe 2345",
                "addressLocality": "Martínez",
                "addressRegion": "Buenos Aires",
                "addressCountry": "AR"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Av. Córdoba 4567",
                "addressLocality": "Palermo, CABA",
                "addressCountry": "AR"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Av. Cabildo 1234",
                "addressLocality": "Belgrano, CABA",
                "addressCountry": "AR"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Av. Centenario 789",
                "addressLocality": "San Isidro",
                "addressRegion": "Buenos Aires",
                "addressCountry": "AR"
              }
            ],
            "priceRange": "$$",
            "openingHours": "Mo-Sa 09:00-20:00"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <AboutUs />
          <Products />
          <Offers />
          <Testimonials />
          <Locations />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
