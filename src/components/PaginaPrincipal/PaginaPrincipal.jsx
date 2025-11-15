import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css'; 

const PaginaPrincipal = () => {
    // Datos de sugerencia 
    const juegosSugeridos = [
        { id: 1, nombre: 'Título del videojuego 1', plataforma: 'PLATAFORMA', genero: 'GÉNERO' },
        { id: 2, nombre: 'Título del videojuego 2', plataforma: 'PLATAFORMA', genero: 'GÉNERO' },
        { id: 3, nombre: 'Título del videojuego 3', plataforma: 'PLATAFORMA', genero: 'GÉNERO' },
    ];

    return (
        <div className="landing-container">
            {/* 1. SECCIÓN DE INTRODUCCIÓN */}
            <section className="intro-card">
                <h2 className="intro-title">GameTracker - ¡Donde podrás mostrar con tus reseñas un punto de vista único y confiable!</h2>
                <div className="separator-line"></div> {/* Línea divisora */}
                <p className="intro-description">
                    GameTracker es un sitio sencillo de usar, en el que podrás encontrar reseñas a juegos que
                    tengas en mente jugar, pero que todavía no estás convencido de darles una oportunidad.
                    También en este sitio podrás agregar videojuegos que quieras que otras personas o tú
                    puedan reseñar, así podrás mostrar la reseña de ese videojuego que tanto te gusta al
                    mundo y que vean tu opinión tan única que le den ganas de probarlo a las demás personas,
                    o puede que quieras que las personas eviten probar un videojuego que te decepcionó, de
                    esa manera darás a conocer a las personas una reseña que los hará pensar dos veces sí
                    darle una oportunidad.
                </p>
            </section>
            
            {/* 2. SECCIÓN DE JUEGOS SUGERIDOS */}
            <section className="suggested-games-section">
                <h3>🎮 Juegos Sugeridos para Reseñar</h3>
                <div className="suggested-games-grid">
                    {juegosSugeridos.map(juego => (
                        <div key={juego.id} className="game-suggestion-card">
                            <div className="placeholder-image"></div> {/* Placeholder para la imagen */}
                            <h4>{juego.nombre}</h4>
                            <p>Plataforma: **{juego.plataforma}**</p>
                            <p>Género: **{juego.genero}**</p>
                            <Link to={`/juegos/${juego.id}`} className="link-reviews">Ver Reseñas</Link>
                        </div>
                    ))}
                </div>
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