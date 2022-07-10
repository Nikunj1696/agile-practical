import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import applicationValidation from "../../validations/application";
import axios from "axios";
import constants from "../../utils/constants";

const Home = () => {
  return (
    <div>
      <div className="container">
        <h2 className="mt-3 text-center">Job Application Form</h2>
        <div className="mt-3">
          <Formik
            initialValues={{
              full_name: "",
              email: "",
              address: "",
              mobile: "",
              education_details: [
                {
                  board: "",
                  year: "",
                  percentage: "",
                },
              ],
            }}
            validationSchema={applicationValidation}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const dataToSend = {
                full_name: values.full_name,
                email: values.email,
                address: values.address,
                mobile: values.mobile,
                education_details: JSON.stringify(values.education_details),
              };
              axios
                .post(`${constants.API_URL}/application/add`, dataToSend)
                .then((res) => {
                  alert(JSON.stringify(res.data.message));
                  resetForm();
                })
                .catch((e) => {
                  alert(e.response?.data?.message ?? "Something went wrong");
                })
                .finally(() => setSubmitting(false));
            }}
            render={({ values, isSubmitting }) => (
              <Form className="g-3 needs-validation">
                {/* {console.log("values", values)} */}
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label htmlFor="full_name">Full Name</label>
                    <Field
                      className="form-control"
                      name="full_name"
                      type="text"
                    />
                    <ErrorMessage
                      name="full_name"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="email">Email Address</label>
                    <Field className="form-control" name="email" type="email" />
                    <ErrorMessage
                      name="email"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="address">Address</label>
                    <Field
                      className="form-control"
                      name="address"
                      type="text"
                    />
                    <ErrorMessage
                      name="address"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label htmlFor="mobile">Mobile</label>
                    <Field
                      className="form-control"
                      name="mobile"
                      type="number"
                    />
                    <ErrorMessage
                      name="mobile"
                      className="text-danger"
                      component="small"
                    />
                  </div>
                  <div className="col-md-8"></div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-8">
                    <label htmlFor="email">Education Details</label>
                    <FieldArray
                      name="education_details"
                      render={(arrayHelpers) => (
                        <div>
                          {values.education_details.map((detail, index) => (
                            <div key={index} className="row">
                              <div className="col-md-3">
                                <label
                                  htmlFor={`education_details.${index}.board`}
                                >
                                  Board
                                </label>
                                <Field
                                  className="form-control"
                                  name={`education_details.${index}.board`}
                                />
                                <ErrorMessage
                                  name={`education_details.${index}.board`}
                                  className="text-danger"
                                  component="small"
                                />
                              </div>
                              <div className="col-md-3">
                                <label
                                  htmlFor={`education_details.${index}.year`}
                                >
                                  Year
                                </label>
                                <Field
                                  className="form-control"
                                  name={`education_details.${index}.year`}
                                />
                                <ErrorMessage
                                  name={`education_details.${index}.year`}
                                  className="text-danger"
                                  component="small"
                                />
                              </div>
                              <div className="col-md-3">
                                <label
                                  htmlFor={`education_details.${index}.percentage`}
                                >
                                  Percentage
                                </label>
                                <Field
                                  className="form-control"
                                  name={`education_details.${index}.percentage`}
                                />
                                <ErrorMessage
                                  name={`education_details.${index}.percentage`}
                                  className="text-danger"
                                  component="small"
                                />
                              </div>
                              <div className="col-md-3 pt-4">
                                {index > 0 && (
                                  <button
                                    className="btn btn-secondary mx-1"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      board: "",
                                      year: "",
                                      percentage: "",
                                    })
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col-md-4"></div>
                </div>
                <div className="text-center mt-2">
                  <button
                    disabled={isSubmitting}
                    className="btn btn-success"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
