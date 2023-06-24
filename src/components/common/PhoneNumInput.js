import React from "react";
import './PhoneNumInput.css';
import { useState } from "react";

export const PhoneNumInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handlePhonenNumberChange = (input) => {
    let unformattedString = input.target.value;
    const phoneNumber = unformattedString.replace(/\D/g, "");
    if (phoneNumber.length === 0) {
      setPhoneNumber("");
      return;
    }
    const formattedPhoneNumber = phoneNumber.replace(
      /^(\d{3})(\d{0,3})(\d{0,10})$/,
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
  }

  return (
    <div class="container text-center">
      <input
        type="tel"
        id="phone"
        maxlength="16"
        placeholder="mobile number"
        autocomplete="off"
        oninput="formatPhoneNumber(this)"
        value={phoneNumber}
        onChange={handlePhonenNumberChange}
      />
      <div>
        <label for="phone">(123) 456-7890</label>
      </div>
    </div>
  );
};