import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const initialState = {
  items: JSON.parse(localStorage.getItem("bruma_carrito")) || [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, cantidad: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, cantidad: i.cantidad + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, cantidad: i.cantidad - 1 } : i
          )
          .filter((i) => i.cantidad > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("bruma_carrito", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((acc, i) => acc + i.cantidad, 0);
  const subtotal = state.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const envioGratis = subtotal >= 30000;
  const faltaParaEnvio = Math.max(0, 30000 - subtotal);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        envioGratis,
        faltaParaEnvio,
        addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        increment: (id) => dispatch({ type: "INCREMENT", id }),
        decrement: (id) => dispatch({ type: "DECREMENT", id }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        openCart: () => dispatch({ type: "OPEN" }),
        closeCart: () => dispatch({ type: "CLOSE" }),
        toggleCart: () => dispatch({ type: "TOGGLE" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
