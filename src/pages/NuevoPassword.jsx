import { useState, useEffect } from "react"
import { useParams, Link} from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] =useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] =useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: "Coloca tu nuevo Password"
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: "El password debe tener mas de 6 caracteres", 
        error: true
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data } =await clienteAxios.post(url, {password })

      setAlerta({
        msg: data.message, 
      })
      setPasswordModificado(true)
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
        <h1 className='text-indigo-600 font-black text-7xl'>Reestablece tu password y accede a tus <span className='text-black'> Pacientes</span> </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alerta alerta={alerta}/>}
        { tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
                <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl ' type="password"
                  placeholder='Tu Nuevo Password' value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <input className='bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto' type="submit" value="Guardar Nuevo Passowrd" />
            </form>
          </>
        )}
        { passwordModificado && <Link className='block text-center my-5 text-gray-500' to="/">Iniciar Sesión </Link> }
      </div>
    </>
  )
}

export default NuevoPassword