import '../App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import NotFound from './NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
