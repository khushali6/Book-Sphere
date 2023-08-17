import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Typography, TextField, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../Service/category.service";
import { Formik } from "formik";
import ValidateMessage from "../Components/ValidationMsg";
import { toast } from "react-toastify";
import Shared from "../Utils/Shared";
import "./Book.css"
const EditCategory = () => {
  const navigate = useNavigate();
  const initialValues = { name: "" };
  const [initialValueState, setInitialValueState] = useState(initialValues);
  const { id } = useParams();

  useEffect(() => {
    if (id) getCategoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const getCategoryById = () => {
    categoryService.getById(Number(id)).then((res) => {
      setInitialValueState({
        id: res.id,
        name: res.name,
      });
    });
  };

  const handleSubmit = (values) => {
    categoryService
      .save(values)
      .then((res) => {
        toast.success(Shared.messages.UPDATED_SUCCESS);
        navigate("/Categories");
      })
      .catch((e) => toast.error(Shared.messages.UPDATED_FAIL));
  };
  return (
 <div className="add-book-form-container">
 <Typography variant="h2">{id ? "Edit" : "Add"} Category</Typography>
 <Formik
   initialValues={initialValueState}
   validationSchema={validationSchema}
   enableReinitialize={true}
   onSubmit={handleSubmit}
 >
   {({
     values,
     errors,
     touched,
     handleBlur,
     handleChange,
     handleSubmit,
   }) => (
     <form onSubmit={handleSubmit}>
       <TextField
         id="title"
         name="name"
         label="Category Name *"
         variant="outlined"
         inputProps={{ className: "small" }}
         value={values.name}
         onBlur={handleBlur}
         onChange={handleChange}
       />
       <ValidateMessage message={errors.name} touched={touched.name} />
       <div className="button-container">
         <Button
           type="submit"
           variant="contained"
           color="primary"
           disableElevation
         >
           Save
         </Button>
         <Button
           type="button"
           variant="contained"
           color="primary"
           onClick={() => {
             navigate("/categories");
           }}
           disableElevation
         >
           Cancel
         </Button>
       </div>
     </form>
   )}
 </Formik>
</div>

 );
};

export default EditCategory;