import { useState } from 'react/cjs/react.development';
import Auth from './Components/Auth';
import ItemList from './Components/Itemlist';

function App() {
  const [user, setUser] = useState('');
  const [err, setErr] = useState('');
  return (
    <div>
      {(user !== '') ?
        <ItemList />
        :
        <Auth error={err} setErr={setErr} user={user} setUser={setUser} />
      }

    </div>

  );
}

export default App;
