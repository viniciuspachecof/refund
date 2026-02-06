import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageHome } from './pages/page-home';
import { PageSolicitacaoDetalhes } from './pages/page-solicitacao-detalhes';
import { LayoutMain } from './pages/layout-main';
import { PageSolicitacaoNovo } from './pages/page-solicitacao-novo';
import { PageSolicitacaoEnviado } from './pages/page-solicitacao-enviado';
import { NuqsAdapter } from 'nuqs/adapters/react';

function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<PageHome />} />
            <Route path="/solicitacao/:id" element={<PageSolicitacaoDetalhes />} />
            <Route path="/nova-solicitacao" element={<PageSolicitacaoNovo />} />
            <Route path="/solicitacao-enviada" element={<PageSolicitacaoEnviado />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}

export default App;
