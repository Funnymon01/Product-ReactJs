import React from "react";
import { TextField } from "@mui/material";

export default function InputField({ name, type, label, value, onChange}) {

  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
			size="small"
			name={name}
			label={label}
			type={type}
      value={value}
      onChange={onChange}
    />
  );
}
