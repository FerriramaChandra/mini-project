import './App.css';
import Home from './wholePage/Home';
import CardDetail from './pages/CardDetail/CardDetail';
import AddProduct from './pages/AddProduct/AddProduct';
import Login from './pages/Login&Regis/Login';
import Register from './pages/Login&Regis/Register';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import PrivateRoute from './wholePage/PrivateRoute';
import Navbar from './component/navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Footer from './component/footer/Footer';
import EditProduct from './pages/EditProduct/EditProduct';

const App = () => {



  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/ProductDetail/:id' exact component={CardDetail} />
        <Route path='/Login' exact component={Login} />
        <Route path='/Register' exact component={Register} />
        <Route path='/AddProduct' exact component={AddProduct} />
        <PrivateRoute path='/ShoppingCart' exact component={ShoppingCart} />
        <PrivateRoute path='/EditProduct/:id' exact component={EditProduct} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
