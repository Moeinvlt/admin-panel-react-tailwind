import Checkbox from "./Checkbox";
import File from "./File";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

const FormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "file":
      return <File {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "select":
      return <Select {...props} />;
    default:
      return null;
  }
};

export default FormikControl;
