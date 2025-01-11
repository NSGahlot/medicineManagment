import { useState } from "react";
import { useMedicineContext } from "./MedicineContext";

const MedicineList = () => {
  const { medicines, addToCart } = useMedicineContext();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: +value }));
  };

  const handleAddToCart = (id) => {
    const quantity = quantities[id] || 0;
    addToCart(id, quantity);
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <div>
      <h2>Medicine List</h2>
      {medicines.map((medicine) => (
        <div key={medicine.id}>
          <span>{medicine.medicineName}</span>
          <span>{medicine.medicineDescription || "No description"}</span>
          <span>Rs{medicine.medicinePrice}</span>
          <span>Stock: {medicine.quantityAvailable}</span>
          <input
            type="number"
            min="0"
            max={medicine.quantityAvailable}
            value={quantities[medicine.id] || ""}
            onChange={(e) => handleQuantityChange(medicine.id, e.target.value)}
            disabled={medicine.quantityAvailable <= 0}
          />
          <button
            onClick={() => handleAddToCart(medicine.id)}
            disabled={medicine.quantityAvailable <= 0}
          >
            {medicine.quantityAvailable > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
