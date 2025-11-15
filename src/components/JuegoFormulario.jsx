import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';

const initialState = {
    nombre: '',
    genero: '',
    plataforma: '',
    anioLanzamiento: 2000, 
    imagenPortada: '',
    desarrollador: '',
    descripcion: '',
};

const JuegoFormulario = () => {
    const [juego, setJuego] = useState(initialState);
    const navigate = useNavigate();

    const { id } = useParams(); 
    const esEdicion = !!id; // Determina si es edición o creación

    useEffect(() => { 
        if (esEdicion) {
            const obtenerJuegoParaEdicion = async () => {
                try {
                    const response = await axiosClient.get(`/juegos/${id}`);
                    // Establecer los datos del juego en el estado
                    // NOTA: Mongoose devuelve el id como _id, lo ignoramos al pasar el spread
                    setJuego(response.data); 
                } catch (error) {
                    console.error('Error al cargar el juego para edición:', error);
                    alert('No se pudo cargar el juego. Volviendo a la lista.');
                    navigate('/');
                }
            };
            obtenerJuegoParaEdicion();
        } else {
             // Si es /nuevo, limpia el estado por si venimos de editar
             setJuego(initialState);
        }
    }, [esEdicion, id, navigate]);

    // Maneja el cambio en los inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setJuego({
            ...juego,
            [name]: value,
        });
    };


// 🔄 Maneja el envío del formulario (POST para crear, PUT para editar)
    const handleSubmit = async e => {
        e.preventDefault();

        const juegoData = {
            ...juego,
            anioLanzamiento: Number(juego.anioLanzamiento),
        };
        try {
            if (esEdicion) {
                // Envía la solicitud PUT a el backend /api/juegos/:id
                // 🔄 MODO EDICIÓN: Usar PUT
                await axiosClient.put(`/juegos/${id}`, juegoData);
                alert('¡Juego actualizado con éxito!');
            } else {
                // 🔄 MODO CREACIÓN: Usar POST
                await axiosClient.post('/juegos', juegoData); 
                alert('¡Juego creado con éxito!');
            }            

            alert('¡Juego creado con éxito!');
            navigate('/'); // Vuelve a la lista

        } catch (error) {
            const msg = error.response?.data?.error || 'Ocurrió un error desconocido.';
            console.error('Error al guardar el juego:', error.response?.data || error);
            alert(`Error: ${msg}`);
        }
    };

    return (
        <div>
            {/* 🔄 Título dinámico */}
            <h2>{esEdicion ? `✏️ Editar Juego: ${juego.nombre}` : '📝 Añadir Nuevo Juego'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                {/* CAMPOS DEL FORMULARIO - El `value` ahora carga los datos */}
                
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
                <button type="submit" style={{ padding: '10px', backgroundColor: esEdicion ? 'blue' : 'green', color: 'white', border: 'none' }}>
                    {esEdicion ? 'Actualizar Juego' : 'Guardar Juego'}
                </button>
            </form>
        </div>
    );
};

export default JuegoFormulario;
