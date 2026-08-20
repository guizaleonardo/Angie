const LOGO_SRC = `${import.meta.env.BASE_URL}LOGO%20CLIPI.jpeg`;

interface BrandLogoProps {
  className?: string;
  height?: number;
}

export function BrandLogo({ className = 'top-logo', height = 48 }: BrandLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="Clínica Piedecuesta S.A. — Primero Piedecuesta, Primero en Salud"
      className={className}
      height={height}
    />
  );
}

export { LOGO_SRC };
