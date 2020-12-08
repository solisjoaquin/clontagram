
import React, { useState } from 'react';
import Loading from '../componentes/Loading';
import Main from '../componentes/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'

export default function Upload() {
    const [imagenUrl, setImagenUrl] = useState('')
    const [subiendoImagen, setSubiendoImagen] = useState(false)

    return (
        <Main center>
            <div className="Upload">
                <form action="">
                    <div className="Upload__image-section">
                        <SeccionSubirImagen
                            imagenUrl={imagenUrl}
                            subiendoImagen={subiendoImagen}>

                        </SeccionSubirImagen>
                    </div>
                    <textarea
                        name="caption"
                        className="Upload__caption"
                        required
                        maxLength="180"
                        placeholder="Caption de tu post"


                    />
                    <button className="Upload__submit" type="submit">Post</button>
                </form>
            </div>
        </Main>
    )

}

function SeccionSubirImagen({ subiendoImagen, imagenUrl }) {
    if (subiendoImagen) {
        return <Loading />
    } else if (imagenUrl) {
        return <img src={imagenUrl} alt="" />
    } else {
        return (
            <label className="Upload__image-label">
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                <span>Publica una foto</span>
                <input type="file" className="hidden" name="imagen" />
            </label>
        )
    }

}