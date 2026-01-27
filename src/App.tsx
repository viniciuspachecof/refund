import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageHome } from './pages/page-home';
import { PageSolicitacao } from './pages/page-solicitacao';
import { LayoutMain } from './pages/layout-main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<PageHome />} />
            <Route path="/solicitacao" element={<PageSolicitacao />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
