import { FC, Dispatch, SetStateAction } from "react";
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

const schema = yup.object().shape({
  name: yup.string().required(),
});

interface PropTypes {
  setName: Dispatch<SetStateAction<string | undefined>>;
}

const NameForm: FC<PropTypes> = ({ setName }: PropTypes) => {
  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: schema,
    onSubmit: (formValues) => {
      setName(formValues.name);
    },
  });

  return (
    <BasicFormOutsideBorder>
      <BasicFormWrapper>
        <BasicFormTitle>enter name</BasicFormTitle>
        <BasicForm onSubmit={formik.handleSubmit}>
          <BasicFormFieldWrapper>
            <BasicFormField
              id="name"
              name="name"
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoComplete="off"
            />
            {formik.errors["name"] && formik.touched["name"] ? (
              <BasicFormFieldError>{formik.errors["name"]}</BasicFormFieldError>
            ) : null}
          </BasicFormFieldWrapper>
          <BasicFormButton>submit</BasicFormButton>
        </BasicForm>
      </BasicFormWrapper>
    </BasicFormOutsideBorder>
  );
};

export default NameForm;
