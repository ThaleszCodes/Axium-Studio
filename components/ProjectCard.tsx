import React from 'react';
import { ArrowRightIcon } from './Icons';

interface ProjectCardProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  badge?: string;
  onButtonClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ icon, title, description, onButtonClick }) => {

  const IconComponent = icon;

  const cardContent = (
     <div 
        className="group bg-transparent border border-neutral rounded-2xl p-6 hover:border-detail transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={onButtonClick}
      >
      {IconComponent && <div className="mb-4 text-detail"><IconComponent className="w-8 h-8" /></div>}
      <h3 className="font-poppins text-xl font-semibold mb-2 text-dark">{title}</h3>
      <p className="font-montserrat text-dark/70 text-sm flex-grow mb-6">{description}</p>
      
      <div className="mt-auto pt-2">
          <span className="flex items-center gap-2 text-sm font-medium font-poppins text-detail">
              Ver detalhes
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
      </div>
    </div>
  )

  return cardContent;
};
