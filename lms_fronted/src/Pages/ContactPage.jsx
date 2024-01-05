import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidEmail } from "../Helpers/regexMatcher";

const ContactPage = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })

    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.name || !userInput.email || !userInput.message) {
            toast.error("All Fields are Mandatory");
            return;
        }

        if (!isValidEmail(userInput.email)) {
            toast.error("Please Enter a valid email address");
            return;
        }
    }





    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[100vh] mb-10">
                <form onSubmit={onFormSubmit} className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_gray] w-[22rem]">
                    <h1 className="text-xl font-semibold">Contact Form</h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-sm font-mono">Name</label>
                        <input
                            type="text"
                            className="bg-transparent border px-2 py-1 rounded-lg"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            autoComplete="off"
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-sm font-mono">Email</label>
                        <input
                            type="text"
                            className="bg-transparent border px-2 py-1 rounded-lg"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-sm font-mono">Message</label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-lg resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter your name"
                            autoComplete="off"
                            onChange={handleUserInput}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ContactPage;