import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient';
import './ReseniaFormulario.css';

const initialState = {
    titulo: '',
    contenido: '',
    puntuacion: 5,
    autor: '',
    horasJugadas: 0,
    recomienda: true,
    estado: 'Pendiente'
};

const ReseniaFormulario = ({ juegoId, onReseniaCreada, reseñaEditar }) => {
    const [resenia, setResenia] = useState(initialState);


    useEffect(() => {
        if (reseñaEditar) {
            setResenia({
                titulo: reseñaEditar.tituloResenia,
                contenido: reseñaEditar.textoResenia,
                puntuacion: reseñaEditar.puntuacion,
                autor: reseñaEditar.autor,
                horasJugadas: reseñaEditar.horasJugadas,
                estado: reseñaEditar.estado,
                recomienda: reseñaEditar.recomendaria
            });
        } else {
            setResenia(initialState);
        }
    }, [reseñaEditar]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setResenia({
            ...resenia,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const reseniaData = {
            juegoId,
            autor: resenia.autor,
            puntuacion: Number(resenia.puntuacion),
            horasJugadas: Number(resenia.horasJugadas),
            estado: resenia.estado,
            tituloResenia: resenia.titulo,
            textoResenia: resenia.contenido,
            recomendaria: resenia.recomienda
        };

        try {
            if (reseñaEditar) {
                // 🆕 Actualizar reseña existente
                await axiosClient.put(`/resenias/${reseñaEditar._id}`, reseniaData);
            } else {
                // Crear nueva reseña
                await axiosClient.post('/resenias', reseniaData);
            }

            setResenia(initialState);
            if (onReseniaCreada) onReseniaCreada();

        } catch (error) {
            console.error("Error al guardar reseña:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="resenia-form">
            <div className="form-group">
                <label>Tu Nombre:</label>
                <input 
                    type="text"
                    name="autor"
                    value={resenia.autor}
                    onChange={handleChange}
                    placeholder="Tu Nombre"
                    required 
                />
            </div>

            <div className="form-group">
                <label>Título de la Reseña:</label>
                <input 
                    type="text"
                    name="titulo"
                    value={resenia.titulo}
                    onChange={handleChange}
                    placeholder="Título de la Reseña"
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Escribe tu reseña:</label>
                <textarea 
                    name="contenido"
                    value={resenia.contenido}
                    onChange={handleChange}
                    placeholder="Escribe tu reseña..."
                    required
                />
            </div>

            <div className="form-group half-width">
                <label>Puntuación (1-5 ⭐):</label>
                <input 
                    type="number"
                    name="puntuacion"
                    value={resenia.puntuacion}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    required 
                />
            </div>

            <div className="form-group half-width">
                <label>Horas jugadas:</label>
                <input 
                    type="number"
                    name="horasJugadas"
                    value={resenia.horasJugadas}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label>
                    <input 
                        type="checkbox" 
                        name="recomienda" 
                        checked={resenia.recomienda} 
                        onChange={handleChange} 
                    />
                    Recomendarías este juego
                </label>
            </div>

            <div className="form-group">
                <label>Estado del juego:</label>
                <select 
                    name="estado" 
                    value={resenia.estado} 
                    onChange={handleChange} 
                    required
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>

            <button type="submit" className="btn-submit btn-success">
                {reseñaEditar ? 'Actualizar Reseña' : 'Enviar Reseña'}
            </button>
        </form>
    );
};

export default ReseniaFormulario;
