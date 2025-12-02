
import React from 'react';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from './Icons';

interface PortfolioPageProps {
  onNavigateBack: () => void;
}

const portfolioData = [
  {
    imgSrc: "https://i.imgur.com/w20oL8t.png",
    title: "NewGen Cursos",
    description: "Landing page para a divulgação de um vasto acervo de cursos online. Foco em design limpo, navegação intuitiva e alta conversão para captação de leads.",
    liveUrl: "https://newgen-ruby.vercel.app/"
  },
  {
    imgSrc: "https://i.imgur.com/FKbc00d.jpeg",
    title: "FOPE 126ª CIA",
    description: "Site de apresentação para a Força Pratriota Estudantil, apresentando a história, missão e valores da companhia. Design sóbrio e imponente para transmitir autoridade.",
    liveUrl: "https://fope126cia.vercel.app/"
  },
  {
    imgSrc: "https://i.imgur.com/RsKzZpQ.png",
    title: "Zenin Designs",
    description: "Página de portfólio para um designer, focada em uma experiência visual impactante. Layout moderno com animações sutis para destacar os projetos criativos.",
    liveUrl: "https://zenin-designs.vercel.app/"
  },
  {
    imgSrc: "https://i.imgur.com/TISmkGu.png",
    title: "Projeta Cursos",
    description: "Plataforma de vendas para cursos preparatórios. A arquitetura foi pensada para facilitar a jornada do usuário, desde a descoberta do curso até a finalização da compra.",
    liveUrl: "https://projeta-teste.vercel.app/"
  },
  {
    imgSrc: "https://i.imgur.com/0lAc8vl.png",
    title: "Inspira Cursos",
    description: "Plataforma de cursos com foco em conhecimento livre e acessível. O layout foi projetado para ser convidativo e de fácil navegação, incentivando a exploração e o aprendizado.",
    liveUrl: "https://inspiracourses.vercel.app/"
  }
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigateBack }) => {
  return (
    <div className="relative z-10">
      <section id="portfolio" className="py-20 min-h-screen animate-fade-in-up pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark">Portfólio</h2>
              <button onClick={onNavigateBack} className="group flex items-center gap-2 text-sm font-medium font-poppins text-dark/80 hover:text-detail transition-colors duration-300">
                  <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Voltar
              </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {portfolioData.map((item, index) => (
              <div key={index} className="bg-transparent border border-neutral rounded-2xl overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}>
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img src={item.imgSrc} alt={`Screenshot do projeto ${item.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-poppins text-xl font-semibold mb-2 text-dark">{item.title}</h3>
                  <p className="font-montserrat text-dark/70 text-sm mb-6">{item.description}</p>
                  <a 
                    href={item.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/link inline-flex items-center justify-center gap-2 bg-dark text-primary font-poppins font-semibold py-2 px-6 rounded-lg shadow-md shadow-detail/10 hover:bg-detail transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Visitar Site
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
