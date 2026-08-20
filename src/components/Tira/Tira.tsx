import type { Item } from '../../types';

interface TiraProps {
  items: Item[];
  resultados: Record<string, { r?: string }>;
}

export function Tira({ items, resultados }: TiraProps) {
  return (
    <div className="tira">
      {items.map((item) => (
        <i key={item.id} className={resultados[item.id]?.r || ''} title={item.id} />
      ))}
    </div>
  );
}
