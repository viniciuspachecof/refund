import { ForkKnifeIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../utils/formatter';

interface RegistroSolicitacaoProps {
  id: string;
  title: string;
  category: string;
  value: number;
}

export function RegistroSolicitacao({ title, category, value, id }: RegistroSolicitacaoProps) {
  return (
    <Link to={`/solicitacao/${id}`}>
      <div className="flex gap-3 hover:bg-gray-500 p-1 rounded-lg">
        <div className="p-2 rounded-full bg-gray-400">
          <ForkKnifeIcon size={18} weight="fill" className="text-green-100" />
        </div>
        <div className="flex flex-col w-full leading-3">
          <span className="font-bold text-lg text-gray-100">{title}</span>
          <span className="text-md">{category}</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-lg text-gray-100">{priceFormatter.format(value)}</span>
        </div>
      </div>
    </Link>
  );
}
