import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient'; 

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
            setError('Error al cargar la lista de juegos.');
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerJuegos();
    }, []);

    // Manejo de estado de carga y error (corrección de errores anteriores)
    if (loading) return <h2>Cargando juegos...</h2>;
    if (error) return <h2 style={{color: 'red'}}>Error: {error}</h2>;
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>🎮 Mis Juegos (Total: {juegos.length})</h1>
            
            {juegos.length === 0 ? (
                <p>No hay juegos registrados. ¡Añade uno!</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {juegos.map(juego => (
                        <div key={juego._id} style={{ border: '1px solid #333', padding: '15px', borderRadius: '5px', width: '300px' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{juego.nombre}</h3>
                            <p><strong>Género:</strong> {juego.genero}</p>
                            <p><strong>Plataforma:</strong> {juego.plataforma}</p>
                            <p><strong>Estado:</strong> {juego.estado}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JuegoLista;