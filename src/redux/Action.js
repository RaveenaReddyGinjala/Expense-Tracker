export const showForm = (flag) => {
  return { type: "SHOW_FORM", payload: flag };
};

export const addExpense = (data) => {
  return { type: "ADD_EXPENSE", payload: data };
};

export const deleteExpense = (key) => {
  return { type: "DELETE_EXPENSE", payload: key };
};
export const editExpense = (key) => {
  return { type: "EDIT_EXPENSE", payload: key };
};

export const updateExpense = (editedData) => {
  return { type: "UPDATED_EXPENSE", payload: editedData };
};

export const totalExpense = (total) => {
  return { type: "TOTAL_EXPENSE", payload: total };
};

export const searchExpense = (query) => {
  return { type: "SEARCH_EXPENSE", payload: query };
};
