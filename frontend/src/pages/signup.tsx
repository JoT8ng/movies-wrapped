import { Formik, Form } from "formik"
import * as Yup from "yup"
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from "../components/TextInput";

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is a required field")
        .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
    return (
        <div className="bg-base-green min-h-screen">
            <div className='flex justify-start py-5 px-10 gap-8'>
                <a href='/'>
                    <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                </a>
            </div>
            <div className="flex flex-col justify-center items-center p-10">
                <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">Sign up to start cataloging your favorite movies!</h1>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values));
                    }}
                >
                    <Form>
                        <TextInput
                            label='Username'
                            name='username'
                            type='text'
                            placeholder='username'
                        />
                        <TextInput
                            label='Password'
                            name='password'
                            type='text'
                            placeholder='password'
                        />
                        <div className="flex gap-3 justify-center items-center pt-10 p-5">
                            <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink w-80 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                Sign up
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="flex gap-3 justify-center items-center p-3">
                    <p className="font-sans text-sm text-light-green">Already have an account?</p>
                    <a href='/login' className="font-sans font-bold text-sm text-light-green hover:text-pink">Log in</a>
                </div>
            </div>
        </div>
    )
}

export default Signup