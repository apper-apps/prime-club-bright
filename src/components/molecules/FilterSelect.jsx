import { useState } from "react";
import Select from "@/components/atoms/Select";
import { motion } from "framer-motion";

const FilterSelect = ({ 
  options = [],
  placeholder = "Filter by...",
  onFilter,
  className = "",
  ...props 
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onFilter?.(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Select
        options={options}
        placeholder={placeholder}
        value={selectedValue}
        onChange={handleChange}
        {...props}
      />
    </motion.div>
  );
};

export default FilterSelect;