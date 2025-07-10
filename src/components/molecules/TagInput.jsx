import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const TagInput = ({ 
  tags = [],
  onTagsChange,
  placeholder = "Add tags...",
  className = "",
  ...props 
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions] = useState([
    "Hot Lead", "Cold Lead", "Warm Lead", "Follow Up", "Qualified", "Unqualified",
    "Enterprise", "SMB", "Startup", "VIP", "Referral", "Inbound", "Outbound"
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange?.([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    onTagsChange?.(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-2 mb-2">
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge variant="primary" className="flex items-center gap-1">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-300 transition-colors"
                >
                  <ApperIcon name="X" size={12} />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        icon="Tag"
        {...props}
      />
      
      {inputValue && filteredSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {filteredSuggestions.slice(0, 5).map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => addTag(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TagInput;