import './App.css'

import { Route, Routes } from 'react-router-dom'

import RequireAuth from './Components/Auth/RequireAuth.jsx'
import AboutUsPage from './Pages/AboutUsPage.jsx'
import ContactPage from './Pages/ContactPage.jsx'
import CourseDetailsPage from './Pages/courses/CourseDetailsPage.jsx'
import CourseList from './Pages/courses/CourseList.jsx'
import CreateCourse from './Pages/courses/CreateCourse.jsx'
import Denied from './Pages/Denied.jsx'
import HomePage from './Pages/HomePage.jsx'
import Login from './Pages/Login.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'
import EditProfile from './Pages/User/EditProfile'
import Profile from './Pages/User/Profile'
import Checkout from './Pages/payments/checkout.jsx'
import CheckOutSuccess from './Pages/payments/CheckOutSuccess.jsx'
import CheckOutFailure from './Pages/payments/CheckOutFailure.jsx'
import DisplayLectures from './Pages/Dashboard/DisplayLectures.jsx'
import AddLecture from './Pages/Dashboard/AddLecture.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/aboutus" element={<AboutUsPage />} ></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route path="/course/course-details" element={<CourseDetailsPage />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/AddNewLecture" element={<AddLecture />}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/checkout/success' element={<CheckOutSuccess />}></Route>
          <Route path='/checkout/fail' element={<CheckOutFailure />}></Route>
          <Route path='/course/displayLectures' element={<DisplayLectures />}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
