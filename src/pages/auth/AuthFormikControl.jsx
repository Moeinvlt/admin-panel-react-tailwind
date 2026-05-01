import Input from "../../components/auth/Input";
import Chekbox from "./Checkbox";

const AuthFormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "checkbox":
      return <Chekbox {...props} />;
    default:
      return null;
  }
};

export default AuthFormikControl;