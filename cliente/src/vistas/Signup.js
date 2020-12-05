import React from 'react';
import Main from '../componentes/Main'
import ImageSignup from  '../imagenes/signup.png'

export default function Signup() {
    return (
        <Main center = {false}>
            <div className="Signup">
                <img src={ImageSignup} alt="" className="Signup__img" />
                <div className="FormContainer">
                    <h1 className="Form__titulo">Clontagram</h1>
                    <p className="FormContainer__info">
                        Registrate para ver el clon de Instagram

                    </p>
                    <form>
                        <input type="text" 
                        name="email" 
                        placeholder="Email" 
                        className="Form__field" 
                        required></input>

                        <input type="text" 
                        name="nombre" 
                        placeholder="Nombre y Apellido" 
                        className="Form__field" 
                        minLength="3"
                        maxLength="100"
                        required></input>

                        <input type="text" 
                        name="username" 
                        placeholder="Username" 
                        className="Form__field" 
                        required
                        minLength="3"
                        maxLength="30"></input>

                        <input type="text" 
                        name="bio" 
                        placeholder="Cuentame mas di ti" 
                        className="Form__field" 
                        required
                        maxLength="100"></input>

                        <input type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        className="Form__field" 
                        required></input>

                        <button className="Form__submit" type="submit">Sign up</button>
                        <p className="FormContainer__info">
                            Ya tienes cuenta <a href="/">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </Main>

    );
}