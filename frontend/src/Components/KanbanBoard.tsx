import { useEffect, useMemo, useState } from "react";
import { Column, Task, Id } from "../types";
import { nanoid } from "nanoid";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { useParams } from "react-router-dom";

export default function KanbanBoard() {
  const {id} = useParams();
  const [columns] = useState<Column[]>([
    {
        id:'1',
        title:'Todo',
        status:'todo'
    },
    {
        id:'2',
        title:'In Progress',
        status:'inprogress'
    },
    {
        id:'3',
        title:'Completed',
        status:'completed'
    },
    {
        id:'4',
        title:'Backlogs',
        status:'backlog'
    },
  ]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [individualTask,setIndividualTask] = useState({})

  const fetchData = async ()=>{
    const response = await fetch(`http://localhost:8000/tasks/${id}`)
    const data = await response.json();
    setIndividualTask(data)
    setTasks(data.todos)
  }
  console.log(individualTask,'one')
  console.log(tasks,'two')

  useEffect(()=>{
    fetchData();
  },[id])
// console.log(individualTask)
//   function createNewColumn() {
//     const columnToAdd: Column = {
//       id: nanoid(),
//       title: `Column ${columns.length + 1}`,
//     };
//     setColumns([...columns, columnToAdd]);
//   }



  function onDragStartHandler(event: DragStartEvent) {
    console.log("Drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEndHandler(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // setColumns((columns) => {
    //   const activeColumnIndex = columns.findIndex(
    //     (col) => col.id === activeId
    //   );
    //   const overColumnIndex = columns.findIndex(
    //     (col) => col.id === overId
    //   );
    //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
    // });
  }
  async function createTask (columnId: Id) {
    try {
      
      const newTask: Task = {
        id: nanoid(),
        columnId,
        content: `task to do`,
        status:'todo'
      };
      
      const response =  await fetch(`http://localhost:8000/tasks/addTodo/${id}`,{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        // mode:'cors',
        body:JSON.stringify(newTask)
    })
    if(response.ok === true){
      console.log(newTask)
    }
      
    } catch (error) {
      console.log(error)
    }
  }

  function onDragOverHandler(event:DragOverEvent){
    // console.log(event)
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;


    // here we can have two senario 
    // one is we can drop task over another task  or we can drop task over column 

    // task over another task 
    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    if(!isActiveTask) return ;

    if(isActiveTask && isOverTask){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(t=>t.id === activeId)
            const overIndex = tasks.findIndex(t=>t.id === overId)

            tasks[activeIndex].columnId = tasks[overIndex].columnId

            return arrayMove(tasks,activeIndex,overIndex)
        })
    }

    //dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column";
    console.log(over.data.current?.column?.status,'hello')

    if(isActiveTask && isOverColumn){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(t=>t.id === activeId)
            // const overIndex = tasks.findIndex(t=>t.id === overId)

            tasks[activeIndex].columnId = overId

            return arrayMove(tasks,activeIndex,activeIndex)
        })
    }

  }
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">
          {individualTask?.taskTitle}
        </h1>
      </div>
      <DndContext onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} onDragOver={onDragOverHandler} >
        <div className="flex  items-center gap-4">
          <SortableContext items={columnsId}>
            {columns?.map((col,index) => {
              console.log(col.id)
              return (
                <ColumnContainer
                  key={col.id}
                  index={index}
                  column={col}
                  createTask={createTask}

                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  // tasks={individualTask?.todos}
                />
              );

            })}
          </SortableContext>
          {/* <button
            className="bg-indigo-600 py-2 px-4 rounded-md"
            onClick={createNewColumn}
          >
            Add Column
          </button> */}
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                index={0}
                createTask={createTask}
                tasks={tasks}
                // tasks={tasks.filter(
                //   (task) => task.columnId === activeColumn.id
                // )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
