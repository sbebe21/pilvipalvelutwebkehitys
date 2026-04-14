import Koodinimi from "./koodinimi";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import LoginForm from "./LoginForm";
import { auth, logout } from "./authService";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const key = `koodinimi_${user.uid}`;
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, "");
    }
  }, [user]);

  return (

    // Paljon muuta renderöitävää

    <div>
      {user ? (
        <>
          <p>👋 Tervetuloa, {user.email}</p>
          <button onClick={logout}>Kirjaudu ulos</button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );

  // Paljon muuta koodia

}

export default App;