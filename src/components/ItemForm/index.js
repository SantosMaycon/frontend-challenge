import { useState } from 'react'

import * as S from './styles'

import Button from 'components/Button'
import Input from 'components/Input'

const Index = ({ todo, inputRef, setTodos, valid, setDisabled }) => {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    editText()
    inputRef.current.focus()
  }

  function changeState() {
    setTodos((list) => [
      { id: todo.id, text: todo.text, state: 'Done' },
      ...list.filter((toDo) => todo.id != toDo.id)
    ])
    setText('')
    setDisabled(false)
    inputRef.current.focus()
  }

  function remove() {
    setTodos((list) => [...list.filter((toDo) => todo.id != toDo.id)])
    setText('')
    setDisabled(false)
    inputRef.current.focus()
  }

  function editText() {
    const newTodo = { id: todo.id, text: text, state: 'Pending' }

    if (text && text != todo.text)
      setTodos((list) => [
        ...list.map((toDo) => {
          if (toDo.id === todo.id) {
            return newTodo
          }
          return toDo
        })
      ])

    setText('')
    setDisabled(false)
  }

  function handleFocus() {
    setText(todo.text)
    setDisabled(true)
  }

  return (
    <S.Form onSubmit={handleSubmit} onBlur={editText} onFocus={handleFocus}>
      <label htmlFor="text"></label>
      <Input valid={valid} todo={todo} text={text} setText={setText} />
      <Button type="button" onClick={remove} styleButton="Remove" />
      <Button type="button" onClick={changeState} styleButton="Check" />{' '}
    </S.Form>
  )
}

export default Index
