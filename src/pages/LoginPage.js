import { Toaster } from "sonner";
import { Helmet } from "react-helmet";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../images/logo-white.svg";

import './styles/login.css'
import { useEffect } from "react";

export default function LoginPage () {

    const navigate = useNavigate();

    useEffect(() => {
        const user = Cookies.get('user')
        if (user) {
            navigate('/me', { replace: true })
        }
    }, [navigate])

    return (

        <>
        
            <Helmet>
                <title>Iniciar Sesión | Ándale Socio | Muestra tu negocio y recibe pedidos por WhatsApp</title>
            </Helmet>

            <header className="__header_login">
                <img src={logo} alt="Logo de Ándale Socio | Muestra tu negocio y recibe pedidos por WhatsApp" loading="lazy" />
            </header>

            <main className="__main_login">
                <Outlet/>
            </main>

            <Toaster position="top-center" richColors />

        </>

    )

}