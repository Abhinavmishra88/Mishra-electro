import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    try {

      const savedCart =
        localStorage.getItem("mishra_cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];

    } catch (error) {

      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });


  // =====================================================
  // SAVE CART
  // =====================================================

  useEffect(() => {

    try {

      localStorage.setItem(
        "mishra_cart",
        JSON.stringify(cart)
      );

    } catch (error) {

      console.error(
        "Failed to save cart:",
        error
      );

    }

  }, [cart]);


  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {

    if (!product || !product.id) {
      return;
    }

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        );


      if (existingProduct) {

        return currentCart.map((item) =>

          item.id === product.id

            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) + 1,
              }

            : item
        );
      }


      return [
        ...currentCart,

        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (productId) => {

    setCart((currentCart) =>

      currentCart.filter(
        (item) =>
          item.id !== productId
      )

    );
  };


  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (productId) => {

    setCart((currentCart) =>

      currentCart.map((item) =>

        item.id === productId

          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1,
            }

          : item
      )

    );
  };


  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (productId) => {

    setCart((currentCart) =>

      currentCart

        .map((item) =>

          item.id === productId

            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) - 1,
              }

            : item
        )

        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )

    );
  };


  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQuantity = (
    productId,
    quantity
  ) => {

    const newQuantity =
      Number(quantity);


    if (
      !Number.isFinite(newQuantity) ||
      newQuantity <= 0
    ) {

      removeFromCart(productId);

      return;
    }


    setCart((currentCart) =>

      currentCart.map((item) =>

        item.id === productId

          ? {
              ...item,
              quantity: newQuantity,
            }

          : item
      )

    );
  };


  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      "mishra_cart"
    );
  };


  // =====================================================
  // CHECK PRODUCT IN CART
  // =====================================================

  const isInCart = (productId) => {

    return cart.some(
      (item) =>
        item.id === productId
    );
  };


  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const cartCount = cart.reduce(

    (total, item) =>

      total +
      Number(item.quantity || 1),

    0
  );


  // =====================================================
  // TOTAL PRICE
  // =====================================================

  const cartTotal = cart.reduce(

    (total, item) =>

      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),

    0
  );


  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {

    // Main cart
    cart,

    // Alias expected by Checkout.jsx
    cartItems: cart,

    // Cart functions
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    isInCart,

    // Calculations
    cartCount,
    cartTotal,
  };


  return (

    <CartContext.Provider value={value}>

      {children}

    </CartContext.Provider>
  );
}


// =======================================================
// useCart
// =======================================================

export function useCart() {

  const context =
    useContext(CartContext);


  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }


  return context;
}


// =======================================================
// BACKWARD COMPATIBILITY
// =======================================================

export function useCartContext() {

  return useCart();
}


export default CartContext;