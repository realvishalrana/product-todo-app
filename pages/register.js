import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import ImageUploader from "@/components/Common/ImageUploader";
import InputField from "@/components/Common/InputField";
import { getErrors } from "@/utils/helper";
import routes from "@/utils/routes";

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/,
      'Contains at least 8 characters, 1 lower case (a-z) & 1 Upper case (A-Z), 1 number (0-9) & one special symbol (!@#$%^&*)',
    )
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
  userImage: Yup.mixed().required("User image is required"),
});

export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      userImage: null,
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem("users", JSON.stringify([...users, values]));
      router.push(routes.login);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="mb-5">
            <InputField
              isError
              isRequired
              formik={formik}
              id="name"
              label="Name"
              inputName="name"
              labelClass="text-sm font-medium text-gray-700"
              {...formik.getFieldProps("name")}
            />
          </div>

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

          {/* Gender Selection */}
          <div className="mb-5">
            <label htmlFor={"gender"} className="block mb-1">
              Gender *
            </label>

            <select
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              className={`px-3 py-2  h-12 rounded-lg w-full border focus:outline-none transition flex !text-black placeholder:text-sm font-[400] !truncate ${
                formik.errors.gender
                  ? "border-red bg-rose-50 "
                  : "focus:ring-2 focus:ring-primary"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="text-xs text-red mt-1">
              {getErrors({ formik, inputName: "gender" })}
            </p>
          </div>
          <div className="mb-5">
            <ImageUploader
              id="userImage"
              label="Profile Image"
              inputName="userImage"
              formik={formik}
              isRequired
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href={routes.login} className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
