import { IconButton } from "@mui/material";

const IconButtonHOC = ({ className, onClick, children }) => {
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <IconButton
      type="button"
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </IconButton>
  );
};

export default IconButtonHOC;
