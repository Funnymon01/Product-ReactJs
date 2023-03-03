import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, TextField, Typography } from "@mui/material";
import ProductTable from "../components/product-table/ProductTable";
import { LOCALSTORAGE_LIST_PRODUCT } from "../utils";
import { Add, ArrowDropDown, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { OPTIONS_STATUS } from "../constants";

export default function HomePage() {
  const navigate = useNavigate();
  const products = JSON.parse(localStorage.getItem(LOCALSTORAGE_LIST_PRODUCT));
  const [listProduct, setListProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setListProduct([...products]);
  }, [searchValue]);

  const handleDeleteProduct = (product) => {
    const newProducts = [...listProduct].filter(
      (item) => item.product_id !== product.product_id
    );
    setListProduct(newProducts);
    localStorage.setItem(LOCALSTORAGE_LIST_PRODUCT,JSON.stringify(newProducts));
  };

  const handleSearch = () => {
    if (searchValue === "") {
      setListProduct([...products]);
    } else {
      const productFilter = listProduct.filter((product) =>
        product.product_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setListProduct(productFilter);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // sort when stock and out of stock
  const handleChangeMenu = (value) => {
    let newProducts;
    if (value === 'stock') {
      newProducts = [...products].filter(product => product.status === 1);
    } else if (value === 'out_stock') {
      newProducts = [...products].filter(product => product.status === 0);
    } else if (value === 'name_asc') {
      newProducts = [...products].sort((a, b) => a.product_name.toLowerCase() > b.product_name.toLowerCase() ? -1 : 1);
    } else if (value === 'name_desc') {
      newProducts = [...products].sort((a, b) => a.product_name.toLowerCase() < b.product_name.toLowerCase() ? -1 : 1);
    }
    setListProduct(newProducts);
    handleClose();
  }

  return (
    <div className="home">
      <Box
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 1,
          }}
        >
          <Box sx={{ flex: 2 }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<Add />}
              onClick={() => navigate("/add-new")}
            >
              Thêm sản phẩm
            </Button>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              size="medium"
              style={{ marginLeft: 20 }}
              endIcon={<ArrowDropDown />}
              onClick={handleClick}
            >
              Sắp xếp
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {OPTIONS_STATUS.map((item, index) => (
                <MenuItem onClick={() => handleChangeMenu(item.code)} key={index}>{item.value}</MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: "flex", flex: 3 }}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              placeholder="Nhập từ khóa..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              color="inherit"
              className="custom-button"
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>
        <Box mb={2} style={{ width: '100%', padding: '8px 12px', backgroundColor: 'yellow'}}>
          <Typography style={{ fontWeight: 600, fontSize: '20px' }}>Danh sách sản phẩm</Typography>
        </Box>
        <ProductTable
          data={listProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </Box>
    </div>
  );
}
