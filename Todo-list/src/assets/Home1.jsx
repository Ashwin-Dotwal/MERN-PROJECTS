import React, { useState } from 'react'

import Create1 from './Create1'

const Home1 = () => {
  const [todos,setTodos]=useState([])


  return (
    <div>
    <h2>TODO-LIST</h2>
  <Create1/>
  {
    todos.length===0
    ?
    <div><h2>No Record</h2></div>
    :
    todos.map(todo=>(
      <div>
        {todo}
      </div>
    ))
  }
    </div>
  )
}

export default Home1