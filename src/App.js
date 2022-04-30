import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import FoodItems from './pages/FoodItems';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Reservation from './pages/Reservation';
import OrderStatus from './pages/OrderStatus';
import Terms from './pages/Terms';
import AddFoodItem from './pages/AddFoodItem';
import Dashboard from './pages/dashboard/Dashboard';
import RestaurantOnboarding from './pages/auth/RestaurantOnboarding';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Places from './pages/Places';
import Support from './pages/Support';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/reviews' element={<Reviews/>} />
        <Route path="/fooditems" element={<FoodItems/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path='/transactions' element={<Transactions/>} />
        <Route path="/reservation" element={<Reservation/>} />
        <Route path='/orderstatus' element={<OrderStatus/>} />
        <Route path='/terms' element={<Terms/>} />
        <Route path="/addItem" element={<AddFoodItem/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/onboarding' element={<RestaurantOnboarding/>} />
        <Route path="/places" element={<Places/>} />
        <Route path='/support' element={<Support/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
