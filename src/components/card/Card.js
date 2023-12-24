import React, { useState, useEffect } from "react";
import "./Card.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteExpense,
  editExpense,
  showForm,
  totalExpense,
} from "../../redux/Action";

function Card({ item }) {
  const [time, setTime] = useState(moment(item.createdAt).fromNow());
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment(item.createdAt).fromNow());
    }, 60 * 1000);
    return () => clearInterval(timer);
  });

  function handleEdit() {
    dispatch(showForm(true));
    dispatch(editExpense(item.createdAt));
  }

  function handleDelete() {
    dispatch(deleteExpense(item.createdAt));
    dispatch(totalExpense());
    toast.success("Expense Deleted Successfully!");
  }

  return (
    <div
      className="card"
      style={{ borderRight: `6px solid ${item.category.color}` }}
    >
      <div className="card-left">
        <div className="card-image-container">
          <img src={item.category.icon} alt="food" className="card-image"></img>
        </div>
        <div className="card-info">
          <label className="card-title">{item.title}</label>
          <label className="card-time">{time}</label>
        </div>
      </div>
      <div className="card-right">
        <div className="card-icons">
          <div className="edit-icon" onClick={handleEdit}>
            <i class="fi fi-rr-edit-alt"></i>
          </div>
          <div className="delete-icon" onClick={handleDelete}>
            <i class="fi-rr-trash"></i>
          </div>
        </div>
        <div>
          <label className="card-amount">${item.amount}</label>
        </div>
      </div>
    </div>
  );
}

export default Card;
