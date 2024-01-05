import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { createAccount } from "../Redux/slices/authSlice.jsx";
import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher.jsx";

const Signup = () => {
    const diapatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    });

    const handleUserInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    const getImage = (e) => {
        e.preventDefault();

        //getting image
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            })

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", () => {
                setPreviewImage(fileReader.result);
            })
        }
    }

    const createNewAccount = async(e) => {
        e.preventDefault();

        const image_uploads_error = document.getElementById('input_image');
        if(!signupData.avatar){
            toast.error("Please upload your image");
            image_uploads_error.style.width = '96px';
            image_uploads_error.style.height = '96px';
            image_uploads_error.style.border = '7px solid red';
            image_uploads_error.style.borderRadius = '100%';
            image_uploads_error.style.margin = 'auto';
            return;
        }

        if (!signupData.fullName || !signupData.email || !signupData.password) {
            toast.error("Please fill all the details");
            return;
        }
        //checking name length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        //checking email with regex
        if (!isValidEmail(signupData.email)) {
            toast.error("Please Enter a valid email address");
            return;
        }
        //checking password with regex
        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast one number and one special characters");
            return;
        }

        // creating formdata instance 
        const formData = new FormData();

        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        //dispatch create account action
        const response = await diapatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success) {
            navigate("/");
        } 
           
        setSignupData({
            fullName : "",
            email : "",
            password : "",
            avatar: ""
        })

        setPreviewImage("");

    }

    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_gray]">
                    <h1 className="text-center text-2xl font-bold">Registration</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-full h-24 rounded-full m-auto"  id="input_image"/>
                        )}
                    </label>

                    <input
                        type="file"
                        name=""
                        id="image_uploads"
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={getImage}
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">
                            Full Name
                        </label>
                        <input
                            className="rounded-lg bg-transparent px-2 py-1 border"
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter Full Name : "
                            onChange={handleUserInput}
                            value={signupData.fullName}
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>

                        <input
                            className="rounded-lg bg-transparent px-2 py-1 border"
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter Your Email :"
                            onChange={handleUserInput}
                            value={signupData.email}
                            autoComplete="off"

                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Password
                        </label>

                        <input
                            className="rounded-lg bg-transparent px-2 py-1 border"
                            type="password"
                            required
                            name="password"
                            onChange={handleUserInput}
                            id="password"
                            placeholder="Enter Your Password :"
                            value={signupData.password}
                            autoComplete="off"

                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-yellow-600 hover:bg-yellow-500
                    transition-all ease-in-out duration-300 mt-2 rounded-lg py-1 font-semibold text-lg cursor-pointer"
                    >
                        Create Account
                    </button>

                    <p className="text-cente">
                        Already have an account?{" "}
                        <Link to="/login" className="link text-yellow-500  ">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
};

export default Signup;
