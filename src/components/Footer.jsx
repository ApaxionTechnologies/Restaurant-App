import React from "react";
import "./Footer.css";


export default function Footer() {
  return (
    <footer className="footer">
      
      <p>&copy; {new Date().getFullYear()} QR Menu App. All rights reserved.</p>
    </footer>
  );
}