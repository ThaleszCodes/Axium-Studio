
import React, { useEffect } from 'react';
import { CloseIcon, ClockIcon } from './Icons';

interface ChangelogModalProps {
    onClose: () => void;
}

interface VersionData {
    version: string;
    date: string;
    title: string;
    changes: string[];
}

const changelogData: VersionData[] = [
    {
        version: "1.2.0",
        date: "12 Fev 2025",
        title: "Expansão de Portfólio",
        changes: [
            "Nova página dedicada 'Portfólio' com navegação suave.",
            "Cards de projetos interativos com links externos.",
            "Melhorias de acessibilidade e SEO."
        ]
    },
    {
        version: "1.1.0",
        date: "20 Jan 2025",
        title: "Otimizações de UX",
        changes: [
            "Adição da seção de FAQ interativa.",
            "Implementação de sons de feedback ao clique.",
            "Ajustes nas animações de entrada (fade-in)."
        ]
    },
    {
        version: "1.0.0",
        date: "05 Jan 2025",
        title: "Lançamento Oficial",
        changes: [
            "Lançamento do Axium Studio.",
            "Integração com API do WhatsApp para orçamentos.",
            "Design system e identidade visual definidos."
        ]
    }
];

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ onClose }) => {
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

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/70 backdrop-blur-sm animate-fade-in-up"
            style={{ animationDuration: '0.3s' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="changelog-title"
        >
            <div 
                className="bg-secondary/80 backdrop-blur-lg border border-neutral rounded-3xl p-6 md:p-8 w-11/12 max-w-lg m-4 relative max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                         <div className="bg-neutral/50 p-2 rounded-xl text-detail">
                            <ClockIcon className="w-6 h-6" />
                         </div>
                        <div>
                            <h2 id="changelog-title" className="font-poppins font-bold text-xl md:text-2xl text-dark">Changelog</h2>
                            <p className="font-montserrat text-xs text-dark/60">Histórico de Versões</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-dark/40 hover:text-dark transition-colors p-2 rounded-full hover:bg-neutral/50"
                        aria-label="Fechar"
                    >
                       <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto pr-2 -mr-2 space-y-8 pb-4">
                    {changelogData.map((item, index) => (
                        <div key={item.version} className="relative pl-6 border-l-2 border-neutral last:border-0">
                             <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-secondary ${index === 0 ? 'bg-detail' : 'bg-neutral'}`}></div>
                             
                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                <h3 className="font-poppins font-bold text-lg text-dark">{item.title}</h3>
                                <div className="flex items-center gap-2">
                                     <span className="font-mono text-xs font-semibold bg-neutral px-2 py-0.5 rounded text-dark/70">{item.version}</span>
                                     <span className="font-montserrat text-xs text-dark/40">{item.date}</span>
                                </div>
                             </div>
                             
                             <ul className="space-y-2">
                                {item.changes.map((change, i) => (
                                    <li key={i} className="font-montserrat text-sm text-dark/70 flex items-start gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-dark/30 mt-2 flex-shrink-0"></span>
                                        {change}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    ))}
                    
                    <div className="pl-6 pt-2">
                        <div className="font-montserrat text-xs text-dark/40 italic">Início do projeto</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
