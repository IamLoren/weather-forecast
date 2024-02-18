import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModalOpen } from '../../redux/tripSlice';
import { modalOpen } from '../../redux/selectors';

const AddTripButton = () => {
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(modalOpen);

    const openModal = () => {
        dispatch(changeModalOpen(!modalIsOpen));
    }
  return (
    <button type="button" onClick={openModal}>Add Trip</button>
  )
}

export default AddTripButton