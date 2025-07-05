import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { serviceAuthLogin } from '../services/auth.service'

import './styles/form.css'

export default function Login () {

    const navigate = useNavigate();
    const [ phone, setPhone ] = useState('')
    const [ err, setErr ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const onChangePhone = (e) => {
        const { value } = e.target;
        // Filtrar los caracteres para permitir solo números
        const filteredValue = value.replace(/\D/g, ''); // Reemplaza cualquier caracter no numérico por vacío

        if (value !== filteredValue) {
            setErr('No se aceptan letras, solo números');
        } else {
            setErr(''); // Limpiar el mensaje de error si la entrada es válida
        }

        // Si tiene exactamente 9 dígitos, actualiza el estado
        if (filteredValue.length <= 9) {
            setPhone(filteredValue);
        }
    }

    const handleLogin = async () => {

        if (!phone) return toast.warning('Alerta', { description: 'Por favor completa los campos antes de continuar.' })
        
        try {

            setLoading(true)

            const data = await serviceAuthLogin(phone)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                localStorage.setItem('c_user', data.user.sub_user)
                navigate('/login/verify')
                
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <h1 className="__title_form">Bienvenido</h1>
            <p className='__text_form'>Ingresa tu número telefónico para poder iniciar sesión o crear una cuenta.</p>

            <div className='__form'>

                <div className='__form_group'>
                    <label className='__label' htmlFor='phone'>Ingresa tu número de teléfono</label>
                    <div className='__form_control'>
                        <input type='tel' inputMode='numeric' pattern='[0-9]*' minLength={9} maxLength={9} value={phone} className='__form_entry' id='phone' placeholder='Ingresa tu número de teléfono' onChange={onChangePhone} />
                    </div>
                    {err !== '' && ( <span className='__form_message'>{err}</span> )}
                </div>

                <div className='__form_group'>
                    <button className='__form_btn __form_btn_primary' onClick={handleLogin} disabled={loading}>{loading ? 'Continuando...' : 'Continuar'}</button>
                </div>

            </div>

        </>

    )

}