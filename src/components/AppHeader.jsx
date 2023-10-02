import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../app/slices/todoSlice'

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const filterStatus = useSelector((state) => state.todo.filterStatus)

  const dispatch = useDispatch()

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value))
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <div className={styles.appHeader}>
      <Button type="button" onClick={openModal}>
        Add Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}

export default AppHeader
