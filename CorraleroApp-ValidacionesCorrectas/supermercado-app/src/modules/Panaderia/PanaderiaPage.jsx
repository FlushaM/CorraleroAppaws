import React from "react";
import EntregaPage from "../common/EntregaPage";
import "./PanaderiaPage.css";

const PanaderiaPage = () => {
  return (
    <EntregaPage 
      title="Panadería" 
      endpoint="entregas" // Reutilizamos el endpoint si es común para todos
    />
  );
};

export default PanaderiaPage;
