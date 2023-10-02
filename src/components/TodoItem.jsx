import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns/esm'
import TodoModal from './TodoModal'
import { MdDelete, MdEdit } from 'react-icons/md'
import styles from '../styles/modules/todoItem.module.scss'
import { deleteTodo, updateTodo } from '../app/slices/todoSlice'
import toast from 'react-hot-toast'
import CheckButton from './CheckButton'

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const TodoItem = ({ todo }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [todo.status])

  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo.id))
    toast.success('Todo Deleted Successfully')
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true)
    console.log('update')
  }

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    )
  }

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={`${styles.todoText} ${
                todo.status === 'complete' && styles['todoText--completed']
              }`}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={styles.icon} onClick={() => handleDelete(todo)}>
            <MdDelete />
          </div>
          <div className={styles.icon} onClick={handleUpdate}>
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        oldTodo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  )
}

export default TodoItem
