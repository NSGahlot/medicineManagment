import AddMedicineForm from "./AddMedicineForm";
import Cart from "./Cart";
import { MedicineProvider } from "./MedicineContext";
import MedicineList from "./MedicineList";

const App = () => {
  return (
    <MedicineProvider>
      <div>
        <h1>Medicine Management</h1>
        <AddMedicineForm />
        <MedicineList />
        <Cart />
      </div>
    </MedicineProvider>
  );
};

export default App;
