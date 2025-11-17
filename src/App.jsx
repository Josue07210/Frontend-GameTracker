import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// ⚠️ CORRECCIÓN: Añadida la extensión .jsx para asegurar la resolución
import JuegoLista from './components/JuegoLista.jsx'; 
import JuegoFormulario from './components/JuegoFormulario.jsx';
import JuegoDetalle from './components/JuegoDetalle.jsx';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal.jsx';

// ⚠️ CORRECCIÓN: Añadida la extensión .css (si no se resuelve automáticamente)
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="main-header p-4 bg-gray-800 shadow-lg flex justify-between items-center">
          {/* Título de la App y botón "Biblioteca de Juegos" */}
          <h1 className="logo-title text-3xl font-extrabold text-purple-400">GameTracker</h1>
          <Link 
            to="/biblioteca" 
            className="btn-library bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            Biblioteca de Juegos
          </Link>
        </header>

        <main className="p-4 md:p-8">
          <Routes> {/* Usamos Routes en lugar de Route(s) */}
            {/* 1. Ruta principal (Landing) */}
            <Route path="/" element={<PaginaPrincipal />} /> 
            
            {/* 2. Ruta para la lista de juegos */}
            <Route path="/biblioteca" element={<JuegoLista />} /> 
            
            {/* 3. Ruta para añadir nuevo juego */}
            <Route path="/nuevo" element={<JuegoFormulario />} /> 
            
            {/* 4. Ruta para editar juego (con ID dinámico) */}
            <Route path="/editar/:id" element={<JuegoFormulario />} /> 
            
            {/* 5. ⚠️ RUTA CLAVE: Para ver los detalles del juego y sus reseñas */}
            <Route path="/juegos/:id" element={<JuegoDetalle />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;