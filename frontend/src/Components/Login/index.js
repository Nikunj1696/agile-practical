import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import constants from "../../utils/constants";
import LoginValidation from "../../validations/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="container">
          <h2 className="mt-3 text-center">Login</h2>
          <div className="row mt-3 ">
            <div className="col-4"></div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginValidation}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const dataToSend = {
                  email: values.email,
                  password: values.password,
                };
                axios
                  .post(`${constants.API_URL}/auth/login`, dataToSend)
                  .then((res) => {
                    localStorage.setItem("token", res?.data?.data?.token || "");
                    alert(JSON.stringify(res.data?.message));
                    resetForm();
					  navigate('/dashboard');
                  })
                  .catch((e) => {
					  if (e.response) { 
						  alert(e.response?.data?.message ?? "Something went wrong");
					  }
                  })
                  .finally(() => setSubmitting(false));
              }}
              render={({ values, isSubmitting }) => (
                <Form className="col-4 g-3 card">
                  <div className="card-body">
                    <div className="mb-3 ">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                      <ErrorMessage
                        name="email"
                        className="text-danger"
                        component="small"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                      <ErrorMessage
                        name="password"
                        className="text-danger"
                        component="small"
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary "
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            />
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
