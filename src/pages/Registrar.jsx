import { Link } from 'react-router-dom'         //Elimina la recarga al dar click en un enlace
import { useState } from 'react'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'


const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({ msg: "Hay campos vacios", error: true})
            return
        }
        if(password !== repetirPassword){
            setAlerta({ msg: "Tus passwords no son iguales", error: true})
            return
        }
        if(password.length < 6){
            setAlerta({ msg: "Tu passwords es muy corto, debe ser mayor a 6 caracteres", error: true})
            return
        }
        setAlerta({})

        //Crear el usuario en la api
        try {
            const url = `/veterinarios`
            await clienteAxios.post(url,{nombre, email, password});

            setAlerta({ 
                msg: "Creado correctamente", 
                error:false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.message,
                error: true
            })
        }
    }

    const {msg} = alerta

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-7xl'>Crea tu cuenta y <br /> Administra tus <br /> <span className='text-black'> Pacientes</span> </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                { msg && <Alerta alerta={alerta}/>}
                <form action="" onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="text" placeholder='Tu Nombre' value={nombre} onChange={e => setNombre(e.target.value)}/>
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="email" placeholder='Tu Email' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="password" 
                        placeholder='Tu Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="password" 
                        placeholder='Repite tu Password' value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
                    </div>
                    <input className='bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit" value="Crear Cuenta" />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesión </Link>
                    <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi Password </Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar