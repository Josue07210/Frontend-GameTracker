import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JuegoLista from './components/JuegoLista';
import JuegoFormulario from './components/JuegoFormulario'; 
import JuegoDetalle from './components/JuegoDetalle'; 

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <header>
          {/* Navegación simple */}
          <Link to="/" style={{ marginRight: '20px' }}>Lista de Juegos</Link>
          <Link to="/nuevo">Añadir Nuevo Juego</Link>
        </header>

        <hr style={{ margin: '20px 0' }} />

        <Routes>        
          <Route path="/" element={<JuegoLista />} />          
          <Route path="/nuevo" element={<JuegoFormulario />} /> 
          // En src/App.jsx, dentro de "Routes"
          <Route path="/" element={<JuegoLista />} />
          <Route path="/nuevo" element={<JuegoFormulario />} />            
          <Route path="/editar/:id" element={<JuegoFormulario />} />
          // En src/App.jsx, dentro de "Routes"
          <Route path="/editar/:id" element={<JuegoFormulario />} /> 
          <Route path="/juegos/:id" element={<JuegoDetalle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;