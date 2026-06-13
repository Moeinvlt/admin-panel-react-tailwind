import { Form, Formik } from "formik";
import Modal from "../../../components/Modal";
import FormikControl from "../../../components/form/FormikControl";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { useGetPermissions } from "../../../api/users/hooks/useGetPermissions";
import { useContext, useEffect, useState } from "react";
import { initialValues, onSubmit, validationSchema } from "../core";
import { AdminContext } from "../../../context/AdminContextContainer";
import { useLocation, useNavigate } from "react-router";
import {
  getPermissionsApi,
  getSinglrRoleApi,
} from "../../../api/users/usersApi";

const AddRole = ({ setRolesData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleIdToEdit = location.state?.roleIdToEdit;
  const editType = location.state?.editType;

  const { permissionsData, setPermissionsData } = useGetPermissions();
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [reInitialValues, setReInitialValues] = useState(null);
  const { modalOpen, setModalOpen } = useContext(AdminContext);

  const handleGetRoleToEditData = async () => {
    const res = await getSinglrRoleApi(roleIdToEdit);
    if (res.status === 200) {
      const role = res.data.data;
      setRoleToEdit(role);
      editType === "role"
        ? setReInitialValues({
            title: role.title,
            description: role.description,
          })
        : setReInitialValues({
            permissions_id: role.permissions.map((p) => p.id),
            editPermissions: true,
          });
    }
  };

  const handleGetAllPermissions = async () => {
    const res = await getPermissionsApi();
    if (res.status === 200) {
      const formatted = res.data.data.map((p) => ({
        id: p.id,
        title: p.description,
      }));
      setPermissionsData(formatted);
    }
  };

  useEffect(() => {
    if (roleIdToEdit) {
      handleGetRoleToEditData();
    }
    if (editType !== "role" && permissionsData.length === 0) {
      handleGetAllPermissions();
    }
  }, [roleIdToEdit, editType]);

  const onSuccess = () => {
    setModalOpen(false);
    setReInitialValues(null);
    setRoleToEdit(null);
  };

  const onCloseModal = () => {
    navigate(-1);
    setModalOpen(false);
    setReInitialValues(null);
    setRoleToEdit(null);
  };

  return (
    <Modal
      key={`${editType}-${roleIdToEdit || "new"}`}
      title={
        editType === "role"
          ? "ویرایش نقش"
          : editType === "permissions"
            ? "ویرایش مجوز های دسترسی:" + roleToEdit?.title || ""
            : "افزودن نقش کاربر"
      }
      fullScreen={editType !== "role"}
      customCloseFnc={onCloseModal}
    >
      <Formik
        key={roleIdToEdit || "new"}
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(
            values,
            actions,
            setRolesData,
            roleIdToEdit,
            editType,
            onSuccess,
          )
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        <div>
          <Form>
            {editType !== "permissions" && (
              <>
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  label="عنوان نقش"
                  placeholder="فقط حروف فارسی و لاتین"
                />

                <FormikControl
                  control="input"
                  type="text"
                  name="description"
                  label="توضیحات"
                  placeholder="فقط حروف فارسی و لاتین"
                />
              </>
            )}

            {editType !== "role" && (
              <FormikControl
                control="multiCheckbox"
                name="permissions_id"
                label="دسترسی ها: "
                options={permissionsData}
              />
            )}

            <SubmitBtn />
          </Form>
        </div>
      </Formik>
    </Modal>
  );
};

export default AddRole;
