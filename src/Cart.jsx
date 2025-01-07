import { useRef } from "react";
import { useMedicineContext } from "./MedicineContext";

const Cart = () => {
  const { cart } = useMedicineContext();
  const dialogRef = useRef(null);

  const openCart = () => dialogRef.current.showModal();
  const closeCart = () => dialogRef.current.close();

  return (
    <div>
      <button onClick={openCart}>View Cart</button>
      <dialog ref={dialogRef} className="cart-dialog">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id}>
              <span>{item.medicineName}</span> -{" "}
              <span>${item.medicinePrice}</span> -{" "}
              <span>Quantity: {item.quantity}</span>
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
