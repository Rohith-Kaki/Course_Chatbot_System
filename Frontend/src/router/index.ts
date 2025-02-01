import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
// import Chatbot from "../pages/Chatbotpage/index.tsx"
import Layout from "./Outlet";

const router = createBrowserRouter([
  {
    element: Layout(),
    children: [
      {
        path: "/",
        element: Homepage(),
      },
      // {
      //   path:"/chatbot",
      //   element:Chatbot()
      // }
    ],
  },
]);

export default router;
