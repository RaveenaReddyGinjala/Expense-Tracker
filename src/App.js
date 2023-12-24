import "./App.css";
import Expenses from "./components/expenses/Expenses";
import Form from "./components/form/Form";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const formFlag = useSelector((state) => state.showForm);
  return (
    <div className="App">
      <Header />
      {formFlag ? <Form /> : <Expenses />}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
