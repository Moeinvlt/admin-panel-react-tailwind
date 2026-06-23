import { Navigate } from "react-router";
import { useHasPermission } from "../hooks/permissionsHook";

const PermComponent = ({component, pTitle}) => {
    const hasPerm = useHasPermission(pTitle)
    return hasPerm ? component : <Navigate to={-1}/>
}

export default PermComponent;