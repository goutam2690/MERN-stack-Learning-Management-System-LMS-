import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

const CourseDetailsPage = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth)

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
                <div className="grid grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img
                            className="w-full h-64"
                            src={state?.thumbnail?.secure_url}
                            alt="thumbnail"
                        />
                        <div className="space-y-4">
                            <div className="flex flex-col justify-center text-lg">
                                <p className="font-light">
                                    <span className="text-yellow-500">
                                        Total Lectures : {" "}
                                    </span>
                                    <span className="font-medium">
                                        {state?.numberOfLectures}

                                    </span>
                                </p>

                                <p className="font-light">
                                    <span className="text-yellow-500">
                                        Instructor : {" "}
                                    </span>
                                    <span className="font-medium">
                                        {state?.createdBy}
                                    </span>
                                </p>
                                <p className="font-light">
                                    <span className="text-yellow-500">
                                        Category : {" "}
                                    </span>
                                    <span className="font-medium">
                                        {state?.category}
                                    </span>
                                </p>
                            </div>

                            { 
                                role === "ADMIN" || data?.subscription?.status === "active" ? (
                                    <button onClick={()=> navigate("/course/displayLectures", { state : {...state}})} className="bg-yellow-600 text-lg rounded-md font-bold px-5 py-1 w-full hover:bg-yellow-600 transition-all ease-in-out">
                                        Watch Lectures
                                    </button>
                                ) : (
                                    <button onClick={()=>navigate("/checkout")} className="bg-yellow-600 text-lg rounded-md font-bold px-5 py-1 w-full hover:bg-yellow-600 transition-all ease-in-out">
                                        Buy Course
                                    </button>
                                )
                            }
                        </div>

                    </div>

                    <div className="space-y-2 text-xl">
                        <h1 className="text-2xl text-yellow-500  mb-5 font-serif">
                            {state.title}
                        </h1>

                        <p className=" text-yellow-500 text-md">Course Description</p>
                        <p className="text-sm font-thin">{state.description}</p>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDetailsPage
