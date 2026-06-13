import Checkbox from "./Checkbox";
import DatePicker from "./Date";
import File from "./File";
import Input from "./Input";
import MultiCheckbox from "./MultiCheckbox";
import MultiSelect from "./MultiSelect";
import SearchableSelect from "./SearchableSelect";
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
    case "multiSelect":
      return <MultiSelect {...props} />;
    case "searchableSelect":
      return <SearchableSelect {...props} />;
    case "date":
      return <DatePicker {...props} />;
    case "multiCheckbox":
      return <MultiCheckbox {...props} />;
    default:
      return null;
  }
};

export default FormikControl;
