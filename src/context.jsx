import { createContext, useContext, useState } from "react";

const MedicineContext = createContext();

export default function MedicineContextProvider({ children }) {
  const [medicineState, setMedicineState] = useState({
    isAddedToCart: false,
    medicines: [],
    cart: [],
  });

  return (
    <MedicineContext.Provider value={{ medicineState, setMedicineState }}>
      {children}
    </MedicineContext.Provider>
  );
}

export function useMedicineContext() {
  const context = useContext(MedicineContext);

  if (context === undefined) {
    throw new Error(
      "UseMedicineContext should be used within MedicineContextProvider"
    );
  }

  return context;
}
