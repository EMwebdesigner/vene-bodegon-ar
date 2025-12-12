import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5491136003950"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="whatsapp-float"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
