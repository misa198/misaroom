import { FC } from "react";
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

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().nullable(),
});

const CreateRoomForm: FC = () => {
  return (
    <BasicFormOutsideBorder>
      <BasicFormWrapper>
        <BasicFormTitle>create room</BasicFormTitle>
        <BasicFormFormik
          initialValues={{ name: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
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
