const initialState = {
  expenseList: localStorage.getItem("expenselist")
    ? JSON.parse(localStorage.getItem("expenselist"))
    : [],
  showForm: false,
  editFormKey: "",
  total: 0,
  searchTerm: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SHOW_FORM":
      return { ...state, showForm: payload };

    case "ADD_EXPENSE":
      localStorage.setItem(
        "expenselist",
        JSON.stringify([...state.expenseList, payload])
      );

      return { ...state, expenseList: [...state.expenseList, payload] };

    case "DELETE_EXPENSE":
      const filteredlist = state.expenseList.filter(
        (item) => item.createdAt != payload
      );

      localStorage.setItem("expenselist", JSON.stringify(filteredlist));

      return { ...state, expenseList: filteredlist };

    case "EDIT_EXPENSE":
      return { ...state, editFormKey: payload };

    case "UPDATED_EXPENSE":
      const { data } = payload;
      const { title, amount, category, createdAt } = data;
      const editedList = state.expenseList.map((item) => {
        if (item.createdAt === payload.key) {
          return { ...item, title, amount, category, createdAt };
        }
        return item;
      });
      localStorage.setItem("expenselist", JSON.stringify(editedList));
      //   return { ...state, expenseList: [...state.expenseList] };
      return { ...state, expenseList: editedList };

    case "TOTAL_EXPENSE":
      let sum = 0;
      state.expenseList.map((item) => {
        sum = sum + item.amount;
      });

      return { ...state, total: sum };

    case "SEARCH_EXPENSE":
      return { ...state, searchTerm: payload };

    default:
      return state;
  }
};
