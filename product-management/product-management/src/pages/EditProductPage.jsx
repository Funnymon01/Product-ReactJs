import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { ArrowBack, Check } from "@mui/icons-material";
import { LOCALSTORAGE_LIST_PRODUCT } from "../utils";
import InputField from "../components/form-field/InputField";

export default function EditProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const productItem = location.state.data;
	const [values, setValues] = useState({
		product_id: productItem.product_id,
		product_name: productItem.product_name,
		product_image: productItem.product_image,
		price: productItem.price,
		status: productItem.status
	});
	const [checked, setChecked] = useState(productItem.status === 1 ? true : false);
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
    const index = newProducts.findIndex(item => item.product_id === values.product_id);
    newProducts[index] = values;
    setListProduct(newProducts);
		localStorage.setItem(LOCALSTORAGE_LIST_PRODUCT, JSON.stringify(newProducts));
		alert("Cập nhật sản phẩm thành công");
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
