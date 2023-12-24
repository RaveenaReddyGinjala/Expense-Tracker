import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import dollar from "../../assets/dollar.png";
import { searchExpense, showForm, totalExpense } from "../../redux/Action";

function Header() {
  const dispatch = useDispatch();
  const expenselist = useSelector((state) => state.expenseList);
  var disableSearch = expenselist.length > 0 ? false : true;

  const total = useSelector((state) => state.total);
  function handleAddForm() {
    dispatch(showForm(true));
  }

  useEffect(() => {
    dispatch(totalExpense());
  });

  function handleSearch(e) {
    dispatch(searchExpense(e.target.value));
  }

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-logo">
          <i class="fi-rr-credit-card" />
        </div>
        <div className="header-total">
          <img src={dollar} alt="img-dollar" />
          <label>Total : </label>
          <label>{total}</label>
        </div>
      </div>
      <div className="header-bottom">
        <div className="search-bar">
          <i class="fi-rr-search"></i>
          <input
            placeholder="search for expenses"
            onChange={handleSearch}
            disabled={disableSearch}
          ></input>
        </div>

        <div className="add-button" onClick={handleAddForm}>
          <i class="fi-rr-add"></i>
          <label>ADD</label>
        </div>
      </div>
    </div>
  );
}

export default Header;
