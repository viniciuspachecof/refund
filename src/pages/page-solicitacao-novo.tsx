import { zodResolver } from '@hookform/resolvers/zod';
import { CloudArrowUpIcon } from '@phosphor-icons/react';
import { useRef, useState, type ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import { NumericFormat } from 'react-number-format';

const refundForm = z.object({
  title: z.string().min(1, 'Informe sua solicitação'),
  category: z.string().min(1, 'Informe uma categoria'),
  value: z.number().min(0.01, 'Informe um valor'),
});

type RefundForm = z.infer<typeof refundForm>;

export function PageSolicitacaoNovo() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [errorAttachment, setErrorAttachment] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RefundForm>({
    resolver: zodResolver(refundForm),
    defaultValues: {
      value: 0,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  function handleAttachment() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorAttachment('Tamanho máximo do arquivo é de 2MB');
      return;
    }

    setFile(file);
    setErrorAttachment('');
  }

  async function handleSendRequest(data: RefundForm) {
    if (!file) {
      setErrorAttachment('Informe um comprovante');
      return;
    }

    try {
      const { data: response } = await api.post(
        '/receipts',
        {
          receiptFile: file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      await api.post('/refunds', {
        title: data.title,
        category: data.category,
        value: data.value,
        receipt: response.receipt.id,
      });

      navigate('/solicitacao-enviada');
    } catch (error) {
      toast.error('Erro ao cadastrar solicitação');

      throw error;
    }
  }

  return (
    <div className="max-w-lg m-auto mb-14 bg-white p-10 rounded-2xl">
      <h2 className="font-bold text-title-md text-gray-100 mb-3">Nova solicitação de reembolso</h2>
      <p className="text-lg">Dados da despesa para solicitar reembolso.</p>

      <form onSubmit={handleSubmit(handleSendRequest)} className="mt-10">
        <div className="mb-8">
          <label className="text-sm inline-block mb-2">NOME DA SOLICITAÇÃO</label>
          <input
            type="text"
            className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
            {...register('title')}
          />
          {errors.title && <p className="text-error text-md">{errors.title.message}</p>}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-2">
            <label className="text-sm inline-block mb-2">CATEGORIA</label> <br />
            <select
              className="px-4 py-3 border border-gray-300 text-gray-200 text-lg rounded-lg outline-none w-full"
              {...register('category')}
            >
              <option value="">Selecione</option>
              <option value="food">Alimentação</option>
              <option value="hosting">Hospedagem</option>
              <option value="transport">Transporte</option>
              <option value="services">Serviços</option>
              <option value="other">Outros</option>
            </select>
            {errors.category && <p className="text-error text-md">{errors.category.message}</p>}
          </div>

          <div className="flex-1">
            <label className="text-sm inline-block mb-2">VALOR</label>
            <Controller
              control={control}
              name="value"
              render={({ field }) => (
                <NumericFormat
                  className="px-4 py-3 border border-gray-300 text-gray-200 text-lg w-full rounded-lg outline-none focus:border-green-100"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  onValueChange={(v) => field.onChange(v.floatValue)}
                  value={field.value}
                />
              )}
            />
            {errors.value && <p className="text-error text-md">{errors.value.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm inline-block mb-2">COMPROVANTE</label>
          <div className="flex border border-gray-300  rounded-lg">
            <input
              type="text"
              className="px-4 py-3 text-gray-200 text-lg w-full outline-none focus:border-green-100 disabled:bg-gray-400"
              disabled
              value={file?.name || ''}
            />
            <button
              className="p-3 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition duration-100"
              onClick={handleAttachment}
              type="button"
            >
              <CloudArrowUpIcon size={24} className="text-white" />
            </button>
            <input type="file" ref={inputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
          </div>
          {errorAttachment && <p className="text-error text-md">{errorAttachment}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-100 text-white font-bold text-lg rounded-lg p-4 cursor-pointer hover:bg-green-200 transition duration-100"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
