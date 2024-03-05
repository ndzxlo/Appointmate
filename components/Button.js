import React from "react";
import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* const Button = ({ onClick, children, className, type, icon }) => {
  return ( 
    <button type={type} className={`my-button ${className}`}onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="icon" />}
      {children}
    </button>
  );
}; */

const Button = ({
  children,
  icon,
  iconFirst = "true",
  className,
  ...otherProps
}) => {
  return (
    <button className={`my-button ${className}`} {...otherProps}>
      {iconFirst ? (
        <>
          {icon && <FontAwesomeIcon icon={icon} />} {children}
        </>
      ) : (
        <>
          {children} {icon && <FontAwesomeIcon icon={icon} />}
        </>
      )}
    </button>
  );
};

export default Button;
