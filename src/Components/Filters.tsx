import React, { useState, ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

interface FilterProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface FilterButtonProps {
  placeholder: string;
  onPress?: () => void;
  isSelected?: boolean;
}

const Filter: React.FC<FilterProps> & { Button: React.FC<FilterButtonProps> } = ({ children, style }) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0] as React.ReactElement<FilterButtonProps>;
  const firstComponentSelected = firstChild?.props.placeholder;

  const [selectedButton, setSelectedButton] = useState<string | null>(firstComponentSelected || null);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<FilterButtonProps>(child)) {
      return React.cloneElement(child, {
        isSelected: selectedButton === child.props.placeholder,
        onPress: () => {
          setSelectedButton(child.props.placeholder);
          if (child.props.onPress) {
            child.props.onPress();
          }
        },
      });
    }
    return child;
  });

  return <View style={[{ flexDirection: "row", gap: 10 }, style]}>{childrenWithProps}</View>;
};

// Componente Button
const FilterButton: React.FC<FilterButtonProps> = ({ placeholder, onPress, isSelected = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: isSelected ? "#F7374F" : "#D6D6D6",
        },
      ]}
    >
      <Text style={[styles.fontStyles, { color: isSelected ? "#FFFFFF" : "#A2A2A2" }]}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

Filter.Button = FilterButton;
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  fontStyles: {
    fontWeight: "bold",
  },
});

export default Filter;
