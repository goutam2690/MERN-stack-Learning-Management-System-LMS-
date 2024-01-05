// import { useSelector } from "react-redux"
// import { Navigate, Outlet } from "react-router-dom";

// const RequireAuth = ({ allowedRoles }) => {

//     const { isAuthenticated, role } = useSelector((state) => state.auth);

//     return isAuthenticated && allowedRoles.find((myRole) => myRole === role ? (
//         <Outlet />
//     ) : isAuthenticated ? (<Navigate to="/denied" />) : (<Navigate to="login" />))
// }
// export default RequireAuth
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    isAuthenticated &&
    allowedRoles.find((myRole) => myRole === role) ? (
      <Outlet />
    ) : isAuthenticated ? (
      <Navigate to="/denied" />
    ) : (
      <Navigate to="login" />
    )
  );
};

export default RequireAuth;


