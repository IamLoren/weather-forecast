import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModalOpen } from '../../redux/tripSlice';
import { modalOpen } from '../../redux/selectors';
import Icon from '../Icon/Icon';
import s from './AddTripButton.module.css'

const AddTripButton = () => {
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(modalOpen);

    const openModal = () => {
        dispatch(changeModalOpen(!modalIsOpen));
    }
  return (
    <button type="button" onClick={openModal} className={s.button}><Icon name="icon-plus" className={s.plus}/><p>Add Trip</p></button>
  )
}

export default AddTripButton