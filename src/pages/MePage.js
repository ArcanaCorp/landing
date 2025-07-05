import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function MePage () {

    const { user } = useAuth();

    const desc = user?.name ? `${user?.name} | ${user?.text}` : 'Con Ándale Socio puedes mostrar tu negocio en línea, compartir tu catálogo y recibir pedidos fácilmente por WhatsApp.'

    return (

        <>

            <Helmet>
                <meta name="description" content={`${desc}`} />
                <meta property="og:title" content={`${user?.name}`} />
                <meta property="og:description" content={desc} />
                <title>{user?.name || 'Bienvenido'} | {user?.text || '' } | Ándale Socio | Muestra tu negocio y recibe pedidos por WhatsApp</title>
            </Helmet>
        
            <main>
                <Outlet/>
            </main>

            <Toaster position="top-center" richColors />

        </>

    )

}