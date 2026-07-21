const CART_STORAGE_KEY = "redux-cart-app/cart";

// Reads the persisted cart out of localStorage on app startup.
// Returns undefined (not null/[]) on any failure so the caller can fall
// back to the slice's own initialState instead of a broken shape.
export function loadCartState() {
  try {
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (serialized === null) return undefined;

    const parsed = JSON.parse(serialized);
    // Minimal shape check -- a corrupted or stale-schema value shouldn't crash the app.
    if (!parsed || !Array.isArray(parsed.items)) return undefined;

    return parsed;
  } catch (err) {
    console.warn("Could not load cart from localStorage:", err);
    return undefined;
  }
}

// Writes the cart slice to localStorage. Called from store.js's subscribe()
// callback, so it runs after every dispatch that changes cart state.
export function saveCartState(cartState) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    // Quota exceeded, private-browsing restrictions, etc. -- persistence is a
    // nice-to-have, so log and move on rather than breaking the cart itself.
    console.warn("Could not save cart to localStorage:", err);
  }
}
