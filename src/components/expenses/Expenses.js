import React from "react";
import "./Expenses.css";
import Card from "../card/Card";
import emptyImage from "../../assets/empty.png";
import { useSelector } from "react-redux";

function Expenses() {
  const List = useSelector((state) => state.expenseList);
  const searchTerm = useSelector((state) => state.searchTerm);

  const filteredList = List.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="expense-list">
      {filteredList.length ? (
        <>
          {filteredList.map((item) => (
            <Card item={item} />
          ))}
        </>
      ) : searchTerm !== "" ? (
        <>
          <div className="empty-state">
            <img
              className="empty-image"
              src={emptyImage}
              alt="emptyImage"
            ></img>
            <lable>Uh Oh! No search Results Found!</lable>
          </div>
        </>
      ) : (
        <>
          <div className="empty-state">
            <img
              className="empty-image"
              src={emptyImage}
              alt="emptyImage"
            ></img>
            <lable>Uh Oh! Your Expense List is Empty!</lable>
          </div>
        </>
      )}
    </div>
  );
}

export default Expenses;
