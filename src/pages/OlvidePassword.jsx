import { useState } from 'react'
import { Link } from 'react-router-dom'         //Elimina la recarga al dar click en un enlace
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

    const [email, setEmail] =  useState('')
    const [alerta, setAlerta] =  useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(email === '' || email.length < 6 ){
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email })

            setAlerta({msg: data.message})
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-7xl'>Recupera tu Acceso y no <br /> Pierdas tus <br /> <span className='text-black'> Pacientes</span> </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-1o rounded-xl bg-white'>
                { msg && <Alerta alerta={alerta} />}
                <form action="" onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="email" placeholder='Tu Email' value={email} onChange={e => { setEmail(e.target.value) }}/>
                    </div>
                    <input className='bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit" value="Recuperar Password" />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='black text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesión </Link>
                    <Link className='black text-center my-5 text-gray-500' to="/registrar">¿No tienes una cuenta? Regístrate </Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword