import AddBook from "./Components/AddBook";
import KanbanBoard from "./Components/KanbanBoard";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    children:[
      {index:true,element: <KanbanBoard/>},
      {path:'/addtask', element:<AddBook/>}
    ]
  }
])


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
