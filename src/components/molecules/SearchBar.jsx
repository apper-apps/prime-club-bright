import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const SearchBar = ({ 
  placeholder = "Search...",
  onSearch,
  onClear,
  className = "",
  showClearButton = true,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onClear?.();
    onSearch?.("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        icon="Search"
        iconPosition="left"
        className="pr-20"
        {...props}
      />
      {showClearButton && searchTerm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="p-1 h-8 w-8 hover:bg-slate-700 rounded-full"
          >
            <span className="sr-only">Clear search</span>
            ×
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;