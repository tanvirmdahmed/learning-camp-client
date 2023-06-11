import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Error404 from "../Pages/Error404/Error404";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoutes";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses/MySelectedClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error404></Error404>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    // for student
                    {
                        path: 'mySelectedClasses',
                        element: <MySelectedClasses></MySelectedClasses>
                    },
                    {
                        path: 'payment',
                        element: <Payment></Payment>
                    },
                    {
                        path: 'myEnrolledClasses',
                        element: <MyEnrolledClasses></MyEnrolledClasses>
                    },
                    {
                        path: 'paymentHistory',
                        element: <PaymentHistory></PaymentHistory>
                    },

                    // for instructor
                    {
                        path: 'addClass',
                        element: <AddClass></AddClass>
                    },
                    {
                        path: 'myClasses',
                        element: <MyClasses></MyClasses>
                    },

                    // for instructor
                    {
                        path: 'manageClasses',
                        element: <ManageClasses></ManageClasses>
                    },
                    {
                        path: 'manageUsers',
                        element: <ManageUsers></ManageUsers>
                    },
                ]
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
        ]
    },
]);

export default router;