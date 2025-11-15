import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import ReseniaFormulario from './ReseniaFormulario'; 

// Este componente se encargará de: Obtener los datos del juego (GET /api/juegos/:id).

// Obtener las reseñas de ese juego (GET /api/reseñas?juegoId=:id).

// Y de mostrar el formulario de creación de reseñas.

// Esta función se encarga de renderizar las estrellas de puntuación
const renderEstrellas = (puntuacion) => {
    const estrellasLlenas = '★'.repeat(puntuacion);
    const estrellasVacias = '☆'.repeat(5 - puntuacion);
    const estrellasCompletas = estrellasLlenas + estrellasVacias; 
    

    return (
        <span style={{ 
            color: 'gold', 
           
            letterSpacing: '-2px', // Reduce el espacio entre las estrellas
            fontWeight: 'bold'      // Hace que las estrellas sean más gruesas
        }}>
            {estrellasCompletas}
        </span>
    );
};

const JuegoDetalle = () => {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [resenias, setResenias] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerDatos = async () => {
        try {
            // 1. Obtener el juego (GET /api/juegos/:id)
            const juegoRes = await axiosClient.get(`/juegos/${id}`);
            setJuego(juegoRes.data);

            // 2. Obtener las reseñas (GET /api/resenias?juegoId=...)
            const reseniasRes = await axiosClient.get(`/resenias?juegoId=${id}`);
            setResenias(reseniasRes.data);

            setLoading(false);
        } catch (error) {
            console.error('Error al cargar detalles:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, [id]);
    
    // Función para actualizar las reseñas después de crear una nueva
    const handleReseniaCreada = () => {
        obtenerDatos(); // Recarga los datos para incluir la nueva reseña
    };

    if (loading) return <h2>Cargando detalles del juego...</h2>;
    if (!juego) return <h2>Juego no encontrado.</h2>;



    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '10px' }}>{juego.nombre}</h1>
            <img src={juego.imagenPortada} alt={`Portada de ${juego.nombre}`} style={{ maxWidth: '300px', height: 'auto', marginBottom: '20px' }} />
            <p><strong>Desarrollador:</strong> {juego.desarrollador}</p>
            <p><strong>Descripción:</strong> {juego.descripcion}</p>
            <p><strong>Plataforma:</strong> {juego.plataforma}</p>
            <p><strong>Género:</strong> {juego.genero}</p>
           

            <hr style={{ margin: '30px 0' }} />

            <h2>Escribe una Reseña</h2>
            {/* 2. FORMULARIO DE CREACIÓN */}
            <ReseniaFormulario juegoId={juego._id} onReseniaCreada={handleReseniaCreada} />
            
            <hr style={{ margin: '30px 0' }} />

            <h2>📝 Reseñas ({resenias.length})</h2>
            {/* 3. LISTA DE RESEÑAS */}
            {resenias.length === 0 ? (
                <p>¡Crea tu reseña!</p>
            ) : (
                resenias.map(resenia => (
                    <div key={resenia._id} style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
                        <h4>{resenia.titulo} - Puntuación: {renderEstrellas(resenia.puntuacion)}
</h4>
                        <p>{resenia.textoResenia}</p>
                        <p><small>Estado: {resenia.estado}Por: {resenia.autor} | Horas jugadas: {resenia.horasJugadas}</small></p>
                        <h4>{resenia.titulo} - Puntuación: {resenia.puntuacion}/5</h4>
                      
                    </div>

                ))
            )}
        </div>
    );
};

export default JuegoDetalle;