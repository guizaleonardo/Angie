import { BrandLogo } from '../BrandLogo/BrandLogo';

export function Header() {
  return (
    <div className="top">
      <BrandLogo />
      <div className="top-titles">
        <h1>Rondas de seguridad del paciente</h1>
        <span className="sub">Guía Técnica de Buenas Prácticas · Resolución 3100 de 2019</span>
      </div>
    </div>
  );
}
