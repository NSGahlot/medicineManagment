import { useRef } from "react";
import { useMedicineContext } from "./MedicineContext";

const Cart = () => {
  const { cart, updateCartQuantity } = useMedicineContext();
  const dialogRef = useRef(null);

  const openCart = () => dialogRef.current.showModal();
  const closeCart = () => dialogRef.current.close();

  const handleIncrease = (id) => {
    updateCartQuantity(id, 1); // Increase quantity by 1
  };

  const handleDecrease = (id) => {
    updateCartQuantity(id, -1); // Decrease quantity by 1
  };

  return (
    <div>
      <button onClick={openCart}>View Cart</button>
      <dialog ref={dialogRef} className="cart-dialog">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id}>
              <span>{item.medicineName}</span>
              <span>${item.medicinePrice}</span>
              <span>Quantity: {item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
              <button
                onClick={() => handleDecrease(item.id)}
                disabled={item.quantity <= 0} // Prevent quantity from going below 0
              >
                -
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
        <button onClick={closeCart}>Close</button>
      </dialog>
    </div>
  );
};

export default Cart;
