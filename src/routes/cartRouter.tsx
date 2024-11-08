import {lazy, Suspense} from "react";
// import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>
const Cart = lazy(() => import("../pages/cart/CartPage"))


const cartRouter = {

    path: "/cart",
    element: <Suspense fallback={Loading}><Cart/></Suspense>
    // children: [
    //
    //     {
    //         path: "list",
    //         element: <Suspense fallback={Loading}><ProductList/></Suspense>
    //     },
    //     {
    //         path: "",
    //         element: <Navigate to='list' replace={true}></Navigate>
    //     },
    //     {
    //         path: "read/:pno",
    //         element: <Suspense fallback={Loading}><ProductRead/></Suspense>
    //     }
    //
    // ]

};

export default cartRouter
