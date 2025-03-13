import { create } from "zustand";

export const useCartStore = create((set) => {
  // Load cart from localStorage
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    cart: savedCart,

    // Set the entire cart (used for localStorage persistence)
    setCart: (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
      set({ cart: newCart });
    },

    // Add an item to the cart
    addToCart: (item) =>
      set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
        let updatedCart;
        if (existingItem) {
          updatedCart = state.cart.map((cartItem) =>
            cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          );
        } else {
          updatedCart = [...state.cart, { ...item, quantity: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),

    // Remove an item from the cart
    removeFromCart: (id) =>
      set((state) => {
        const updatedCart = state.cart.filter((item) => item._id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),

    // Update quantity
    updateQuantity: (id, newQuantity) =>
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item._id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
  };
});
