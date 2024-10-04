"use client";

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneCode = ({ onPhoneChange,  }) => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (value, data) => {
    const phoneCode = data.dialCode; // Extract the dial code (country code)
    const phoneNumber = value.replace(phoneCode, '').trim(); // Remove the dial code from phone number

    setPhone(value);

    // Call the callback with separate phoneCode and phoneNumber
    if (onPhoneChange) {
      onPhoneChange(phoneNumber, phoneCode);
    }
  };

  return (
    <PhoneInput
      country={'ng'}
      value={phone}
      onChange={handlePhoneChange}
      enableSearch={true}
      inputProps={{
        placeholder: 'Enter phone number',
        style: { width: '100%' }
      }}
    />
  );
};

export default PhoneCode;
