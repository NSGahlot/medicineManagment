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
        id: Date.now(),
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

  return (
    <MedicineContext.Provider
      value={{ medicines, cart, addMedicine, addToCart }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

// Custom Hook
export const useMedicineContext = () => useContext(MedicineContext);
