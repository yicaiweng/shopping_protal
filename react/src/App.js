import { useState } from 'react/cjs/react.development';
import Auth from './Components/Auth';

function App() {
  const [user, setUser] = useState('');
  const [err, setErr] = useState('');
  console.log(user)
  return (
    <div>
      {(user !== '') ?
        <h1>hello</h1> :
        <Auth error={err} setErr={setErr} user={user} setUser={setUser} />
      }

    </div>

  );
}

export default App;
