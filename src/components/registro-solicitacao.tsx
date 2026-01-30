import { ForkKnifeIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export function RegistroSolicitacao() {
  return (
    <Link to="/solicitacao/1">
      <div className="flex gap-3 hover:bg-gray-500 p-1 rounded-lg">
        <div className="p-2 rounded-full bg-gray-400">
          <ForkKnifeIcon size={18} weight="fill" className="text-green-100" />
        </div>
        <div className="flex flex-col w-full leading-3">
          <span className="font-bold text-lg text-gray-100">Rodrigo</span>
          <span className="text-md">Alimentacao</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-md">R$</span>
          <span className="font-semibold text-lg text-gray-100">34,78</span>
        </div>
      </div>
    </Link>
  );
}
