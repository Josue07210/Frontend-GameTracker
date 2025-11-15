import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JuegoLista from './components/JuegoLista';
import JuegoFormulario from './components/JuegoFormulario'; 
import JuegoDetalle from './components/JuegoDetalle'; 
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal.jsx';
import './App.css';


function App() {
  return (
    <Router>
      <div style={{ padding: '0px' }}>
        <header className="main-header"> {/* Clase para el CSS */}
            {/* Título de la web y botón de "Biblioteca de Juegos" */}
            <h1 className="logo-title">GameTracker</h1>
          <Link to="/biblioteca" className="btn-library">Biblioteca de Juegos</Link> {/* La ruta a /biblioteca */}
         </header>

        
        <Routes> 
           <Route path="/" element={<PaginaPrincipal />} />  {/*  La ruta principal es la Landing */}
           <Route path="/biblioteca" element={<JuegoLista />} />  {/*  La lista de juegos va a /biblioteca */}
           <Route path="/nuevo" element={<JuegoFormulario />} /> 
           <Route path="/editar/:id" element={<JuegoFormulario />} />
           <Route path="/juegos/:id" element={<JuegoDetalle />} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;