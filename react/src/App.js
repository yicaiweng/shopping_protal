import { useState } from 'react/cjs/react.development';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './Components/Auth';
import ItemList from './Components/Itemlist';
import Checkout from './Components/Checkout';
import Confirmation from './Components/Confirmation';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(false);
  const [err, setErr] = useState('');

  const handleSignin = () => {
    setUser(true);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" handleSignin={handleSignin}
          render={props =>
            <Auth {...props} user={user} setUser={setUser} error={err} />
          }
        >
        </Route>
        <ProtectedRoute exact path="/itemList" component={ItemList} user={user} />
        <ProtectedRoute exact path="/checkout" component={Checkout} user={user} />
        <ProtectedRoute exact path="/confirmation" component={Confirmation} user={user} />
      </Switch>
    </Router>
  );
}

export default App;
