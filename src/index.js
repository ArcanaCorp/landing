import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SlugPage from "./pages/SlugPage";

import './theme/global.css'
import { DBProvider } from "./context/DBContext";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
    {
        path: '/'
    },
    {
        path: '/:slug',
        element: <SlugPage/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        
        <DBProvider>

            <CartProvider>
        
                <RouterProvider router={router} />
            
            </CartProvider>
        
        </DBProvider>
    
    </>
)