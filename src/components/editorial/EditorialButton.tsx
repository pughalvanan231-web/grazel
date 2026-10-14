import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { Magnetic } from './Magnetic';

export interface EditorialButtonProps {
  to: string;
  variant?: 'primary' | 'white' | 'ghost' | 'outline' | 'pill';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  dataCursor?: string;
  magnetic?: boolean;
}

export function EditorialButton({
  to,
  variant = 'primary',
  icon,
  children,
  className = '',
  dataCursor,
  magnetic = false,
}: EditorialButtonProps) {
  const base =
    'relative inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-semibold font-sans transition-all duration-300 group overflow-hidden';

  const variants: Record<string, string> = {
    primary:
      'px-8 py-4 bg-gold hover:bg-[#8B6540] text-white shadow-md rounded-full',
    pill:
      'px-8 py-3.5 bg-charcoal text-white hover:bg-gold rounded-full shadow-md',
    white:
      'px-8 py-4 border border-white/40 hover:border-white text-white hover:bg-white/10 backdrop-blur-xs rounded-full',
    ghost:
      'px-0 py-2 text-charcoal hover:text-gold !overflow-visible',
    outline:
      'px-8 py-4 border border-charcoal/20 hover:border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory rounded-full',
  };

  const buttonContent = (
    <Link
      to={to}
      data-cursor={dataCursor}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'ghost' && (
        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
      )}
      {icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </Link>
  );

  if (magnetic) {
    return <Magnetic strength={0.25}>{buttonContent}</Magnetic>;
  }

  return buttonContent;
}

export default EditorialButton;
