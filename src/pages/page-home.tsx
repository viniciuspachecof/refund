import { CaretLeftIcon, CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { RegistroSolicitacao } from '../components/registro-solicitacao';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import type { IRefund } from '../interface/IRefund';
import { createSerializer, parseAsString, useQueryState } from 'nuqs';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const toSearchParams = createSerializer({
  q: parseAsString,
});

export function PageHome() {
  const [page, setPage] = useState(1);

  const [q, setQ] = useQueryState('q');
  const [inputValue, setInputValue] = useState('');

  const {
    data: refunds,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['refunds', page, q],
    queryFn: async () => {
      const methodGet = q ? `/refunds${toSearchParams({ q })}` : '/refunds';

      const { data } = await api.get(methodGet, {
        params: {
          page: page,
        },
      });

      return data.refunds;
    },
  });

  // efeito apenas para o toast
  useEffect(() => {
    if (isError) {
      toast.error('Erro ao carregar lista');
    }
  }, [isError]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
  }

  function handleFilterRequest() {
    setQ(inputValue);
  }

  function handlePreviousPage() {
    setPage((state) => state - 1);
  }

  function handleNextPage() {
    setPage((state) => state + 1);
  }

  return (
    <div className="max-w-270.5 m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md mb-6 text-gray-100">Solicitações</h2>

      <div className="flex gap-3 pb-6 mb-6 border-b border-gray-400">
        <input
          type="text"
          placeholder="Pesquisar pelo nome"
          className="px-4 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button
          className="bg-green-100 rounded-lg p-3 hover:cursor-pointer hover:bg-green-200 transition duration-100"
          onClick={handleFilterRequest}
        >
          <MagnifyingGlassIcon className="text-white" size={24} />
        </button>
      </div>

      {!isLoading && (
        <ul className="flex flex-col gap-2 mb-6">
          {refunds.data?.map((refund: IRefund) => (
            <li key={refund.id}>
              <RegistroSolicitacao {...refund} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && (
        <div className="flex items-center justify-center gap-2.5">
          <button
            onClick={handlePreviousPage}
            className="rounded-lg bg-green-100 p-1 enabled:hover:cursor-pointer enabled:hover:bg-green-200 transition duration-100 disabled:opacity-50"
            disabled={refunds.meta.currentPage <= 1}
          >
            <CaretLeftIcon size={24} className="text-white" />
          </button>

          <span className="text-lg">{`${refunds.meta.currentPage}/${refunds.meta.lastPage}`}</span>

          <button
            onClick={handleNextPage}
            className="rounded-lg bg-green-100 p-1 enabled:hover:cursor-pointer enabled:hover:bg-green-200 transition duration-100 disabled:opacity-50"
            disabled={refunds.meta.currentPage >= refunds.meta.lastPage}
          >
            <CaretRightIcon size={24} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
