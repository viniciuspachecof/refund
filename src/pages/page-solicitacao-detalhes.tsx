import { FileIcon } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { ExcluirSolicitacao } from '../components/excluir-solicitacao';

export function PageSolicitacaoDetalhes() {
  return (
    <div className="max-w-lg m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md text-gray-100 mb-3">Solicitação de reembolso</h2>
      <p className="text-lg">Dados da despesa para solicitar reembolso.</p>

      <form action="" className="mt-10">
        <div className="mb-8">
          <label className="text-sm inline-block mb-2">NOME DA SOLICITAÇÃO</label>
          <input
            type="text"
            className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
            disabled
          />
        </div>

        <div className="flex gap-4 mb-10">
          <div className="flex-2">
            <label className="text-sm inline-block mb-2">CATEGORIA</label> <br />
            <select
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg rounded-lg outline-none w-full"
              name=""
              id=""
              disabled
            ></select>
          </div>

          <div className="flex-1">
            <label className="text-sm inline-block mb-2">VALOR</label>
            <input
              type="text"
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-center mb-7">
          <a
            href=""
            className="text-green-100 font-semibold text-lg flex items-center gap-1.75 hover:text-green-200 transition duration-100"
          >
            <FileIcon size={18} weight="bold" /> Abrir comprovante
          </a>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="w-full bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100">
              Excluir
            </button>
          </Dialog.Trigger>

          <ExcluirSolicitacao />
        </Dialog.Root>
      </form>
    </div>
  );
}
