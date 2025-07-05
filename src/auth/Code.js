import { useState } from "react"
import { toast } from "sonner"
import { serviceAuthVerify } from "../services/auth.service"
import { useNavigate } from "react-router-dom"

export default function Code () {

    const navigate = useNavigate();
    const [ code, setCode ] = useState('')
    const [ err, setErr ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const onChangeCode = (e) => {

        const { value } = e.target;
    
        const filteredValue = value.replace(/\D/g, '');

        if (value !== filteredValue) {
            setErr('No se aceptan letras, solo números')
        } else {
            setErr('')
        }

        if (filteredValue.length <= 6) {
            setCode(filteredValue)
        }

    }

    const handleVerify = async () => {

        if (!code) return toast.warning('Alerta', { description: 'Por favor completa los campos requeridos antes.' })

        try {

            setLoading(true)

            const data = await serviceAuthVerify(code)

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })

                if (!data.completed) return navigate('/me/edit')

                    navigate('/me')
            
        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
        
            <h1 className="__title_form">Vamos a verificar</h1>
            <p className='__text_form'>Ingresa código de 6 dígitos que enviamos a tu número telefónico.</p>

            <div className='__form'>

                <div className='__form_group'>
                    <label className='__label' htmlFor='phone'>Ingresa el código de verificación</label>
                    <div className='__form_control'>
                        <input type='tel' inputMode='numeric' pattern='[0-9]*' minLength={6} maxLength={6} value={code} className='__form_entry' id='phone' placeholder='Ingresa el código de verificación' onChange={onChangeCode} />
                    </div>
                    {err !== '' && ( <span>{err}</span> )}
                </div>

                <div className='__form_group'>
                    <button className='__form_btn __form_btn_primary' onClick={handleVerify}>{loading ? 'Verificando...' : 'Verificar'}</button>
                </div>

            </div>

        </>

    )

}