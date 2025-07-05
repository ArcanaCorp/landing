import { useState } from "react";
import Cookies from "js-cookie";
import { IconCamera } from "@tabler/icons-react";

import './styles/editpage.css'
import { toast } from "sonner";
import { accountCompleteInfo } from "../services/account.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EditPage () {

    const navigate = useNavigate();

    const { getUser } = useAuth();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [avatar, setAvatar] = useState(null); // Para almacenar el archivo
    const [preview, setPreview] = useState(null); // Para almacenar el preview de la imagen
    const [ loading, setLoading ] = useState(false)

    // Handle changes for text inputs
    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);

    // Handle file input change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavedInfo = async () => {
        
        const user = localStorage.getItem('c_user')

        if (!user || !name || !category) return toast.warning('Alerta', { description: 'Los campos de nombre y categoria son necesarios' })

        try {
            
            setLoading(true)

            const formData = new FormData();
            formData.append('user', user)
            formData.append('photo', avatar)
            formData.append('name', name)
            formData.append('text', description)
            formData.append('category', category)
            formData.append('location', location)

            const data = await accountCompleteInfo(formData);

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                getUser(data.user)
                Cookies.set('user', user, {expires: 365})
                navigate('/me')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
        
            <main className="__main_edit">

                <section className="__section __section_avatar">
                    <figure className="__avatar">
                        <label htmlFor="avatar" style={{backgroundImage: `url(${preview})`}}><IconCamera/></label>
                        <input type="file" id="avatar" style={{display: "none"}} accept="image/jpg, image/png, image/jpeg" onChange={handleAvatarChange} />
                    </figure>
                </section>

                <section className="__section __section_info">
                    <div className="__form_group">
                        <label htmlFor="name">Ingresa el nombre de tu negocio</label>
                        <div className="__form_control">
                            <input type="text" className="__form_control_entry" placeholder="Ingresa el nombre de tu negocio" onChange={handleNameChange} />
                        </div>
                    </div>
                    <div className="__form_group">
                        <label htmlFor="text">Ingresa la descripción del negocio</label>
                        <div className="__form_control">
                            <input type="text" id="text" className="__form_control_entry" placeholder="Ingresa la descripción del negocio" onChange={handleDescriptionChange} />
                        </div>
                    </div>
                    <div className="__form_group">
                        <label htmlFor="category">Ingresa le categoria del negocio</label>
                        <div className="__form_control">
                            <select className="__form_control_entry" id="category" defaultValue={''} onChange={handleCategoryChange}>
                                <option value={''} selected hidden>Selecciona tu categoria de negocio</option>
                                <option>Restaurante</option>
                            </select>
                        </div>
                    </div>
                    <div className="__form_group">
                        <label htmlFor="location">Ingresa la dirección de tu negocio</label>
                        <div className="__form_control">
                            <input type="text" id="location" className="__form_control_entry" placeholder="Ingresa la dirección de tu negocio" onChange={handleLocationChange}/>
                        </div>
                    </div>
                    <div className="__form_group">
                        <button className="__btn" onClick={handleSavedInfo}>{loading ? 'Guardando...' : 'Guardar'}</button>
                    </div>
                </section>

            </main>

        </>

    )

}