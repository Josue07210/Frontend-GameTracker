import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient.jsx';
import './PaginaPrincipal.css'; 

const PaginaPrincipal = () => {
    //  Estado para guardar los juegos de la API
    const [juegos, setJuegos] = useState([]); 
    const [loading, setLoading] = useState(true);

    //  Función para obtener todos los juegos
    const obtenerJuegos = async () => { 
        try {
            const response = await axiosClient.get('/juegos');
            setJuegos(response.data); 
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los juegos sugeridos:', error);
            // Si falla, al menos que muestre la estructura vacía
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerJuegos();
    }, []);

    // Seleccionamos solo los primeros 3 juegos (para simular sugerencias)
    const juegosSugeridos = juegos.slice(0, 3); 

    return (
        <div className="landing-container">
            {/* 1. SECCIÓN DE INTRODUCCIÓN */}
            <section className="intro-card">
                <h2 className="intro-title">GameTracker - ¡Donde podrás mostrar con tus reseñas un punto de vista único y confiable!</h2>
                <div className="separator-line"></div> {/* Línea divisora */}
                <p className="intro-description">
                    GameTracker es un sitio sencillo de usar en el que podrás encontrar reseñas de juegos que tengas en mente jugar, pero a los que aún no estás completamente convencido de darles una oportunidad. Además, en este sitio podrás agregar videojuegos para que otras personas —o tú mismo— puedan reseñarlos. De esta forma, podrás mostrar al mundo tu opinión sobre ese videojuego que tanto te gusta y contagiar a otros las ganas de probarlo.

                    También podrás compartir reseñas de juegos que te hayan decepcionado, para ayudar a otros a pensarlo dos veces antes de darles una oportunidad.
                </p>
            </section>
            
            {/* 2. SECCIÓN DE JUEGOS SUGERIDOS */}
            <section className="suggested-games-section">
                <h3>🎮 Juegos Sugeridos para Reseñar</h3>
                
                {loading ? (
                    <p style={{textAlign: 'center'}}>Cargando sugerencias...</p>
                ) : (
                    <div className="suggested-games-grid">
                        {juegosSugeridos.length === 0 ? (
                            <p style={{gridColumn: '1 / -1', textAlign: 'center'}}>No hay juegos registrados para sugerir.</p>
                        ) : (
                            juegosSugeridos.map(juego => (
                                // 🔄 Usamos los datos reales del juego en la tarjeta
                                <div key={juego._id} className="game-suggestion-card">
                                    {juego.imagenPortada ? (
                                        <img 
                                            src={juego.imagenPortada} 
                                            alt={`Portada de ${juego.nombre}`} 
                                            className="suggestion-image"
                                        />
                                    ) : (
                                        <div className="placeholder-image"></div>
                                    )}
                                    
                                    <h4>{juego.nombre}</h4>
                                    <p>Plataforma: **{juego.plataforma}**</p>
                                    <p>Género: **{juego.genero}**</p>
                                    <Link to={`/juegos/${juego._id}`} className="link-reviews">Ver Reseñas</Link>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>
            
            {/* 3. FOOTER */}
            <footer className="main-footer">
                <p>Jhonnatan Josué Ortiz Ospina</p>
                <p>&copy; {new Date().getFullYear()} GameTracker. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default PaginaPrincipal;