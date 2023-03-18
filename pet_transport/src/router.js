import {createBrowserRouter} from "react-router-dom";
  
  
  
import Login from "./login";
import Transport from "./Transport";
import Foster from "./Foster";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import App from "./App";
import Addservice from "./Addservice";
import Vet from "./Vet";
import Grooming from "./Grooming";  
  
const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
},
{
    path: "/Login",
    element: <Login />,
},
{
    path: "/Transport",
    element: <Transport />,
},
{
    path: "/Foster",
    element: <Foster />,
},
{
    path: "/Register",
    element: <Register />,
},
{
    path: "/Reset",
    element: <Reset />,
},
{
    path: "/Dashboard",
    element: <Dashboard />,
},
{
    path: "/Vet",
    element: <Vet />,
},
{
    path: "/Grooming",
    element: <Grooming />,
},
{
    path: "/Addservice",
    element: <Addservice />,
},
]);

  

export default router;