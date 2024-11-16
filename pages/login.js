import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import InputField from "@/components/Common/InputField";
import Link from "next/link";
import routes from "@/utils/routes";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        router.push(routes.home);
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <InputField
              isError
              isRequired
              formik={formik}
              id="email"
              label="Email"
              inputName="email"
              labelClass="text-sm font-medium text-gray-700"
              {...formik.getFieldProps("email")}
            />
          </div>

          <div className="mb-5">
            <InputField
              isError
              isRequired
              formik={formik}
              type="password"
              id="password"
              label="Password"
              inputName="password"
              labelClass="text-sm font-medium text-gray-700"
              {...formik.getFieldProps("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&lsquo;t have an account?{" "}
            <Link href={routes.register} className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
