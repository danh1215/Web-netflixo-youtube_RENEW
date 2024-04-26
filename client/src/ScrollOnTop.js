import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollOnTop(props) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{props.children}</>;
}

export default ScrollOnTop; 
