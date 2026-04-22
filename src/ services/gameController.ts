import { fetchRandomProduct } from "./productService";
import { updateSession } from "./gameSessionService";
import { Session } from "../types/Session";

export async function startRound(session: Session) {
  const product = await fetchRandomProduct();

  await updateSession(session.id, {
    currentGame: product.title,
    correctPrice: product.price,
    status: "playing"
  });
}

import { updateSession } from "./gameSessionService";

export async function resolveRound(session: Session, guess: number) {
  // tässä kohtaa pitäisi:
  // 1. tallentaa pelaajan arvaus
  // 2. tarkistaa onko kaikki arvanneet
  // 3. jos kyllä → siirry tulosvaiheeseen

  // ESIMERKKI (yksinkertaistettu)
  await updateSession(session.id, {
    // esim. guesses map
    // guesses: { [userId]: guess }
  });
}
