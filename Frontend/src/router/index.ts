import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Chatbot from "../pages/Chatbotpage"
import Layout from "./Outlet";
import Layout1 from "./layout1.tsx"
const router = createBrowserRouter([
  {
    element: Layout(),
    children: [
      {
        path: "/",
        element: Homepage(),
      },
    ],
  },
  {
    element:Layout1(),
    children:[
      {
        path:"/chatbot",
        element:Chatbot(),
      }
    ]

  }
]);

export default router;
