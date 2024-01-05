import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

const Profile = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state)=>state?.auth?.data);
  console.log(userData)

  return (
    <div>
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
              <div className="my-10 flex flex-col gap-4 rounded-lg p-4 bg-transparent text-white w-1/2 shadow-[0_0_10px_gray]">
                  <h3 className="text-xl text-center py-3 border border-yellow-600 border-x-8 font-bold">My Profile</h3>
                  <img 
                    src={userData?.avatar?.secure_url} 
                    className="w-40 m-auto rounded-full border border-white py-1 px-1" 
                  />

                  <h3 className="text-xl font-semibold text-center capitalize">
                      {userData.fullName}
                  </h3>

                  <div className="grid grid-cols-2 ">
                      <p>Email : </p><p>{userData.email}</p>
                      {/* <p>Role : </p><p>{userData.role}</p>                         */}
                      <p>Subscription : </p><p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                      <Link to="/changePassword" className="w-1/2 bg-yellow-600 transition-all ease-in-out duration-300 font-semibold rounded-md p-2 cursor-pointer text-center">
                        <button>
                          Change Password
                        </button>
                      </Link>

                      <Link to="/editProfile" className="w-1/2 bg-yellow-600 transition-all ease-in-out duration-300 font-semibold rounded-md p-2 cursor-pointer text-center">
                        <button>
                          Edit Profile
                        </button>
                      </Link>

                  </div>
{/* 
                  {userData?.subscription?.status === "active" && (
                    <button className="s-full bg-red-700 hover:bg-red-600 transition-all ease-in-out duration-300 py-2 font-semibold rounded-md">Cancel Subscription</button>
                  )} */}
              </div>
            </div>
        </HomeLayout>
    </div>
  )
}

export default Profile
