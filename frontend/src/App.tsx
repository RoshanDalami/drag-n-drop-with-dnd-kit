import AddTask from "./Components/AddTask";
import Home from "./Components/Home";
import KanbanBoard from "./Components/KanbanBoard";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    children:[
      {index:true,element:<Home/>},
      {path:'/board/:id',element: <KanbanBoard/>},
      {path:'/addtask', element:<AddTask/>}
    ]
  }
])


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
