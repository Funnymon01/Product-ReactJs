import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import InputField from "../components/form-field/InputField";
import { ArrowBack, Check } from "@mui/icons-material";
import { LOCALSTORAGE_LIST_PRODUCT } from "../utils";

export default function AddNewProductPage() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		product_id: Math.floor(Math.random() * 10000),
		product_name: '',
		product_image: '',
    price: '',
    status: 0
	});
  const [checked, setChecked] = useState(false);
	const [listProduct, setListProduct] = useState([]);

	useEffect(() => {
		const products = JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST_PRODUCT));
		setListProduct([...products]);
	}, [])

	const handleChange = (e) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const handleChecked = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setValues(prev => ({ ...prev, status: 1 }));
    } else {
      setValues(prev => ({ ...prev, status: 0 }));
    }
	}

  const onSubmit = () => {
		let newProducts = [...listProduct];
		newProducts.push(values);
		localStorage.setItem(LOCALSTORAGE_LIST_PRODUCT, JSON.stringify(newProducts));
		alert("Thêm sản phẩm thành công");
		navigate("/");
	}

  return (
    <div className="add-new">
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          margin: "20px auto",
        }}
      >
        <div className="product-item">
          <Typography variant="body1">Tên sản phẩm:</Typography>
          <InputField
            value={values.product_name}
            name={"product_name"}
            onChange={handleChange}
          />
        </div>
        <div className="product-item">
          <Typography variant="body1">Giá:</Typography>
          <InputField
            type="number"
            value={values.price}
            name={"price"}
            onChange={handleChange}
          />
        </div>
        <div className="product-item">
          <Typography variant="body1">Hình ảnh:</Typography>
          <InputField
            value={values.product_image}
            name={"product_image"}
            onChange={handleChange}
          />
        </div>
        <div className="product-item">
          <Typography variant="body1">Trạng thái: </Typography>
					<FormControlLabel
						label="Còn hàng"
						control={
							<Checkbox 
                checked={checked}
                value={values.status}
								onChange={handleChecked}
							/>
						}
					/>
        </div>
        <Box mt={2}>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            startIcon={<ArrowBack />}
						sx={{ mr: 1, color: "#fff" }}
						onClick={() => navigate(-1)}
          >
            Trở lại
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<Check />}
						sx={{ mr: 1, color: "#fff" }}
						onClick={onSubmit}
          >
            Lưu lại
          </Button>
        </Box>
      </Box>
    </div>
  );
}
