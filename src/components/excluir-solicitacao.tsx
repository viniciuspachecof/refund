import * as Dialog from '@radix-ui/react-dialog';
import { api } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

interface ExcluirSolicitacaoProps {
  id?: string;
  onSuccess: () => void;
}

export function ExcluirSolicitacao({ id, onSuccess }: ExcluirSolicitacaoProps) {
  const navigate = useNavigate();

  function handleDeletarSolicitacao() {
    try {
      api.delete(`/refunds/${id}`);
      onSuccess();

      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black-modal" />

      <Dialog.Content className="max-w-lg bg-white p-10 rounded-2xl fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
        <h2 className="font-bold text-title-md text-gray-100 mb-3">Excluir solicitação</h2>
        <p className="text-lg mb-6">Tem certeza que deseja excluir essa solicitação? Essa ação é irreversível.</p>

        <div className="flex gap-3 justify-end">
          <Dialog.DialogClose asChild>
            <button className="bg-white text-green-100 font-semibold text-lg rounded-lg p-4 cursor-pointer hover:bg-gray-500 transition duration-100">
              Cancelar
            </button>
          </Dialog.DialogClose>

          <button
            onClick={handleDeletarSolicitacao}
            className="bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100"
          >
            Confirmar
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
