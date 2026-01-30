import { CloudArrowUpIcon } from '@phosphor-icons/react';

export function PageSolicitacaoNovo() {
  return (
    <div className="max-w-lg m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md text-gray-100 mb-3">Nova solicitação de reembolso</h2>
      <p className="text-lg">Dados da despesa para solicitar reembolso.</p>

      <form action="" className="mt-10">
        <div className="mb-8">
          <label className="text-sm inline-block mb-2">NOME DA SOLICITAÇÃO</label>
          <input
            type="text"
            className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-2">
            <label className="text-sm inline-block mb-2">CATEGORIA</label> <br />
            <select
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg rounded-lg outline-none w-full"
              name=""
              id=""
            ></select>
          </div>

          <div className="flex-1">
            <label className="text-sm inline-block mb-2">VALOR</label>
            <input
              type="text"
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm inline-block mb-2">COMPROVANTE</label>
          <div className="flex border border-gray-300  rounded-lg">
            <input type="text" className="px-4 py-3 text-gray-200 text-lg w-full outline-none focus:border-green-100" />
            <button className="p-3 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition duration-100">
              <CloudArrowUpIcon size={24} className="text-white" />
            </button>
          </div>
        </div>

        <button className="w-full bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100">
          Enviar
        </button>
      </form>
    </div>
  );
}
