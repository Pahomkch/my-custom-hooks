import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todo';
import useHover from './hooks/useHover';
import useInput from './hooks/useInput';
import { ITodo } from './types/types';
import useScroll from './hooks/uesScroll';

function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const boxTwoRef = useRef<HTMLDivElement | null>(null)
  const nameInput = useInput('Me')
  const {isHover : boxHover} = useHover(boxRef.current)
  const {isHover : boxTwoHover} = useHover(boxTwoRef.current)
  const parentUL = useRef<any>()
  const anchorFetchTodos = useRef<any>()
  useScroll(parentUL.current, anchorFetchTodos.current, fetchTodos)

  async function fetchTodos(page: number = 3) {
      const {data} = await getTodos(pageNumber) 
    setPageNumber(prev => prev + 1)
    setTodos(prev => [...prev, ...data])
  }

   useEffect(() => {
    fetchTodos(1)
  }, [])
  return (
    <div className="App">
      <input {...nameInput} type="text" placeholder="1"/>
      <div ref={boxRef} className="boxHover" style={{height: 30, backgroundColor: boxHover ? "black" : 'grey'}}></div>
      <div ref={boxTwoRef} className="boxHover" style={{height: 30, backgroundColor: boxTwoHover ? "black" : 'yellow'}}></div>
      <div style={{height: "50vh", overflowY: "scroll"}} ref={parentUL}>
        <ul >
          {todos.map( ({id,completed,title,userId}, idx) => {
            return <li key={id}>{id}. {title} <input type="checkbox" checked={completed}/></li>

          })}
        </ul>
        <div ref={anchorFetchTodos} className="anchor-for-loading"  style={{height: "10px"}}></div>
      </div>
    </div>
  );
}

export default App;
