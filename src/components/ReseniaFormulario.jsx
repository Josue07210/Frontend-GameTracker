import React, { useState } from 'react';
import axiosClient from '../config/axiosClient';

const initialState = {
    textoResenia: '',
    puntuacion: 5,
    autor: '',
    horasJugadas: 0,
    recomendaria: true,
    estado: 'Pendiente'
};

// Recibe juegoId y una función de callback para recargar la lista
const ReseniaFormulario = ({ juegoId, onReseniaCreada }) => {
    const [resenia, setResenia] = useState(initialState);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setResenia({
            ...resenia,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const reseniaData = {
                ...resenia,
                juegoId: juegoId, // <--- ID OBLIGATORIO ASIGNADO
                puntuacion: Number(resenia.puntuacion),
                horasJugadas: Number(resenia.horasJugadas)
            };
            
            // Endpoint POST /api/resenias
            await axiosClient.post('/resenias', reseniaData); 

            alert('Reseña creada con éxito!');
            setResenia(initialState); // Limpia el formulario
            onReseniaCreada(); // Llama a la función del padre para recargar la lista de reseñas

        } catch (error) {
            console.error('Error al crear la reseña:', error.response.data);
            alert('Error al crear la reseña. Revisa la consola para detalles.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <input type="text" name="autor" value={resenia.autor} onChange={handleChange} placeholder="Tu Nombre" required />
            
            <textarea name="textoResenia" value={resenia.textoResenia} onChange={handleChange} placeholder="Escribe tu reseña..." required />

            <label>Puntuación (1-5):</label>
            <input type="number" name="puntuacion" value={resenia.puntuacion} onChange={handleChange} min="1" max="5" required />
            
            <label>Horas Jugadas:</label>
            <input type="number" name="horasJugadas" value={resenia.horasJugadas} onChange={handleChange} min="0" />

            <label>Estado del juego (al momento de reseñar):</label>
                <select name="estado" value={resenia.estado} onChange={handleChange} required>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completado">Completado</option>
                </select>

            <label>
                <input type="checkbox" name="recomendaria" checked={resenia.recomendaria} onChange={handleChange} /> 
                ¿Lo recomendarías?
            </label>
            
            <button type="submit" style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Enviar Reseña</button>
        </form>
    );
};

export default ReseniaFormulario;