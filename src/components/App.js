import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);


  useEffect(() => {
    fetch ("http://localhost:3001/toys")
    .then((r) => r.json())
    .then (setToys)
    }, []);
  
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleAddToy(newToy) {
    setToys([...toys,newToy])
  }
    // delete a toy makes a new array of updatedToys and removes the one who's is id filtered
function handleDeleteToy(toyToDelete) {
  const updatedToys = toys.filter((toy) => toy.id !== toyToDelete.id);
  setToys(updatedToys);
}
// handleUpdatedToy uses updatedToy as an argument and maps through the toy array for the toy id that was delted and removes it from the toy array, returning a new updated array
function handleUpdateToy(updatedToy) {
  const updatedToys = toys.map((toy) =>
  toy.id === updatedToy.id ? updatedToy : toy
  );
setToys(updatedToys);
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/>:null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} 
       onDeleteToy ={handleDeleteToy}
       onUpdateToy ={handleUpdateToy}/>
    </>
  );
}

export default App;
