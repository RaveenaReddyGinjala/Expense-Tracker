import React, { useState } from "react";
import "./Form.css";
import educationIcon from "../../assets/education.png";
import entertainmentIcon from "../../assets/entertainment.png";
import foodIcon from "../../assets/food.png";
import healthcareIcon from "../../assets/healthcare.png";
import shoppingIcon from "../../assets/shopping.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showForm,
  addExpense,
  editExpense,
  updateExpense,
  totalExpense,
} from "../../redux/Action";

function Form() {
  const editFormKey = useSelector((state) => state.editFormKey);
  const expenseList = useSelector((state) => state.expenseList);
  let defaulttitle = "";
  let defaultamount = "";
  let defaultcategory = "";
  if (editFormKey) {
    const toBeEditedExpense = expenseList.filter(
      (item) => item.createdAt === editFormKey
    );

    const [expense] = toBeEditedExpense;
    defaulttitle = expense.title;
    defaultamount = expense.amount;
    defaultcategory = expense.category;
  }
  const [title, setTitle] = useState(defaulttitle);
  const [amount, setAmount] = useState(defaultamount);
  const [category, setCategory] = useState(defaultcategory);
  const [isCategoryOpen, setisCategoryOpen] = useState(false);
  const dispatch = useDispatch();

  const categories = [
    {
      id: 1,
      title: "Education",
      icon: educationIcon,
      color: "#A95EC2",
    },
    {
      id: 2,
      title: "Healthcare",
      icon: healthcareIcon,
      color: "#FF768A",
    },
    {
      id: 3,
      title: "Shopping",
      icon: shoppingIcon,
      color: "#EC60AB",
    },
    {
      id: 4,
      title: "Food",
      icon: foodIcon,
      color: "#FF9E6D",
    },
    {
      id: 5,
      title: "Other",
      icon: entertainmentIcon,
      color: "#FFCB5E",
    },
  ];

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleAmount(e) {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setAmount("");
      return;
    }
    setAmount(value);
  }
  function handleCategory(category) {
    setCategory(category);

    setisCategoryOpen(false);
  }

  function handleSubmit() {
    if (title === "" || amount === "" || !category) {
      toast.warn("Data Incomplete!");

      return;
    }

    const data = {
      title,
      amount,
      category,
      createdAt: new Date(),
    };

    dispatch(addExpense(data));
    dispatch(totalExpense());

    dispatch(showForm(false));
    toast.success("Expense Added Successfully!");
  }
  function handleCancel() {
    if (editFormKey) {
      dispatch(editExpense(""));
    }
    dispatch(showForm(false));
  }

  function handleUpdate() {
    if (title === "" || amount === "" || !category) {
      toast.warn("Data Incomplete!");

      return;
    }
    if (
      title === defaulttitle &&
      amount === defaultamount &&
      category === defaultcategory
    ) {
      toast.warn("No Data Change!");

      return;
    }
    const data = {
      title,
      amount,
      category,
      createdAt: new Date(),
    };

    dispatch(updateExpense({ data: data, key: editFormKey }));
    dispatch(totalExpense());

    dispatch(showForm(false));

    dispatch(editExpense(""));
    toast.success("Expense Updated Successfully!");
  }

  return (
    <div className="form">
      <div className="form-item">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter Expenditure"
          onChange={handleTitle}
          value={title}
        ></input>
      </div>
      <div className="form-item">
        <label>Amount $</label>
        <input
          type="text"
          placeholder="Enter Amount"
          onChange={handleAmount}
          value={amount}
        ></input>
      </div>
      <div className="category-container-parent">
        <div className="category">
          <div
            className="category-dropdown"
            onClick={() => setisCategoryOpen(!isCategoryOpen)}
          >
            <label>{category ? category.title : "Category"}</label>
            <i class="fi-rr-angle-down"></i>
          </div>

          {isCategoryOpen && (
            <div className="category-container">
              {categories.map((category) => (
                <div
                  className="category-item"
                  key={category.id}
                  onClick={() => handleCategory(category)}
                  style={{ borderRight: `6px solid ${category.color}` }}
                >
                  <label>{category.title} </label>
                  <img src={category.icon} alt={category.title}></img>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="form-buttons">
        <div onClick={editFormKey ? handleUpdate : handleSubmit}>
          <label>{editFormKey ? "UPDATE" : "ADD"}</label>
          <i class="fi-rr-paper-plane"></i>
        </div>
        <div onClick={handleCancel}>
          <label>Cancel</label>
          <i class="fi-rr-cross-circle"></i>
        </div>
      </div>
    </div>
  );
}

export default Form;
