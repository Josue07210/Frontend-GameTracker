import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import ReseniaFormulario from './ReseniaFormulario';
import './JuegoDetalle.css';

const JuegoDetalle = () => {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [reseñas, setReseñas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reseniaEditar, setReseniaEditar] = useState(null); // 🆕 reseña en edición

    // Obtener detalles del juego
    const obtenerJuego = async () => {
        try {
            const response = await axiosClient.get(`/juegos/${id}`);
            setJuego(response.data);
        } catch (error) {
            console.error('Error al obtener el juego:', error);
        }
    };

    // Obtener reseñas
    const obtenerReseñas = async () => {
        try {
            const response = await axiosClient.get(`/resenias/juego/${id}`);
            setReseñas(response.data);
        } catch (error) {
            console.error('Error al obtener reseñas:', error);
            setReseñas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerJuego();
        obtenerReseñas();
    }, [id]);

    // Eliminar reseña
    const handleEliminar = async (reseniaId) => {
        if (!window.confirm('¿Seguro quieres eliminar esta reseña?')) return;

        try {
            await axiosClient.delete(`/resenias/${reseniaId}`);
            setReseñas(reseñas.filter(r => r._id !== reseniaId));
        } catch (error) {
            console.error('Error al eliminar reseña:', error);
        }
    };

    // Editar reseña
    const handleEditar = (resenia) => {
        setReseniaEditar({
            ...resenia,
            titulo: resenia.tituloResenia,
            contenido: resenia.textoResenia,
            recomienda: resenia.recomendaria
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Callback después de crear o actualizar reseña
    const handleReseniaCreada = () => {
        setReseniaEditar(null);
        obtenerReseñas();
    };

    if (loading) return <p className="loading-message">Cargando detalles...</p>;
    if (!juego) return <p className="error-message">Juego no encontrado.</p>;

    return (
        <div className="detalle-container">
            {/* INFO DEL JUEGO */}
            <header className="game-info-header">
                {juego.imagenPortada && (
                    <img src={juego.imagenPortada} alt={`Portada de ${juego.nombre}`} className="game-cover" />
                )}
                <div className="game-details">
                    <h1>{juego.nombre}</h1>
                    <p><strong>Desarrollador:</strong> {juego.desarrollador || 'N/A'}</p>
                    <p><strong>Plataforma:</strong> {juego.plataforma}</p>
                    <p><strong>Género:</strong> {juego.genero}</p>
                    <p><strong>Año de Lanzamiento:</strong> {juego.añoLanzamiento}</p>
                </div>
            </header>

            <section className="game-description-section">
                <h3>Descripción</h3>
                <p>{juego.descripcion}</p>
            </section>

            <hr />

            {/* FORMULARIO */}
            <section className="resenia-form-section">
                <h3>{reseniaEditar ? '✏️ Editar Reseña' : '✍️ Escribe una Reseña'}</h3>
                <ReseniaFormulario
                    juegoId={id}
                    onReseniaCreada={handleReseniaCreada}
                    reseñaEditar={reseniaEditar} // 🆕 pasar reseña a editar
                />
            </section>

            <hr />

            {/* LISTA DE RESEÑAS */}
            <section className="resenia-list-section">
                <h3>⭐ Reseñas ({reseñas.length})</h3>
                {reseñas.length === 0 ? (
                    <p>Aún no hay reseñas para este juego. ¡Sé el primero!</p>
                ) : (
                    <div className="resenias-grid">
                        {reseñas.map(resenia => (
                            <div key={resenia._id} className="resenia-card">
                                <h4>{resenia.tituloResenia || 'Sin Título'}</h4>
                                <p><strong>Autor:</strong> {resenia.autor}</p>
                                <p><strong>⭐:</strong> {resenia.puntuacion}/5</p>
                                <p><strong>Horas Jugadas:</strong> {resenia.horasJugadas}</p>
                                <p><strong>Estado:</strong> {resenia.estado}</p>
                                <p>{resenia.textoResenia}</p>
                                <div className="resenia-buttons">
                                    <button onClick={() => handleEditar(resenia)} className="btn-edit">Editar</button>
                                    <button onClick={() => handleEliminar(resenia._id)} className="btn-delete">Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default JuegoDetalle;
