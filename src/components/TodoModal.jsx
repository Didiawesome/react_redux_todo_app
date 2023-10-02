import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { addTodo, updateTodo } from '../app/slices/todoSlice'
import styles from '../styles/modules/modal.module.scss'
import Button from './Button'

const dropIn = {
  hidden: {
    opacity: 0,
    tranform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
}

const TodoModal = ({ type = 'add', modalOpen, setModalOpen, oldTodo }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('incomplete')

  useEffect(() => {
    if (type === 'update' && oldTodo) {
      setTitle(oldTodo.title)
      setStatus(oldTodo.status)
    } else {
      setTitle('')
      setStatus('incomplete')
    }
  }, [type, oldTodo, modalOpen])

  const dispatch = useDispatch()

  const closeModal = () => {
    setModalOpen(false)
  }

  const onTitleChange = (e) => {
    const text = e.target.value
    setTitle(text)
  }

  const onStatusChange = (e) => {
    const statusState = e.target.value

    setStatus(statusState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const todo = {
      title: title.trim(),
      id: uuid(),
      status,
      time: new Date().toLocaleString(),
    }

    if (title.trim() && status) {
      if (type === 'add') {
        toast.success('Task Added Successfully')
        dispatch(addTodo(todo))
        setTitle('')
        setStatus('incomplete')
        setModalOpen(false)
        return
      }
      if (type === 'update') {
        if (oldTodo.title !== title || oldTodo.status !== status) {
          toast.success('Todo Updated Successfully')
          dispatch(updateTodo({ ...oldTodo, title, status }))
          setModalOpen(false)
          return
        } else {
          toast.error('No changes made')
          return
        }
      }
    }
    toast.error("Title couldn't be empty")
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              onClick={closeModal}
              className={styles.closeButton}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add Task' : 'Update task'}
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={onTitleChange}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={onStatusChange}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit">
                  {type === 'add' ? 'Add Task' : 'Update'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  onKeyDown={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TodoModal
