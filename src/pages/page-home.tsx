import { CaretLeftIcon, CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { RegistroSolicitacao } from '../components/registro-solicitacao';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/axios';
import type { IRefund } from '../interface/IRefund';
import { createSerializer, parseAsString, useQueryState } from 'nuqs';
import { debounce } from '../helpers/utils';

interface InfoListRefunds {
  currentPage: number;
  lastPage: number;
}

const toSearchParams = createSerializer({
  q: parseAsString,
});

export function PageHome() {
  const [refunds, setRefunds] = useState<IRefund[]>();
  const [infoListRefunds, setInfoListRefunds] = useState<InfoListRefunds>({
    currentPage: 0,
    lastPage: 0,
  });
  const [q, setQ] = useQueryState('q');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchDataFiltrado() {
      const { data } = await api.get(`/refunds${toSearchParams({ q })}`);

      setRefunds(data.refunds.data);
      setInfoListRefunds(data.refunds.meta);
    }

    async function fetchData() {
      const { data } = await api.get('/refunds');

      setRefunds(data.refunds.data);
      setInfoListRefunds(data.refunds.meta);
    }

    if (q) {
      fetchDataFiltrado();
    } else {
      fetchData();
    }
  }, []);

  const debouncedSetValue = useMemo(() => {
    return debounce((value: string) => {
      setQ(value);
    }, 200);
  }, [setQ]);

  async function listasFiltradas() {
    const { data } = await api.get(`/refunds${toSearchParams({ q })}`);

    setRefunds(data.refunds.data);
    setInfoListRefunds(data.refunds.meta);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  async function handlePreviousPage() {
    const previousPage = infoListRefunds.currentPage - 1;

    const { data } = await api.get('/refunds', {
      params: {
        page: previousPage,
      },
    });

    setRefunds(data.refunds.data);
    setInfoListRefunds(data.refunds.meta);
  }

  async function handleNextPage() {
    const nextPage = infoListRefunds.currentPage + 1;

    const { data } = await api.get('/refunds', {
      params: {
        page: nextPage,
      },
    });

    setRefunds(data.refunds.data);
    setInfoListRefunds(data.refunds.meta);
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
          className="bg-green-100 rounded-lg p-3 cursor-pointer hover:bg-green-200 transition duration-100"
          onClick={listasFiltradas}
        >
          <MagnifyingGlassIcon className="text-white" size={24} />
        </button>
      </div>

      <ul className="flex flex-col gap-2 mb-6">
        {refunds?.map((refund) => (
          <li key={refund.id}>
            <RegistroSolicitacao {...refund} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-2.5">
        <button
          onClick={handlePreviousPage}
          className="rounded-lg bg-green-100 p-1 cursor-pointer hover:bg-green-200 transition duration-100"
        >
          <CaretLeftIcon size={24} className="text-white" />
        </button>

        <span className="text-lg">{`${infoListRefunds.currentPage}/${infoListRefunds.lastPage}`}</span>

        <button
          onClick={handleNextPage}
          className="rounded-lg bg-green-100 p-1 cursor-pointer hover:bg-green-200 transition duration-100"
        >
          <CaretRightIcon size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
