import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { users } from "../settings/slug";
import { Helmet } from "react-helmet";

import './styles/slug.css'
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import Products from "../components/Products";
import NotPage from "./NotPage";

export default function SlugPage () {

    const { slug } = useParams();
    const [ info, setInfo ] = useState(null)
    const [ loading, setLoading ] = useState(true);

    const [ filter, setFilter ] = useState('all')

    const iconMaps = {
        'fb': <IconBrandFacebook/>,
        'ig': <IconBrandInstagram/>,
        'wh': <IconBrandWhatsapp/>
    }

    const getInfo = useCallback(() => {
        const data = users.find((u) => u.slug === slug);
        setInfo(data)
        setLoading(false)
    }, [slug])

    useEffect(() => {
        getInfo();
    }, [getInfo])

    if (loading) return <h1>Cargando...</h1>

    if (!info) return <NotPage/>

    const desc = info?.name ? `${info?.name} | ${info?.text}` : 'Con Ándale Socio puedes mostrar tu negocio en línea, compartir tu catálogo y recibir pedidos fácilmente por WhatsApp.'

    return (

        <>

            <Helmet>
                <meta name="description" content={`${info?.name}`} />
                <meta property="og:title" content={`${info?.name}`} />
                <meta property="og:description" content={desc} />
                <title>{info?.name} | {info?.text} | Ándale Socio | Muestra tu negocio y recibe pedidos por WhatsApp</title>
            </Helmet>

            <div className="__app" style={{backgroundColor: info?.styles.backgroundColor, color: info?.styles.color}}>
                
                <div className="__content">
                
                    <header className="__header">

                        <figure className="__figure" style={{backgroundImage: `url(${info?.image})`}}>
                            <img src={info?.image} alt={`${info?.name} | ${info?.text} | Ándale Socio | Muestra tu negocio y recibe pedidos por WhatsApp`} />
                        </figure>
                        <h1 className="__name">{info?.name}</h1>
                        <p className="__parragraph">{info?.text}</p>

                    </header>

                    <main className="__main">

                        <ul className="__rdds">
                            {info?.rdds.map((r) => (
                                <li key={r.ico}>
                                    <a href={r.url} target="_blank" rel="noreferrer">{iconMaps[r.ico]}</a>
                                </li>
                            ))}
                        </ul>

                        <ul className="__categories">
                            <li className={`${filter === 'all' ? '--active' : ''}`} onClick={() => setFilter('all')}>Todo</li>
                            {info?.categories.map((c, i) => (
                                <li key={i} className={`${filter === c ? '--active' : ''}`} onClick={() => setFilter(c)}>{c}</li>
                            ))}
                        </ul>

                        <div className="__products">
                            {info?.products.map((p) => (
                                <Products key={p.slug} p={p} />
                            ))}
                        </div>

                    </main>
                
                </div>
            
            </div>
            
        </>

    )

}