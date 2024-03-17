import React from "react";
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleReserFilter = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            onChange={handleTitleFilterChange}
            value={titleFilter}
            type="text"
            placeholder="Filter by title..."
          ></input>
        </div>
        <button type="button" onClick={handleReserFilter}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
