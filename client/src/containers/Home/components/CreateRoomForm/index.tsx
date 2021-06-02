import { useEffect, FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  BasicFormOutsideBorder,
  BasicFormWrapper,
  BasicFormTitle,
  BasicForm,
  BasicFormFieldWrapper,
  BasicFormField,
  BasicFormFieldError,
  BasicFormButton,
} from "../../../../components/BasicForm/styed";

import { socket } from "../../../../shared/socket/SocketProvider";

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().nullable(),
});

const CreateRoomForm: FC = () => {
  const history = useHistory();
  const name = useRef("");

  const formik = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: schema,
    onSubmit: (formValues) => {
      name.current = formValues.name;
      socket.emit("create-room", {
        password: formValues.password,
      });
    },
  });

  useEffect((): any => {
    socket.on("create-room-successfully", (data) => {
      history.push({
        pathname: `/r/${data.roomId}`,
        state: {
          name: name.current,
        },
      });
    });

    return () => socket.off("create-room-successfully");
  }, [history]);

  return (
    <BasicFormOutsideBorder>
      <BasicFormWrapper>
        <BasicFormTitle>create room</BasicFormTitle>
        <BasicForm onSubmit={formik.handleSubmit}>
          <BasicFormFieldWrapper>
            <BasicFormField
              id="name"
              name="name"
              type="text"
              placeholder="your name"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoComplete="off"
            />
            {formik.errors["name"] && formik.touched["name"] ? (
              <BasicFormFieldError>{formik.errors["name"]}</BasicFormFieldError>
            ) : null}
          </BasicFormFieldWrapper>
          <BasicFormFieldWrapper>
            <BasicFormField
              id="password"
              name="password"
              type="password"
              placeholder="room password (optional)"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="off"
            />
            {formik.errors["password"] && formik.touched["password"] ? (
              <BasicFormFieldError>
                {formik.errors["password"]}
              </BasicFormFieldError>
            ) : null}
          </BasicFormFieldWrapper>
          <BasicFormButton>create</BasicFormButton>
        </BasicForm>
      </BasicFormWrapper>
    </BasicFormOutsideBorder>
  );
};

export default CreateRoomForm;
