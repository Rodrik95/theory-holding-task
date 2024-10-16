import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui faremo una richiesta al backend per verificare le credenziali
    console.log('Invio dati:', { email, password });
  };

  return (
    <>
    <div>
        ciao
    </div>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Accedi</button>
    </form>
    </>
  );
}

export default Login;