import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import History from "../pages/History";
import ProductDetails from "../pages/ProductDetails";
import CartInfor from "../pages/CartInfor";
import Success from "../pages/Success";
import { Logged, notLogged } from "../shared/authReq/auth";


const systemRoutes = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/Login",
        element: Logged(Login),
    },
    {
        path: "/Register",
        element: Logged(Register),
    },
    {
        path: "/Menu",
        element: Menu,
    },
    {
        path: "/Profile",
        element: notLogged(Profile),
    },
    {
        path: "/ProductDetails-:id",
        element: ProductDetails,
    },
    {
        path: "/Cart",
        element: notLogged(Cart),
    },      
    {
        path: "/History",
        element: notLogged(History),
    },  
    {
        path: "/CartInfor-:id",
        element: notLogged(CartInfor),
    }, 
    {
        path: "/Success",
        element: notLogged(Success),
    },            
];

export default systemRoutes;