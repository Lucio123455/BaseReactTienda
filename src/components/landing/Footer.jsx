import React from 'react';

const footerLinks = [
  {
    title: "Tienda",
    links: ["Mujer", "Hombre", "Accesorios", "Ofertas"]
  },
  {
    title: "Ayuda",
    links: ["Contacto", "Envíos", "Devoluciones", "Tallas"]
  },
  {
    title: "Empresa",
    links: ["Sobre Nosotros", "Sostenibilidad", "Prensa", "Carreras"]
  }
];

const Footer = ({ onFeatureClick }) => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold text-gray-900">MINIMAL</span>
            <p className="text-gray-600">
              Redefiniendo la elegancia a través del minimalismo y la calidad excepcional.
            </p>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <span className="font-semibold text-gray-900">{section.title}</span>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <button
                    key={link}
                    onClick={onFeatureClick}
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 MINIMAL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;