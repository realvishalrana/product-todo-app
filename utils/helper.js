const getErrors = ({
  inputName,
  formik,
}) => {
 
    const touched = formik?.touched?.[inputName];
    const errors = formik?.errors?.[inputName];
    return touched && typeof errors === "string" ? errors : "";
};

export { getErrors };
