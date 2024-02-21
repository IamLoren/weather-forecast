import React from 'react';
import s from './SearchBar.module.css';
import Icon from '../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchWord, changeSearchedTrips } from '../../redux/tripSlice';
import { tripsList } from '../../redux/selectors';

const SearchBar = () => {
  const dispatch = useDispatch();
  const allCities = useSelector(tripsList);

  const searchInList = (event) => {
    event.preventDefault();
    dispatch(changeSearchWord(event.target.search.value))
    const searchedTrips = allCities.filter(trip => trip.city.toLowerCase().includes(event.target.search.value.toLowerCase()));
    dispatch(changeSearchedTrips(searchedTrips))
  }
  return (
    <form className={s.form} onSubmit={searchInList}>
        <input name="search" type="search" className={s.input} placeholder="Find your Trip"/>
        <button type="submit" className={s.button}>
          <Icon name="icon-search" className={s.searchIcon}/>
        </button>
    </form>
  )
}

export default SearchBar