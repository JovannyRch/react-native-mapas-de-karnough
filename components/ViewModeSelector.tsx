import React from "react";
import { StyleSheet } from "react-native";
import Button from "./Button";
import { ViewMode } from "@/app/types/types";
import ButtonsWrapper from "./ButtonsWrapper";

interface ViewModeSelectorProps {
  currentView: string;
  setView?: (view: ViewMode) => void;
}

const ViewModeSelector = ({ currentView, setView }: ViewModeSelectorProps) => {
  return (
    <ButtonsWrapper title="Vista">
      <Button
        onPress={() => setView?.("map")}
        title="Mapa"
        active={currentView === "map"}
      />
      <Button
        onPress={() => setView?.("table")}
        title="Tabla"
        active={currentView === "table"}
      />
    </ButtonsWrapper>
  );
};

export default ViewModeSelector;
