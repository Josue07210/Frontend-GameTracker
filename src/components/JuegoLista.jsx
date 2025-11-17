import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient'; 
import { Link } from 'react-router-dom';
import './JuegoLista.css';

const JuegoLista = () => {
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerJuegos = async () => {
        try {
            const response = await axiosClient.get('/juegos');
            setJuegos(response.data); 
            setLoading(false);
        } catch (err) {
            console.error('Error al obtener los juegos:', err);
            const errorMessage = err.message || 'Error desconocido al conectar con el servidor.';
            setError(errorMessage); 
            setLoading(false);
        }
    };

    // 1. FUNCIÓN DE ELIMINAR MOVIMIENTO DENTRO DEL COMPONENTE
    const eliminarJuego = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
            try {
                // Llama al backend
                await axiosClient.delete(`/juegos/${id}`);
                
                // Si tiene éxito, recarga la lista
                obtenerJuegos(); 

            } catch (error) {
                console.error('Error al eliminar el juego:', error);
                alert('Hubo un error al eliminar el juego. Revisa la consola para más detalles.');
            }
        }
    };
    // ----------------------------------------------------------------------
    
    useEffect(() => {
        obtenerJuegos();
    }, []);

    // Manejo de estado de carga y error
    if (loading) return <h2>Cargando juegos...</h2>;
    if (error) return <h2 style={{color: 'red'}}>Error: {error}</h2>;
    
    // 2. JSX COMPLETO RESTAURADO (Tu código original)
return (
        <div className="juego-lista-container"> {/* 🆕 Añadimos clase para CSS */}
            <div className="lista-header"> {/* 🆕 Nuevo contenedor para título y botón */}
                <h1>🎮 Juegos (Total: {juegos.length})</h1>
                
                {/* 🆕 BOTÓN AÑADIR NUEVO JUEGO */}
                <Link to="/nuevo" className="btn-add-game">
                    + Añadir Nuevo Juego
                </Link>
            </div>
            
            <hr /> {/* Usaremos la línea divisoria global */}

            {juegos.length === 0 ? (
                <p className="empty-message">No hay juegos registrados. ¡Añade uno!</p>
            ) : (
                <div className="juegos-grid"> {/* 🆕 Cambiamos el estilo inline a una clase */}
                    {juegos.map(juego => (
                        <div key={juego._id} className="juego-card"> {/* 🆕 Clase para el card */}
                            
                            {/* Imagen de Portada */}
                            {juego.imagenPortada && (
                                <img 
                                    src={juego.imagenPortada} 
                                    alt={`Portada de ${juego.nombre}`} 
                                    className="card-image"
                                />
                            )}
                            
                            {/* Información */}
                            <div className="card-info"> {/* 🆕 Contenedor para la info */}
                                <h3>{juego.nombre}</h3>
                                <p><strong>Género:</strong> {juego.genero}</p>
                                <p><strong>Plataforma:</strong> {juego.plataforma}</p>
                            </div>
                            
                            {/* 🆕 SECCIÓN DE ACCIONES (Botones y Ver Reseñas) */}
                            <div className="card-actions"> 
                                <Link to={`/editar/${juego._id}`} className="btn-action btn-edit">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => eliminarJuego(juego._id)} 
                                    className="btn-action btn-delete"
                                >
                                    Eliminar
                                </button>
                                
                                <hr className="action-separator"/> {/* 🆕 Línea divisora */}

                                {/* 🆕 Link "Ver Reseñas" con estilo propio */}
                                <Link to={`/juegos/${juego._id}`} className="link-reviews-card">
                                    Ver Reseñas
                                </Link>  
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}; 

export default JuegoLista;