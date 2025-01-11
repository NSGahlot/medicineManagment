import { createContext, useContext, useState } from "react";

// Create Context
const MedicineContext = createContext();

// Context Provider
export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);

  const addMedicine = (medicine) => {
    setMedicines((prev) => [
      ...prev,
      {
        ...medicine,
        id: crypto.randomUUID(),
        medicinePrice: +medicine.medicinePrice,
        quantityAvailable: +medicine.quantityAvailable,
      },
    ]);
  };

  const addToCart = (medicineId, quantity) => {
    const medicine = medicines.find((med) => med.id === medicineId);
    if (medicine && quantity > 0 && quantity <= medicine.quantityAvailable) {
      setMedicines((prev) =>
        prev.map((med) =>
          med.id === medicineId
            ? { ...med, quantityAvailable: med.quantityAvailable - quantity }
            : med
        )
      );

      setCart((prev) => {
        // If the item is alreay there in the cart.
        const existing = prev.find((item) => item.id === medicineId);
        if (existing) {
          return prev.map((item) =>
            item.id === medicineId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prev, { ...medicine, quantity }];
        }
      });
    }
  };

  const updateCartQuantity = (medicineId, updatedQuantity) => {
    const cartItem = cart.find((item) => item.id === medicineId);
    const medicine = medicines.find((med) => med.id === medicineId);

    if (cartItem && medicine) {
      if (
        updatedQuantity > 0 &&
        medicine.quantityAvailable >= updatedQuantity
      ) {
        // Increase quantity
        setCart((prev) =>
          prev.map((item) =>
            item.id === medicineId
              ? { ...item, quantity: item.quantity + updatedQuantity }
              : item
          )
        );
        setMedicines((prev) =>
          prev.map((med) =>
            med.id === medicineId
              ? {
                  ...med,
                  quantityAvailable: med.quantityAvailable - updatedQuantity,
                }
              : med
          )
        );
      } else if (
        updatedQuantity < 0 &&
        cartItem.quantity + updatedQuantity > 0
      ) {
        // Decrease quantity
        setCart((prev) =>
          prev.map((item) =>
            item.id === medicineId
              ? { ...item, quantity: item.quantity + updatedQuantity }
              : item
          )
        );
        setMedicines((prev) =>
          prev.map((med) =>
            med.id === medicineId
              ? {
                  ...med,
                  quantityAvailable: med.quantityAvailable - updatedQuantity,
                }
              : med
          )
        );
      } else if (
        updatedQuantity < 0 &&
        cartItem.quantity + updatedQuantity <= 0
      ) {
        // Remove item from cart if quantity becomes 0
        setCart((prev) => prev.filter((item) => item.id !== medicineId));
        setMedicines((prev) =>
          prev.map((med) =>
            med.id === medicineId
              ? {
                  ...med,
                  quantityAvailable: med.quantityAvailable - updatedQuantity,
                }
              : med
          )
        );
      }
    }
  };

  // console.log(cart);

  return (
    <MedicineContext.Provider
      value={{
        medicines,
        cart,
        addMedicine,
        addToCart,
        updateCartQuantity,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

// Custom Hook
export const useMedicineContext = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error(
      "UseMedicineContext should be used within MedicineProvider"
    );
  }

  return context;
};
