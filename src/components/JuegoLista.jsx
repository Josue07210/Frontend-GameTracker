import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient'; 
import { Link } from 'react-router-dom';

const JuegoLista = () => {
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerJuegos = async () => { // Función que hace la petición al backend
        try {
            const response = await axiosClient.get('/juegos');
            setJuegos(response.data); 
            setLoading(false);
        } catch (err) {
            console.error('Error al obtener los juegos:', err);
                // Si hay un error de red (como un servidor apagado), err.response puede ser undefined.
                // La propiedad .message del error se usa para manejarlo de forma segura.
            const errorMessage = err.message || 'Error desconocido al conectar con el servidor.';
            setError(errorMessage); 
            setLoading(false);
    }
};

    useEffect(() => {
        obtenerJuegos();
    }, []);

    // Manejo de estado de carga y error (corrección de errores anteriores)
    if (loading) return <h2>Cargando juegos...</h2>;
    if (error) return <h2 style={{color: 'red'}}>Error: {error}</h2>;
    
    // En src/components/JuegoLista.jsx, el bloque de retorno:

return (
    <div style={{ padding: '20px' }}>
        <h1>🎮 Juegos (Total: {juegos.length})</h1>
        
        {juegos.length === 0 ? (
            <p>No hay juegos registrados. ¡Añade uno!</p>
        ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {juegos.map(juego => (
                    // El card principal
                    <div key={juego._id} style={{ border: '1px solid #333', padding: '15px', borderRadius: '5px', width: '300px' }}>
                        
                        {/* Imagen de Portada */}
                        {juego.imagenPortada && (
                            <img 
                                src={juego.imagenPortada} 
                                alt={`Portada de ${juego.nombre}`} 
                                style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }} 
                            />
                        )}
                        
                        {/* Información */}
                        <h3 style={{ margin: '0 0 10px 0' }}>{juego.nombre}</h3>
                        <p><strong>Género:</strong> {juego.genero}</p>
                        <p><strong>Plataforma:</strong> {juego.plataforma}</p>
                        <p><strong>Estado:</strong> {juego.estado}</p>
                        
                        {/* Botones de Acción */}
                        <Link to={`/editar/${juego._id}`} style={{ 
                            display: 'inline-block', 
                            marginTop: '10px', 
                            marginRight: '10px',
                            padding: '5px 10px', 
                            backgroundColor: 'blue', 
                            color: 'white', 
                            textDecoration: 'none',
                            borderRadius: '3px'
                        }}>
                            Editar
                        </Link>
                        <button 
                            onClick={() => eliminarJuego(juego._id)} 
                            style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Eliminar
                        </button>
                        <h3 style={{ margin: '0 0 10px 0' }}>
                            {juego.nombre}
                        {/*link al detalle del juego*/}
                        <Link to={`/juegos/${juego._id}`} style={{ marginLeft: '10px', fontSize: '12px', color: 'green', textDecoration: 'none' }}>
                        (Ver Reseñas)
                        </Link>                   
                        </h3>
                    </div>
                ))}
            </div>
        )}
    </div>
)}; 




const eliminarJuego = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
        try {
            await axiosClient.delete(`/juegos/${id}`);
            
            // Si tiene éxito, recarga la lista para que el juego desaparezca
            obtenerJuegos(); 

        } catch (error) {
            console.error('Error al eliminar el juego:', error);
            alert('Hubo un error al eliminar el juego. Revisa la consola.');
        }
    }
};
// ...

export default JuegoLista;