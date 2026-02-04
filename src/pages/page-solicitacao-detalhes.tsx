import { FileIcon } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { ExcluirSolicitacao } from '../components/excluir-solicitacao';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import type { IRefund } from '../interface/IRefund';

export function PageSolicitacaoDetalhes() {
  const [refund, setRefund] = useState<IRefund>();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get(`/refunds/${id}`);

      setRefund(data.refund);
    }

    fetchData();
  }, [id]);

  return (
    <div className="max-w-lg m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md text-gray-100 mb-3">Solicitação de reembolso</h2>
      <p className="text-lg">Dados da despesa para solicitar reembolso.</p>

      <form action="" className="mt-10">
        <div className="mb-8">
          <label className="text-sm inline-block mb-2">NOME DA SOLICITAÇÃO</label>
          <input
            type="text"
            className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100 disabled:bg-gray-400"
            disabled
            value={refund?.title}
          />
        </div>

        <div className="flex gap-4 mb-10">
          <div className="flex-2">
            <label className="text-sm inline-block mb-2">CATEGORIA</label> <br />
            <select
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg rounded-lg outline-none w-full disabled:bg-gray-400"
              name=""
              id=""
              disabled
              value={refund?.category}
            >
              <option value="food">Alimentação</option>
              <option value="hosting">Hospedagem</option>
              <option value="transport">Transporte</option>
              <option value="services">Serviços</option>
              <option value="other">Outros</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm inline-block mb-2">VALOR</label>
            <input
              type="text"
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100 disabled:bg-gray-400"
              disabled
              value={refund?.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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

        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Trigger asChild>
            <button className="w-full bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100">
              Excluir
            </button>
          </Dialog.Trigger>

          <ExcluirSolicitacao id={refund?.id} onSuccess={() => setModalOpen(false)} />
        </Dialog.Root>
      </form>
    </div>
  );
}
