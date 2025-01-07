import { useState } from "react";
import { useMedicineContext } from "./MedicineContext";

const AddMedicineForm = () => {
  const { addMedicine } = useMedicineContext();
  const [formData, setFormData] = useState({
    medicineName: "",
    medicineDescription: "",
    medicinePrice: 0,
    quantityAvailable: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.medicineName &&
      formData.medicinePrice &&
      formData.quantityAvailable
    ) {
      addMedicine(formData);
      setFormData({
        medicineName: "",
        medicineDescription: "",
        medicinePrice: "",
        quantityAvailable: "",
      });
    } else {
      alert("Please fill out all required fields!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Medicine</h2>
      <div>
        <label>Medicine Name:</label>
        <input
          type="text"
          name="medicineName"
          value={formData.medicineName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="medicineDescription"
          value={formData.medicineDescription}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="medicinePrice"
          value={formData.medicinePrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Quantity Available:</label>
        <input
          type="number"
          name="quantityAvailable"
          value={formData.quantityAvailable}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default AddMedicineForm;
