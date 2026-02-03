import { useNavigate } from 'react-router-dom';
import logoIconeSolicitacaoEnviada from '../assets/icone-solicitacao-enviada.svg';
import type { FormEvent } from 'react';

export function PageSolicitacaoEnviado() {
  const navigate = useNavigate();

  function handleNovaSolicitacao(e: FormEvent) {
    e.preventDefault();

    navigate('/nova-solicitacao');
  }

  return (
    <div className="max-w-lg m-auto mb-14 bg-white p-10 rounded-2xl justify-center">
      <h1 className="text-green-100 text-title-lg font-bold m-6 text-center">Solicitação enviada!</h1>
      <img src={logoIconeSolicitacaoEnviada} alt="" className="m-auto mb-6" />
      <p className="text-lg text-center mb-10">
        Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato
        com você.
      </p>
      <button
        onClick={handleNovaSolicitacao}
        className="w-full bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100"
      >
        Nova solicitação
      </button>
    </div>
  );
}
