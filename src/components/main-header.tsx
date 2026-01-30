import logoRefund from '../assets/refund-logo.svg';
import { Link } from 'react-router-dom';

export function MainHeader() {
  return (
    <div className="my-10 mx-22.5 flex justify-between items-center">
      <Link to="/">
        <img src={logoRefund} alt="" />
      </Link>

      <div className="flex gap-9">
        <Link to="/" className="flex items-center text-green-100 font-semibold text-lg">
          Solicitações de reembolso
        </Link>

        <Link
          to="/nova-solicitacao"
          className="text-white px-5 py-3.75 bg-green-100 text-lg rounded-lg font-bold hover:bg-green-200 transition duration-100"
        >
          Nova solicitação
        </Link>
      </div>
    </div>
  );
}
