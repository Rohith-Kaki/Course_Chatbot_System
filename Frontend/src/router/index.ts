import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Chatbot from "../pages/Chatbotpage"
import Admin from "../pages/Adminpage"
import Layout from "./PublicLayout.tsx";
import AppLayout from "./AppLayout.tsx"
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
    element:AppLayout(),
    children:[
      {
        path:"/chatbot/",
        element:Chatbot(),
      },
      {
        path: "/Admin",
        element: Admin(),
      }
    ]

  }
]);

export default router;
