import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const initialState = {
    nombre: '',
    genero: '',
    plataforma: '',
    // Asegúrate de incluir todos los campos obligatorios de tu Esquema de Mongoose
    anioLanzamiento: 2000, 
    imagenPortada: '',
    desarrollador: '',
    descripcion: '',
};

const JuegoFormulario = () => {
    const [juego, setJuego] = useState(initialState);
    const navigate = useNavigate();

    // Maneja el cambio en los inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setJuego({
            ...juego,
            [name]: value,
        });
    };

    // Maneja el envío del formulario (POST)
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const juegoData = {
                ...juego,
                anioLanzamiento: Number(juego.anioLanzamiento),
            };
            
            // Envía la solicitud POST a el backend /api/juegos
            await axiosClient.post('/juegos', juegoData); 

            alert('¡Juego creado con éxito!');
            navigate('/'); // Vuelve a la lista

        } catch (error) {
            // Manejo de errores de validación de Mongoose
            const msg = error.response.data.error || 'Ocurrió un error desconocido.';
            console.error('Error al crear el juego:', error.response.data);
            alert(`Error: ${msg}`);
        }
    };

    return (
        <div>
            <h2>📝 Añadir Nuevo Juego</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                {/* CAMPOS DEL FORMULARIO */}
                
                <label>Nombre:</label>
                <input type="text" name="nombre" value={juego.nombre} onChange={handleChange} required />

                <label>Género:</label>
                <input type="text" name="genero" value={juego.genero} onChange={handleChange} required />
                
                <label>Plataforma:</label>
                <input type="text" name="plataforma" value={juego.plataforma} onChange={handleChange} required />
                
                <label>Desarrollador:</label>
                <input type="text" name="desarrollador" value={juego.desarrollador} onChange={handleChange} required />

                <label>Descripción:</label>
                <textarea name="descripcion" value={juego.descripcion} onChange={handleChange} required />

                <label>Año de Lanzamiento:</label>
                <input type="number" name="anioLanzamiento" value={juego.anioLanzamiento} onChange={handleChange} />

                <label>Imagen de Portada (URL):</label>
                <input type="text" name="imagenPortada" value={juego.imagenPortada} onChange={handleChange} />
                         
                <br/>
                <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Guardar Juego</button>
            </form>
        </div>
    );
};

export default JuegoFormulario;