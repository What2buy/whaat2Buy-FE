import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home, List, TT, Login, Signup, MyPage } from './pages';
import { DefaultLayout, ProtectRoute } from 'components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 10 * 60 * 100000, // 10분
      cacheTime: 30 * 60 * 100000, // 30분
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<ProtectRoute />}>
              <Route path="/list" element={<List />} />
              <Route path="/tt" element={<TT />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
