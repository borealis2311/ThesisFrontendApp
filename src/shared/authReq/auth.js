import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Logged = (OriginalComponent)=>{
    function ExtendsComponent(){
        const logged = useSelector(({Auth})=>Auth.login.logged);
        return logged
            ? <Navigate to="/"/>
            : <OriginalComponent/>
    }
    return ExtendsComponent;
}

const notLogged = (OriginalComponent)=>{
    function ExtendsComponent(){
        const logged = useSelector(({Auth})=>Auth.login.logged);
        return logged
            ? <OriginalComponent/>
            : <Navigate to="/"/>
    }
    return ExtendsComponent;
}

export { Logged, notLogged };