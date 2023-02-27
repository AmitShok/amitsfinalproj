import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../app/hooks";
import { getAllProductsAsync } from "../features/Home/manyProductsSlice";
import { load_user, logoutAsync, refreshAsync, selectUser } from "../features/login/loginSlice";
import "./layout.css"
import jwt_decode from "jwt-decode"
import { getReviewsAsync } from "../features/review/reviewSlice";
import { userOrdersAsync } from "../features/MyOrders/myOrdersSlice";
import SearchBar from "./SearchBar";

const Layout = () => {

    const currentUser: string = useSelector(selectUser)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getAllProductsAsync())
        dispatch(getReviewsAsync())
        dispatch(userOrdersAsync())
    }, [])

    //  refreshes users tokens - 
    useEffect(() => {
        const token = localStorage.getItem('axx')
        const refresh = localStorage.getItem('refresh')

        if (token) {
            const decodedToken: any = jwt_decode(token);
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = decodedToken.exp - now;

            // check if token is about to expire within next 60 minutes
            if (expiresIn <= 3600 && expiresIn > 0) { // check if token is about to expire or has already expired
                dispatch(refreshAsync(refresh));
            } else if (expiresIn <= 0) { // check if token has already expired
                dispatch(logoutAsync(token)); // dispatch a logout action to clear the expired token and log the user out
            } else {
                dispatch(load_user(decodedToken));
            }
        }
    }, [])


    return (
        <>
            <div style={{}}>
                <ToastContainer />

                <nav className="navigator">
                    <Link className="navBarLink mainLogo" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                        </svg>
                        AmitStore
                    </Link>
                    <Link className="navBarLink" to="/departments">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                        </svg>
                        Categories</Link>
                    <SearchBar />
                    <div className=" dropDownBtn navBarLink">
                        <Link className="navBarLink" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                {/* <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /> */}
                            </svg>
                            {currentUser ? " Hi " + currentUser : "Account"}
                        </Link>
                        {currentUser && <div className="dropContent">
                            <Link className="navBarLink " to="/myorders">My Orders</Link>
                            <br /><br />
                            <Link className="navBarLink " to="/logout">Logout</Link>
                        </div>}
                    </div>
                    <Link className="navBarLink" to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            {/* <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> */}
                        </svg>
                        MyCart</Link>
                </nav>
                <br />

                <Outlet />
            </div>
        </>
    )
};

export default Layout;
