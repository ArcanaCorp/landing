import { useParams } from "react-router-dom"

export default function NotPage () {

    const { slug } = useParams();

    return (

        <>
            <h1>No se encontró al usuario {slug}</h1>
        </>

    )

}