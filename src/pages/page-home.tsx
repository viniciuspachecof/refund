import { CaretLeftIcon, CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { RegistroSolicitacao } from '../components/registro-solicitacao';

export function PageHome() {
  return (
    <div className="max-w-270.5 m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md mb-6 text-gray-100">Solicitações</h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Pesquisar pelo nome"
          className="px-4 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
        />
        <button className="bg-green-100 rounded-lg p-3 cursor-pointer hover:bg-green-200 transition duration-100">
          <MagnifyingGlassIcon className="text-white" size={24} />
        </button>
      </div>

      <ul className="flex flex-col gap-4 mb-6">
        {Array.from({ length: 6 }, () => (
          <li>
            <RegistroSolicitacao />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-2.5">
        <div className="rounded-lg bg-green-100 p-1 cursor-pointer hover:bg-green-200 transition duration-100">
          <CaretLeftIcon size={24} className="text-white" />
        </div>
        <span className="text-lg">1/5</span>
        <div className="rounded-lg bg-green-100 p-1 cursor-pointer hover:bg-green-200 transition duration-100">
          <CaretRightIcon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}
