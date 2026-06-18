import { Form, Formik } from "formik";
import Modal from "../../../components/Modal";
import FormikControl from "../../../components/form/FormikControl";
import { initialValues, onSubmit, validationSchema } from "../core";
import { useContext, useEffect, useState } from "react";
import SubmitBtn from "../../../components/form/SubmitBtn";
import { getRolesApi, getSinglrUserApi } from "../../../api/users/usersApi";
import { convertToDateToJalali } from "../../../utils/convertDate";
import { AdminContext } from "../../../context/AdminContextContainer";
import { useLocation, useNavigate } from "react-router";

const AddUser = ({ setUsersData, refetchUsers }) => {
  const [allRoles, setAllRoles] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { setModalOpen } = useContext(AdminContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const fetchRoles = async () => {
    const res = await getRolesApi();
    if (res.status === 200) {
      setAllRoles(
        res.data.data.map((r) => ({
          id: r.id,
          value: r.title,
        })),
      );
    }
  };

  const fetchUser = async () => {
    if (!userId) return;
    const res = await getSinglrUserApi(userId);

    if (res.status === 200) {
      setUserToEdit(res.data.data);
    }
  };

  useEffect(() => {
    fetchRoles();
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    if (userToEdit) {
      setSelectedRoles(
        userToEdit.roles.map((r) => {
          return { id: r.id, value: r.title };
        }),
      );
      const roles_id = userToEdit.roles.map((p) => p.id);
      setReInitialValues({
        birth_date: userToEdit.birth_date
          ? convertToDateToJalali(userToEdit.birth_date, "jD / jM / jYYYY")
          : "",
        roles_id,
        password: "",
        user_name: userToEdit.user_name || "",
        first_name: userToEdit.first_name || "",
        last_name: userToEdit.last_name || "",
        phone: userToEdit.phone || "",
        email: userToEdit.email || "",
        gender: userToEdit.gender ?? 1,
        // national_code: "",
        isEditing: true,
      });
    }
  }, [userToEdit]);

  const onSuccess = () => {
    setModalOpen(false);
  };

  const onCloseModal = () => {
    navigate(-1);
    setModalOpen(false);
    setReInitialValues(null)
  };



  return (
    <Modal
      title={userId ? "ویرایش کاربر" : "افزودن کاربر"}
      fullScreen={true}
      customCloseFnc={onCloseModal}
    >
      <Formik
        key={userId || "new"}
        initialValues={reInitialValues || initialValues}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, setUsersData, userId, refetchUsers, onSuccess)
        }
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => (
          <div>
            <Form>
              <FormikControl
                control="input"
                type="text"
                name="user_name"
                label="نام کاربری"
                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
              />
              <FormikControl
                control="input"
                type="text"
                name="first_name"
                label="نام"
                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
              />
              <FormikControl
                control="input"
                type="text"
                name="last_name"
                label="نام خانوادگی"
                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
              />
              <FormikControl
                control="input"
                type="text"
                name="phone"
                label="شماره موبایل"
                placeholder="11 رقم، مثال: 09123456789"
              />
              <FormikControl
                control="input"
                type="text"
                name="email"
                label="ایمیل"
                placeholder="email@example.com"
              />
              <FormikControl
                control="input"
                type="password"
                name="password"
                label="کلمه عبور"
                placeholder={
                  userId ? "در ویرایش خالی بگذارید" : "حداقل 6 کاراکتر"
                }
              />
              <FormikControl
                control="date"
                formik={formik}
                name="birth_date"
                label="تاریخ تولد"
                initialDate={reInitialValues?.birth_date}
                yearsLimit={{ from: 100, to: -10 }}
              />
              <FormikControl
                control="select"
                options={[
                  { id: 1, value: "مرد" },
                  { id: 0, value: "زن" },
                ]}
                name="gender"
                label="جنسیت"
              />
              <FormikControl
                label="نقش ها"
                control="searchableSelect"
                options={allRoles}
                name="roles_id"
                firstItem="لطفا نقش های مورد نظر را انتخاب کنید"
                resultType="array"
                initialItems={selectedRoles}
              />
              <SubmitBtn />
            </Form>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default AddUser;
