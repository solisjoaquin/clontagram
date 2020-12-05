import React, { useState } from 'react';
import Axios from 'axios'
import Main from '../componentes/Main'
import ImageSignup from '../imagenes/signup.png'
import InstagramName from '../imagenes/logo.png'

export default function Signup() {
    const [usuario, setUsuario] = useState({
        email: '',
        username: '',
        password: '',
        bio: '',
        nombre: ''
    })


    // this function read changes in the form
    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

        // "name" is the name of the input
        // "value" get the value in that input
        /* console.log(
            {
                ...usuario,
                [e.target.name]: e.target.value
            }
        ); */
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await Axios.post('/api/usuarios/signup', usuario);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Main center={false}>
            <div className="Signup">
                <img src={ImageSignup} alt="" className="Signup__img" />
                <div className="FormContainer">
                    <img src={InstagramName} className="Instagram_Name_img" alt="" />
                    {/* <h1 className="Form__titulo">Clontagram</h1> */}
                    <p className="FormContainer__info">
                        Regístrate para ver fotos y videos de tus amigos.

                    </p>
                    <form onSubmit={handleSubmit} >
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            className="Form__field"
                            required
                            onChange={handleInputChange}
                            value={usuario.email} />

                        <input type="text"
                            name="nombre"
                            placeholder="Nombre completo"
                            className="Form__field"
                            minLength="3"
                            maxLength="100"
                            required
                            onChange={handleInputChange}
                            value={usuario.nombre} />

                        <input type="text"
                            name="username"
                            placeholder="Username"
                            className="Form__field"
                            required
                            minLength="3"
                            maxLength="30"
                            onChange={handleInputChange}
                            value={usuario.username} />

                        <input type="text"
                            name="bio"
                            placeholder="Cuentame mas de ti"
                            className="Form__field"
                            required
                            maxLength="100"
                            onChange={handleInputChange}
                            value={usuario.bio} />

                        <input type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="Form__field"
                            required
                            onChange={handleInputChange}
                            value={usuario.password} />

                        <button className="Form__submit" type="submit">Sign up</button>
                        <p className="FormContainer__info">
                            ¿Tienes una cuenta? <a href="/">Inicia sesión</a>
                        </p>
                    </form>
                </div>
            </div>
        </Main>

    );
}