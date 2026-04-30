import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LoginForm from './LoginForm';
import { auth, logout } from './authService';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getOrCreateCodename } from './codenameService';
import { QuizForm } from './components/QuizForm';
import { createSession } from './services/gameSessionService';
import { resolveRound } from './services/gameController';
import { type Session } from './services/types/Session';

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session | null>(null);
  const [codename, setCodename] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  // Initialize count from localStorage on mount
  useEffect(() => {
    const storedCount = localStorage.getItem('laskuri');
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      const name = getOrCreateCodename(firebaseUser!.uid);
      setCodename(name);
      setSession(await createSession({ name: name + "n-arvaussessio", creatorName: name }));
    });

    return () => unsubscribe();   
  }, [])

  const handleClick = () => {
    setCount((count) => {
      localStorage.setItem('laskuri', "" + (++count));

      return count;
    })
  }

  function submitGuess(guess: number): void {
    if ( session ) {
      try {
        resolveRound(session, guess);
      } catch (error) {
        console.error("Kierroksen luonti epäonnistui: ", error);
      }  
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Heippa maailma!</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={handleClick}
        >
          Count is {count}
        </button>
        <div>
          {user ? (
            <>
              <p>👋 Tervetuloa, {codename}</p>
              <button onClick={logout}>Kirjaudu ulos</button>
            </>
          ) : (
            <LoginForm />
          )}
        </div>

        <div>
          <QuizForm 
            onSubmitGuess={(guess) => submitGuess(guess)} 
            players={[]} 
            currentUserId={codename}
          />
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom'; // Tämä voin jos käyttä router:ia

...
function RouteAnalytics() {
  // const location = useLocation(); // Tämä voin jos käyttä router:ia
  const { trackEvent } = useCloudflareAnalytics();  
  const initialReferrer = useRef<string>(
    document.referrer || "direct"
  );

  useEffect(() => {
    trackEvent("page_view", {
      referrer: initialReferrer.current,
      landingPath: window.location.pathname,
      //path: location.pathname
    });
  }, [trackEvent]);

  return null;
}

export default App
