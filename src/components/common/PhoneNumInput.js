import React from "react";
import "./PhoneNumInput.css";
import { useState } from "react";

export const PhoneNumInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhonenNumberChange = (input) => {
    let unformattedString = input.target.value;
    if (unformattedString.length > 16) {
      unformattedString = unformattedString
        .replace(")", "")
        .replace("(", "")
        .replace(" ", "")
        .replace("-", "")
        .slice(0, 16);
    }
    const phoneNumber = unformattedString.replace(/\D/g, "");
    if (phoneNumber.length === 0) {
      setPhoneNumber("");
      return;
    }
    const formattedPhoneNumber = phoneNumber.replace(
      /^(\d{3})(\d{0,3})(\d{0,16})$/,
      function (match, group1, group2, group3) {
        let formattedNumber = "";
        if (group1 && !group2) {
          formattedNumber += `${group1}`;
        }
        if (group1 && group2) {
          formattedNumber += `(${group1})`;
        }
        if (group2) {
          formattedNumber += ` ${group2}`;
        }
        if (group3) {
          formattedNumber += `-${group3}`;
        }
        return formattedNumber;
      }
    );
    if (formattedPhoneNumber) setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <div className="container text-center">
      <input
        type="tel"
        id="phone"
        maxLength="16"
        placeholder="mobile number"
        autoComplete="off"
        value={phoneNumber}
        onChange={handlePhonenNumberChange}
      />
      <div>
        <label htmlFor="phone">(123) 456-7890</label>
      </div>
    </div>
  );
};
