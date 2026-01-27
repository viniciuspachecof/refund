import logoRefund from '../assets/refund-logo.svg';
import { NavLink } from 'react-router-dom';

export function MainHeader() {
  return (
    <div className="my-10 mx-[5.625rem] flex justify-between items-center">
      <img src={logoRefund} alt="" />

      <div className="flex gap-4">
        <NavLink to="/" className="text-green-100 font-semibold text-lg px-5 py-3.75">
          Solicitações de reembolso
        </NavLink>

        <NavLink
          to="/solicitacao"
          className="text-white px-5 py-3.75 bg-green-100 text-lg rounded-lg font-bold hover:bg-green-200 transition duration-100"
        >
          Nova solicitação
        </NavLink>
      </div>
    </div>
  );
}
