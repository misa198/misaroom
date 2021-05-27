import { useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import {
  BasicFormOutsideBorder,
  BasicFormWrapper,
  BasicFormTitle,
  BasicFormFormik,
  BasicForm,
  BasicFormFieldWrapper,
  BasicFormField,
  BasicFormFieldError,
  BasicFormButton,
} from "../../../components/BasicForm/styed";

import { socket } from "../../../shared/socket/SocketProvider";

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().nullable(),
});

const CreateRoomForm: FC = () => {
  const history = useHistory();

  useEffect(() => {
    socket.on("create-room-successfully", (values) => {
      history.push(`/r/${values.roomId}`);
    });
  }, [history]);

  return (
    <BasicFormOutsideBorder>
      <BasicFormWrapper>
        <BasicFormTitle>create room</BasicFormTitle>
        <BasicFormFormik
          initialValues={{ name: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values) => {
            socket.emit("create-room", {
              password: values.password,
            });
          }}
        >
          {({ errors, touched }) => (
            <BasicForm>
              <BasicFormFieldWrapper>
                <BasicFormField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                />
                {errors["name"] && touched["name"] ? (
                  <BasicFormFieldError>{errors["name"]}</BasicFormFieldError>
                ) : null}
              </BasicFormFieldWrapper>
              <BasicFormFieldWrapper>
                <BasicFormField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password (optional)"
                />
                {errors["password"] && touched["password"] ? (
                  <BasicFormFieldError>
                    {errors["password"]}
                  </BasicFormFieldError>
                ) : null}
              </BasicFormFieldWrapper>
              <BasicFormButton>create</BasicFormButton>
            </BasicForm>
          )}
        </BasicFormFormik>
      </BasicFormWrapper>
    </BasicFormOutsideBorder>
  );
};

export default CreateRoomForm;
