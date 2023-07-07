
import './App.css';
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck , faL, faPen,faTrashCan } from '@fortawesome/free-solid-svg-icons'


function App() {


  const[todo ,setTodo]=useState([
    {id : 1,  title: "Task 1" , status : false},
    {id : 2,  title: "Task 2" , status : false}
  ])

  // Temp State
  const[newTask , setNewTask]=useState('')
  const[updateData , setUpdateData] =useState('');

  // Add Task
  const addTask=()=>{
      if(newTask){
        let num = todo.length + 1;
         let newEntry = {id: num ,title: newTask ,status:false}
         setTodo([...todo , newEntry])
         setNewTask(" ");
      }
  }

  //Delete Task
  const deleteTask= (id)=>{
      let newTask =todo.filter( task => task.id !== id)
      setTodo(newTask);
  }

  //Mark task as done or completed
  const markDone =(id)=>{
   const newTask = todo.map( task => {
    if (task.id == id)
    {
      return({...task , status: !task.status})
    }
    return task;
   })
   setTodo(newTask);
  }

  // Cancel Update
  const cancelUpdate=()=>{
    setUpdateData("")

  }

   // Change task for Update
   const changeTask=(e)=>{
    
    let newEntry ={
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
   }
 
    //  Update task
  const updateTask=()=>{
    let filterRecords = [...todo].filter(task =>task.id !== updateData.id)
    
    let updatedObject =[...filterRecords, updateData]

    setTodo(updatedObject);
    setUpdateData("");
  }



  return (
    <div className="  container App">
     
     <h2>To Do Suraj  App</h2>

       <br></br>
       {updateData && updateData ? (
        <>
       {/* update task  */}
       <div className='row'>
       <div className='col'>
       <input value={updateData && updateData.title}
       onChange={(e)=> changeTask(e)} className='form-control form-control-lg'/>

       </div>
       <div className='col-auto'>
        <button onClick={updateTask} className='btn btn-lg btn-success'>
          Update
        </button>
        <button className='btn btn-lg btn-warning' 
        onClick={cancelUpdate}>
          Cancel
        </button>
       </div>

       </div>

       <br/>

        </>
       ):(
        <>
       {/* //task form */}
       <div className='row'>
        <div className='col'>
              <input value={newTask} onChange={(e)=>setNewTask(e.target.value)} className=' form-control form-control-lg'></input>
        </div>
          <div className='col-auto'>
               <button onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
          </div>
       </div>
       <br/>

        </>
       )}



       {/* for the Display Todo  */}

       {todo && todo .length ? '' : 'No Tasks..'}
       
 
       { todo && todo.map((task ,index)=>{
        return(
          <React.Fragment key={task.id}>

          <div className='col taskBg'>
            <div className={task.status ? 'done': ' '}>
             <span className='taskNumber'>{index+1}</span>
             <span className='taskText'>{task.title}</span>

            </div>

            <div className='iconsWrap'>
              <span title="Completed / Not Completed" onClick={(e)=>markDone(task.id)}>
              <FontAwesomeIcon icon={faCircleCheck}/>
              </span> 

               { task.status ? null :

              <span title='Edit' onClick={(e)=>setUpdateData({id : task.id,
              title: task.title,
              status: task.status ? true : false

              })} >
              <FontAwesomeIcon icon={faPen}/>
              </span>
               }
               
              <span title='Delete' onClick={(e)=>deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrashCan}/>
              </span>        
            </div>

          </div>
             
          </React.Fragment>
        )
       })
 
       }

    </div>
  );
}

export default App;
