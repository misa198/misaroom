import { useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

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
  password: yup.string().required(),
});

interface PropTypes {
  name: string;
  roomId: string;
}

const PasswordForm: FC<PropTypes> = ({ name, roomId }: PropTypes) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: schema,
    onSubmit: (formValues) => {
      socket.emit("join-room", {
        roomId,
        name,
        password: formValues.password,
      });
    },
  });

  useEffect((): any => {
    socket.on("wrong-password", () => {
      toast("Wrong password", {
        type: "error",
      });
    });

    return () => socket.off("wrong-password");
  }, [history]);

  return (
    <BasicFormOutsideBorder>
      <BasicFormWrapper>
        <BasicFormTitle>private room</BasicFormTitle>
        <BasicForm onSubmit={formik.handleSubmit}>
          <BasicFormFieldWrapper>
            <BasicFormField
              id="password"
              name="password"
              type="password"
              placeholder="room password"
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
          <BasicFormButton>join</BasicFormButton>
        </BasicForm>
      </BasicFormWrapper>
    </BasicFormOutsideBorder>
  );
};

export default PasswordForm;
