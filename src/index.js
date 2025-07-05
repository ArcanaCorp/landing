import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SlugPage from "./pages/SlugPage";

import './theme/global.css'
import { DBProvider } from "./context/DBContext";
import { CartProvider } from "./context/CartContext";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Login from "./auth/login";
import Code from "./auth/Code";
import MePage from "./pages/MePage";
import EditPage from "./app/EditPage";
import AuthGuard from "./guards/AuthGuards";

const router = createBrowserRouter([
    {
        path: '/'
    },
    {
        path: '/login',
        element: <LoginPage/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: 'verify',
                element: <Code/>
            }
        ]
    },
    {
        path: '/me',
        element: <AuthGuard><MePage/></AuthGuard>,
        children: [
            {
                index: true,
            },
            {
                path: 'edit',
                element: <EditPage/>
            }
        ]
    },
    {
        path: '/:slug',
        element: <SlugPage/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        
        <AuthProvider>
            
            <DBProvider>

                <CartProvider>
            
                    <RouterProvider router={router} />
                
                </CartProvider>
            
            </DBProvider>

        </AuthProvider>
    
    </>
)