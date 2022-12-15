import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddCategory,
  AddFriend,
  AddTransaction,
  Categories,
  Friends,
  Setup,
} from "../../views";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AddTransaction />}></Route>
        <Route exact path="/setup" element={<Setup />}></Route>
        <Route exact path="/friends" element={<Friends />}></Route>
        <Route exact path="/categories" element={<Categories />}></Route>
        <Route exact path="/add-friend" element={<AddFriend />}></Route>
        <Route exact path="/add-category" element={<AddCategory />}></Route>
        <Route
          exact
          path="/add-transaction"
          element={<AddTransaction />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
