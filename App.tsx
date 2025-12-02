import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { ArrowRightIcon, BriefcaseIcon, ChevronDownIcon, CodeBracketIcon, DesignIcon, FolderIcon, InstagramIcon, LightbulbIcon, MailIcon, QuoteIcon, RocketLaunchIcon, ScaleIcon, TvIcon, WhatsAppIcon, CloseIcon, ClockIcon, TrendingUpIcon, SparklesIcon, CpuIcon, PhotoIcon, ChatBubbleIcon, MainLogo } from './components/Icons';
import { PortfolioPage } from './components/PortfolioPage';
import { ChangelogModal } from './components/ChangelogModal';
import { ParticleBackground } from './components/ParticleBackground';

// --- Sound Hook Logic ---
const CLICK_SOUND_DATA_URL = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';

const useClickSound = () => {
    const audio = useMemo(() => typeof Audio !== 'undefined' ? new Audio(CLICK_SOUND_DATA_URL) : null, []);
    const playClickSound = useCallback(() => {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => console.error("Error playing sound:", error));
        }
    }, [audio]);
    return playClickSound;
};

// --- Animation Component ---
interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${className} transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'}`}
            style={{ animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- Data Structure ---
interface CardData {
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    badge?: string;
    detailSubtitle: string;
    detailDescription: string;
    slug?: string;
    tags?: string[];
}

interface NavLink {
    href: string;
    label: string;
    page: 'home' | 'portfolio';
}


// --- Section Components ---

const Header: React.FC<{ 
    onLinkClick: () => void;
    setPage: (page: 'home' | 'portfolio') => void;
    setScrollToId: (id: string | null) => void;
    currentPage: string;
}> = ({ onLinkClick, setPage, setScrollToId, currentPage }) => {
    const navLinks: NavLink[] = [
        { href: '#', label: 'Portfólio', page: 'portfolio' },
        { href: '#process', label: 'Processo', page: 'home' },
        { href: '#projects', label: 'Projetos', page: 'home' },
        { href: '#faq', label: 'FAQ', page: 'home' },
        { href: '#contact', label: 'Contato', page: 'home' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
        onLinkClick();
        e.preventDefault();

        if (link.page === 'portfolio') {
            setPage('portfolio');
            window.scrollTo(0, 0);
        } else if (link.page === 'home') {
            const sectionId = link.href.substring(1);
            if (currentPage !== 'home') {
                setPage('home');
                setScrollToId(sectionId);
            } else {
                 const section = document.getElementById(sectionId);
                 section?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onLinkClick();
      e.preventDefault();
      setPage('home');
      setScrollToId('hero');
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-neutral">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#hero" onClick={handleLogoClick} className="font-poppins font-bold text-2xl text-dark tracking-wide">
                        Axium <span className="text-detail">Studio</span>
                    </a>
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link)} className="font-montserrat text-sm font-medium text-dark/80 hover:text-detail transition-colors duration-300">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

const Hero: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
    const handleScrollDown = () => {
        onButtonClick();
        document.getElementById('highlight')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="hero" className="min-h-screen flex items-center pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                <div className="flex justify-center mb-8">
                    <img 
                        src="https://i.imgur.com/iFBcuzW.png" 
                        alt="Axium Studio Logo" 
                        className="w-32 h-32 object-contain hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <h1 className="font-poppins font-extrabold text-4xl md:text-6xl text-dark leading-tight">
                    O Eixo onde tudo se <span className="text-detail">encontra.</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto font-montserrat text-dark/70 md:text-lg">
                    Axium Studio é a central criativa e vitrine principal de Thales — um apresentador geral de todos os seus projetos, produtos e criações. Representa o ponto de convergência entre ideias, marcas e produções, servindo como um hub que conecta tudo com identidade, conceito e propósito.
                </p>
                <div className="mt-10">
                    <button onClick={handleScrollDown} className="group inline-flex items-center justify-center gap-2 bg-dark text-primary font-poppins font-semibold py-3 px-8 rounded-xl shadow-lg shadow-detail/10 hover:bg-detail transition-all duration-300 transform hover:-translate-y-1">
                        Explorar Projetos
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

const Highlight: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
    const handleClick = () => {
        onButtonClick();
        window.open('https://api.whatsapp.com/send?phone=5553991257648&text=Gostaria%20de%20saber%20mais%20sobre%20seu%20servi%C3%A7o%20de%20Landing%20Pages', '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="highlight" className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="bg-secondary/50 rounded-3xl p-8 md:p-12 border border-neutral">
                         <div className="text-center">
                            <h2 className="font-poppins font-bold text-sm text-detail tracking-widest uppercase">Em Destaque</h2>
                            <h3 className="mt-4 font-poppins font-bold text-3xl md:text-4xl text-dark">Criação de Sites e Páginas de Vendas</h3>
                            <p className="mt-4 max-w-xl mx-auto font-montserrat text-dark/70">
                                Não deixe seu negócio com uma apresentação simples. Valorize seu trabalho com um site de qualidade e conversão!
                            </p>
                            <button onClick={handleClick} className="mt-8 group inline-flex items-center justify-center gap-2 bg-dark text-primary font-poppins font-semibold py-3 px-8 rounded-xl shadow-md shadow-detail/10 hover:bg-dark/80 transition-all duration-300 transform hover:-translate-y-1">
                                🟢 Saber Mais
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const AxiumAiSection: React.FC<{ onButtonClick: () => void }> = ({ onButtonClick }) => {
    const handleClick = () => {
        onButtonClick();
        window.open('https://axium-ai.vercel.app/', '_blank', 'noopener,noreferrer');
    };

    const features = [
        { icon: ChatBubbleIcon, label: 'Chat AI' },
        { icon: PhotoIcon, label: 'Gerador de Imagens' },
        { icon: DesignIcon, label: 'Social Design' },
    ];

    return (
        <section className="py-12 mb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="relative overflow-hidden bg-primary border-2 border-detail/20 rounded-[2.5rem] p-8 md:p-14 hover:border-detail/50 transition-all duration-500 group shadow-2xl shadow-detail/5">
                        {/* Background Deco */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-detail/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-detail/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        {/* Badge */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8">
                             <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-detail/10 text-detail font-poppins text-xs font-bold tracking-widest uppercase border border-detail/20 animate-pulse">
                                <SparklesIcon className="w-3 h-3" />
                                Flagship Product
                            </span>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            
                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="font-poppins font-black text-4xl md:text-5xl text-dark mb-4">
                                    Axium <span className="text-detail">AI</span>
                                </h2>
                                <p className="font-montserrat text-lg text-dark/70 mb-8 max-w-md mx-auto md:mx-0">
                                    A ferramenta mais aclamada do estúdio. Uma suíte completa com Chat, Geração de Imagens e Design.
                                </p>

                                {/* Mini Features Grid */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                                    {features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-neutral text-sm font-medium text-dark/70">
                                            <feat.icon className="w-4 h-4 text-detail" />
                                            {feat.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Coder Highlight */}
                                <div className="bg-dark/5 rounded-2xl p-6 border border-dark/10 relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-1 h-full bg-detail"></div>
                                     <div className="flex items-start gap-4">
                                        <div className="bg-white p-2.5 rounded-xl shadow-sm text-detail shrink-0">
                                            <CpuIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-poppins font-bold text-xl text-dark mb-1">AXIUM CODER</h3>
                                            <p className="font-montserrat text-sm text-dark/70">
                                                A joia da coroa. Crie sites inteiros com inteligência artificial em segundos diretamente no Axium AI.
                                            </p>
                                        </div>
                                     </div>
                                </div>

                                <button 
                                    onClick={handleClick} 
                                    className="mt-8 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-detail text-white font-poppins font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-detail/20 hover:bg-detail/90 hover:scale-105 transition-all duration-300"
                                >
                                    <RocketLaunchIcon className="w-5 h-5" />
                                    Acessar Axium AI
                                </button>
                            </div>

                             {/* Visual Representation (Abstract/Iconography) */}
                            <div className="flex-1 w-full max-w-sm md:max-w-none flex justify-center items-center">
                                <div className="relative w-full aspect-square md:aspect-auto md:h-80 bg-gradient-to-br from-detail/10 to-transparent rounded-3xl border border-detail/10 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-20 p-4">
                                        {[...Array(36)].map((_, i) => (
                                            <div key={i} className="bg-detail/20 rounded-md animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                                        ))}
                                    </div>
                                    
                                    <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                        <CodeBracketIcon className="w-16 h-16 text-detail mx-auto mb-4" />
                                        <div className="font-mono text-sm text-dark/50 mb-2">&lt;AxiumCoder /&gt;</div>
                                        <div className="font-poppins font-bold text-dark text-xl">Gerando seu site...</div>
                                        <div className="w-32 h-1.5 bg-neutral rounded-full mx-auto mt-4 overflow-hidden">
                                            <div className="h-full bg-detail w-2/3 animate-[shimmer_1.5s_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}

const Section: React.FC<{id: string, title: string, subtitle?: string, children: React.ReactNode }> = ({id, title, subtitle, children}) => (
    <section id={id} className={`py-20`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
                <div className="text-center">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark">{title}</h2>
                    {subtitle && <p className="mt-4 max-w-2xl mx-auto font-montserrat text-dark/60">{subtitle}</p>}
                </div>
            </RevealOnScroll>
            <div className="mt-12">
                {children}
            </div>
        </div>
    </section>
);

const ProcessSection = () => {
    const steps = [
        {
            icon: BriefcaseIcon,
            title: "Briefing e Imersão",
            description: "Entendemos profundamente seu negócio, objetivos e público. Uma conversa estratégica para alinhar visão."
        },
        {
            icon: LightbulbIcon,
            title: "Proposta e Conceito",
            description: "Desenvolvemos a proposta detalhada e o conceito criativo. É aqui que as ideias começam a tomar forma."
        },
        {
            icon: CodeBracketIcon,
            title: "Design e Tech",
            description: "Criação de design e desenvolvimento do código, com feedbacks constantes para garantir perfeição."
        },
        {
            icon: RocketLaunchIcon,
            title: "Lançamento",
            description: "Lançamos o projeto e oferecemos suporte contínuo para garantir o sucesso e a estabilidade da sua plataforma."
        },
    ];

    return (
        <section id="process" className="py-24 bg-secondary/20 relative overflow-hidden border-y border-neutral">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-detail/10 text-detail font-poppins text-xs font-bold tracking-widest uppercase mb-4 border border-detail/20">
                            Como trabalhamos
                        </span>
                        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark">Nosso Processo</h2>
                        <p className="mt-4 max-w-2xl mx-auto font-montserrat text-dark/60">
                            Da ideia ao lançamento, seguimos um fluxo claro, organizado e colaborativo para garantir a excelência.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 border-t-2 border-dashed border-neutral -z-10 mt-2"></div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const stepNumber = String(index + 1).padStart(2, '0');
                        
                        return (
                            <RevealOnScroll key={index} delay={index * 150} className="h-full">
                                <div className="group h-full bg-transparent border border-neutral rounded-2xl p-6 transition-all duration-300 md:hover:border-detail md:hover:bg-secondary/30 md:hover:-translate-y-2 flex flex-col relative overflow-hidden">
                                    <span className="absolute -top-2 -right-2 text-6xl font-poppins font-bold text-neutral/40 opacity-40 md:opacity-20 md:group-hover:opacity-40 transition-opacity select-none">
                                        {stepNumber}
                                    </span>

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-detail md:group-hover:scale-110 transition-transform duration-300 border border-neutral">
                                            <Icon className="w-6 h-6"/>
                                        </div>
                                        <div className="text-xs font-mono font-bold text-dark/30 bg-neutral/50 px-2 py-1 rounded">
                                            PASSO {stepNumber}
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-poppins text-lg font-bold mb-3 text-detail md:text-dark md:group-hover:text-detail transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="font-montserrat text-dark/70 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "O Thales não apenas entregou um site incrível, mas capturou a essência da minha marca. O processo foi transparente e o resultado superou todas as expectativas. Recomendo de olhos fechados!",
            name: "Juliana Almeida",
            role: "Fundadora da Dália Cosméticos",
        },
        {
            quote: "Precisávamos de uma identidade visual forte para o lançamento do nosso produto e o Axium Studio foi a escolha certa. Profissionalismo, criatividade e um resultado final que nos enche de orgulho.",
            name: "Marcos Ferreira",
            role: "Diretor de Marketing na InovaTech",
        }
    ];

    return (
        <Section id="testimonials" title="O que os clientes dizem" subtitle="A confiança e a satisfação de quem trabalha conosco é o nosso maior ativo.">
            <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <RevealOnScroll key={index} delay={index * 150} className="h-full">
                        <div className="bg-transparent p-8 rounded-2xl border border-neutral h-full">
                            <QuoteIcon className="w-8 h-8 text-secondary mb-4" />
                            <p className="font-montserrat text-dark/80 italic mb-6">"{testimonial.quote}"</p>
                            <div>
                                <p className="font-poppins font-semibold text-dark">{testimonial.name}</p>
                                <p className="font-montserrat text-sm text-dark/60">{testimonial.role}</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </Section>
    )
}

const FaqSection = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqData = [
        {
            question: "Quanto tempo leva para desenvolver um site?",
            answer: "O tempo de desenvolvimento varia conforme a complexidade do projeto. Uma Landing Page simples pode levar de 1 a 2 semanas, enquanto um site institucional completo pode levar de 3 a 6 semanas. Após nossa conversa inicial, forneceremos um cronograma detalhado."
        },
        {
            question: "O que está incluso no serviço de identidade visual?",
            answer: "Nosso pacote de identidade visual inclui a criação de logotipo (com variações), definição de paleta de cores, tipografia, e um manual de marca básico. Também podemos incluir templates para redes sociais e outros materiais, conforme a necessidade do seu negócio."
        },
        {
            question: "Vocês oferecem suporte após a entrega do projeto?",
            answer: "Sim! Oferecemos um período de suporte gratuito de 30 dias após o lançamento de um site para corrigir eventuais bugs. Também temos planos de manutenção e suporte contínuo para garantir que seu site esteja sempre atualizado e seguro."
        },
        {
            question: "Como funciona o processo de pagamento?",
            answer: "Geralmente, trabalhamos com um sinal de 50% do valor total para iniciar o projeto e os 50% restantes na entrega. Somos flexíveis e podemos discutir outras formas de pagamento que se adequem à sua necessidade."
        }
    ];

    return (
        <Section id="faq" title="Perguntas Frequentes">
            <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                    <RevealOnScroll key={index} delay={index * 100}>
                        <div className="border border-neutral rounded-xl overflow-hidden bg-secondary/20">
                            <button 
                                className="w-full flex justify-between items-center text-left p-5 hover:bg-neutral/50 transition-colors"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                aria-expanded={openFaq === index}
                            >
                                <span className="font-poppins font-medium text-dark">{faq.question}</span>
                                <ChevronDownIcon className={`w-5 h-5 text-detail flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === index && (
                                <div className="px-5 pb-5 pt-2">
                                    <p className="font-montserrat text-dark/70 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </Section>
    );
}


const AboutSection = () => {
    const aboutData = {
        conceito: {
            title: 'Conceito',
            content: `O <strong>Axium Studio</strong> nasceu de uma necessidade fundamental: criar um ponto de convergência. Em um mundo de ideias dispersas e projetos que muitas vezes não se conectam, o estúdio serve como um eixo — um <span class="font-semibold text-detail">axium</span> — que une criatividade, tecnologia e propósito em um só lugar. Não é apenas uma vitrine, mas o ecossistema onde cada criação de Thales Kaleby ganha vida, identidade e, acima de tudo, um propósito claro.`
        },
        missao: {
            title: 'Missão',
            content: `Nossa missão é simples: transformar conceitos em realidade tangível e impactante. Seja desenvolvendo um site que converte, uma identidade visual que emociona ou uma ferramenta que simplifica, cada serviço oferecido aqui é uma peça de um quee-cabeça maior. Acreditamos que a verdadeira inovação acontece na interseção de diferentes disciplinas, e o Axium Studio é o mapa para essa interseção.`
        },
        essencia: {
            title: 'Essência',
            content: `A essência do estúdio está na busca incessante pela qualidade e pela coerência. Tudo o que você vê aqui compartilha do mesmo DNA: uma paixão por resolver problemas de forma elegante e uma dedicação para entregar valor que vai além do esperado. Bem-vindo ao eixo onde tudo se encontra.`
        }
    };

    return (
        <section id="about" className="py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="text-center">
                        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark">Sobre o Axium Studio</h2>
                        <p className="mt-4 font-poppins text-sm text-detail tracking-widest uppercase">Conceito, Missão e Essência</p>
                    </div>
                </RevealOnScroll>

                <div className="mt-12 space-y-12">
                    {Object.values(aboutData).map((item, index) => (
                        <RevealOnScroll key={item.title} delay={index * 150}>
                            <div>
                                <h3 className="font-poppins font-bold text-2xl text-dark mb-4 text-center">{item.title}</h3>
                                <p
                                    className="font-montserrat text-dark/80 text-justify leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};


const Contact: React.FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => {
    const socialLinks = [
        { icon: InstagramIcon, href: 'https://instagram.com/th.ksx', label: 'Instagram' },
        { icon: WhatsAppIcon, href: 'https://wa.me/53991257648', label: 'WhatsApp' },
        { icon: MailIcon, href: 'mailto:thaleskaleby24@gmail.com', label: 'E-mail' },
    ];

    return (
        <section id="contact" className="py-20 bg-secondary/20 border-y border-neutral">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <RevealOnScroll>
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl text-dark">Conecte-se comigo</h2>
                    <div className="mt-8 flex justify-center space-x-6">
                        {socialLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={onLinkClick}
                                    aria-label={link.label}
                                    className="text-dark/60 hover:text-detail transition-colors duration-300 transform hover:scale-110"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <Icon className="w-8 h-8" />
                                </a>
                            );
                        })}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const Footer: React.FC<{ onOpenChangelog: () => void }> = ({ onOpenChangelog }) => (
    <footer className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <p className="font-montserrat text-sm text-dark/50 text-center">© 2025 Axium Studio — Todos os direitos reservados.</p>
            <p className="font-montserrat text-sm text-dark/50 mt-1">Construído por Thales Kaleby.</p>
            
            <button 
                onClick={onOpenChangelog}
                className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral/50 hover:bg-detail/10 text-xs font-semibold text-dark/60 hover:text-detail transition-all duration-300 group"
            >
                <ClockIcon className="w-3 h-3 group-hover:animate-pulse" />
                Versão 1.2.0
            </button>
        </div>
    </footer>
);


const DetailModal: React.FC<{ item: CardData; onClose: () => void; onLinkClick: () => void }> = ({ item, onClose, onLinkClick }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onLinkClick();
        if (item.buttonLink && item.buttonLink !== '#') {
          window.open(item.buttonLink, '_blank', 'noopener,noreferrer');
        }
    };
    
    const IconComponent = item.icon;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 backdrop-blur-sm animate-fade-in-up"
            style={{ animationDuration: '0.4s' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-secondary rounded-3xl p-8 md:p-10 border border-neutral w-11/12 max-w-2xl m-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-dark/50 hover:text-dark transition-colors" aria-label="Fechar">
                   <CloseIcon className="w-6 h-6" />
                </button>

                <div className="flex items-start gap-5">
                    {IconComponent && <div className="text-detail mt-1"><IconComponent className="w-10 h-10 flex-shrink-0" /></div>}
                    <div className="flex-grow">
                        <h2 id="modal-title" className="font-poppins text-2xl md:text-3xl font-bold text-dark">{item.title}</h2>
                        <p className="font-poppins text-detail font-medium mt-1">{item.detailSubtitle}</p>
                    </div>
                </div>

                <div className="mt-6 font-montserrat text-dark/80 text-justify space-y-4 max-h-[40vh] overflow-y-auto pr-4">
                    {item.detailDescription.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>

                {item.buttonText && (
                    <div className="mt-8 text-right">
                        <a 
                            href={item.buttonLink || '#'}
                            onClick={handleLinkClick}
                            className="group inline-flex items-center justify-center gap-2 bg-dark text-primary font-poppins font-semibold py-2 px-6 rounded-xl shadow-md shadow-detail/10 hover:bg-detail transition-all duration-300"
                        >
                            {item.buttonText}
                            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const ManifestoSection = () => (
    <section className="py-24 text-center px-4 sm:px-6">
        <RevealOnScroll>
            <div className="max-w-4xl mx-auto">
                <div className="w-20 h-1 bg-detail mx-auto mb-10 rounded-full"></div>
                <h2 className="font-montserrat text-xl md:text-3xl leading-relaxed text-dark/70 font-normal">
                    “A Axium nasceu da <span className="font-bold text-dark">inquietação</span>. Da vontade de criar, experimentar e transformar cada ideia em algo <span className="font-bold text-dark">funcional</span>, <span className="font-bold text-dark">bonito</span> e <span className="font-bold text-dark">útil</span>.
                    <br className="hidden md:block" />
                    Somos o laboratório onde a criatividade encontra a <span className="font-bold text-dark">tecnologia</span>.”
                </h2>
            </div>
        </RevealOnScroll>
    </section>
);

const App = () => {
    const [page, setPage] = useState<'home' | 'portfolio'>('home');
    const [scrollToId, setScrollToId] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const [isChangelogOpen, setIsChangelogOpen] = useState(false);
    const playClickSound = useClickSound();

    useEffect(() => {
        if (page === 'home' && scrollToId) {
             const element = document.getElementById(scrollToId);
             if (element) {
                 setTimeout(() => {
                     element.scrollIntoView({ behavior: 'smooth' });
                     setScrollToId(null);
                 }, 100);
             }
        }
    }, [page, scrollToId]);

    const handleOpenChangelog = () => {
        playClickSound();
        setIsChangelogOpen(true);
    };

    const handleCloseChangelog = () => {
        setIsChangelogOpen(false);
    };

    if (page === 'portfolio') {
        return (
            <div className="relative z-10">
                <PortfolioPage onNavigateBack={() => { playClickSound(); setPage('home'); }} />
            </div>
        );
    }

    const projects: CardData[] = [
         {
            icon: TvIcon,
            title: "Criação de Sites",
            description: "Landing pages de alta conversão, sites institucionais e portfólios. Desenvolvidos com tecnologias modernas para garantir velocidade e SEO.",
            detailSubtitle: "Sua presença digital começa aqui.",
            detailDescription: "Desenvolvemos sites que não são apenas bonitos, mas funcionais. Focamos na experiência do usuário (UX) e na interface (UI) para garantir que seu visitante se torne um cliente.\n\nUtilizamos React, TailwindCSS e otimizações de performance para garantir que seu site carregue instantaneamente.",
            buttonText: "Orçar Projeto",
            buttonLink: "https://wa.me/53991257648",
            slug: "criacao-de-sites",
            tags: ["landing pages", "sites institucionais", "SEO", "React", "performance"]
        },
        {
            icon: DesignIcon,
            title: "Identidade Visual",
            description: "Logotipos, paletas de cores e manuais de marca. Criamos a identidade visual completa para que seu negócio seja reconhecido e lembrado.",
            detailSubtitle: "Design que marca.",
            detailDescription: "Uma marca forte é essencial para se destacar no mercado. Nosso processo de criação de identidade visual envolve pesquisa, conceito e design refinado para transmitir os valores da sua empresa visualmente.",
            buttonText: "Ver Pacotes",
            buttonLink: "https://wa.me/53991257648",
            slug: "identidade-visual",
            tags: ["branding", "logotipos", "design gráfico", "identidade corporativa"]
        },
        {
            icon: ScaleIcon,
            title: "Consultoria Tech",
            description: "Análise e otimização de presença digital. Ajudamos você a escolher as melhores ferramentas e estratégias para crescer online.",
            detailSubtitle: "Estratégia e Tecnologia.",
            detailDescription: "Não sabe por onde começar? Nossa consultoria técnica avalia seu negócio e propõe as melhores soluções digitais, desde a escolha da plataforma até a integração de ferramentas de automação.",
            buttonText: "Agendar Reunião",
            buttonLink: "https://wa.me/53991257648",
            slug: "consultoria-tech",
            tags: ["consultoria", "transformação digital", "estratégia", "automação"]
        },
        {
            icon: FolderIcon,
            title: "Acervo NewGen",
            description: "Plataforma dedicada ao compartilhamento e organização de material educacional, conectando estudantes a um vasto acervo de cursos.",
            detailSubtitle: "Conhecimento sem barreiras.",
            detailDescription: "O Acervo NewGen é uma iniciativa voltada para a educação digital. A plataforma centraliza cursos de diversas áreas em um ambiente amigável e responsivo. O foco do desenvolvimento foi criar uma estrutura leve, rápida e fácil de navegar, permitindo que o usuário encontre o conteúdo desejado com o mínimo de cliques.",
            buttonText: "Acessar Acervo",
            buttonLink: "https://newgen-ruby.vercel.app/",
            slug: "acervo-newgen",
            tags: ["educação", "plataforma de cursos", "web app", "material gratuito"]
        },
        {
            icon: LightbulbIcon,
            title: "Inspira Cursos",
            description: "Plataforma de cursos com foco em conhecimento livre e acessível. Design convidativo para incentivar a exploração.",
            detailSubtitle: "Conhecimento que transforma.",
            detailDescription: "A Inspira Cursos é uma plataforma dedicada à democratização do ensino. Com uma interface moderna e acolhedora, foi projetada para facilitar a jornada do aluno, oferecendo uma experiência de navegação fluida e intuitiva entre diversos conteúdos educacionais.",
            buttonText: "Acessar Plataforma",
            buttonLink: "https://inspiracourses.vercel.app/",
            slug: "inspira-cursos",
            tags: ["educação", "cursos online", "plataforma ead", "design intuitivo"]
        },
        {
            icon: TrendingUpIcon,
            title: "Axify Social SMM",
            description: "Axify Social é o braço especializado da Axium voltado para soluções SMM rápidas, seguras e de alta qualidade.",
            detailSubtitle: "Impulsione suas redes sociais.",
            detailDescription: "Oferecemos serviços como seguidores, curtidas e visualizações com entrega acelerada e preço justo, ideal para impulsionar perfis no Instagram e TikTok.",
            buttonText: "Ver Planos",
            buttonLink: "https://wa.me/53991257648",
            slug: "axify-social-smm",
            tags: ["social media", "marketing digital", "engajamento", "SMM", "instagram"]
        }
    ];

    return (
        <div className="bg-primary min-h-screen text-dark font-montserrat selection:bg-detail selection:text-white relative">
            <ParticleBackground />
            <div className="relative z-10">
                <Header onLinkClick={playClickSound} setPage={setPage} setScrollToId={setScrollToId} currentPage={page} />
                <main>
                    <Hero onButtonClick={playClickSound} />
                    <Highlight onButtonClick={playClickSound} />
                    
                    <AxiumAiSection onButtonClick={playClickSound} />

                    <Section id="projects" title="Soluções Criativas" subtitle="Conheça nossas principais áreas de atuação e como podemos elevar o nível do seu projeto.">
                        <div className="grid md:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <RevealOnScroll key={index} delay={index * 150} className="h-full">
                                    <ProjectCard 
                                        {...project} 
                                        onButtonClick={() => { playClickSound(); setSelectedCard(project); }} 
                                    />
                                </RevealOnScroll>
                            ))}
                        </div>
                    </Section>
                    
                    <ManifestoSection />

                    <ProcessSection />
                    <TestimonialsSection />
                    <FaqSection />
                    <AboutSection />
                    <Contact onLinkClick={playClickSound} />
                </main>
                <Footer onOpenChangelog={handleOpenChangelog} />

                {selectedCard && (
                    <DetailModal 
                        item={selectedCard} 
                        onClose={() => setSelectedCard(null)} 
                        onLinkClick={playClickSound}
                    />
                )}

                {isChangelogOpen && (
                    <ChangelogModal onClose={handleCloseChangelog} />
                )}
            </div>
        </div>
    );
};

export default App;
