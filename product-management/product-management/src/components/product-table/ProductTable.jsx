import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
	DialogTitle,
	DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
	Box,
  Pagination,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { MoneyFormat } from "../../utils/formatCurrency";

export default function ProductTable(props) {
  const { data, onDeleteProduct } = props;
  const navigate = useNavigate();
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [productItem, setProductItem] = useState();
  const [pageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [limitProduct, setLimitProduct] = useState(data.slice(0, pageSize));

  useEffect(() => {
    setLimitProduct(data.slice(0, pageSize));
  }, [pageSize, data]);

  const handleChangePage = (event, value) => {
    setPage(value);
    setLimitProduct(data.slice(0 + pageSize * (value - 1), pageSize * value));
  };
	
	const handleDeleteProduct = () => {
		if (productItem) {
			onDeleteProduct(productItem);
		}
		setIsConfirmModal(false);
	}

  return (
    <div className="product-table">
      <TableContainer component={Paper} style={{ width: "100%" }}>
        {data.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            Không có sản phẩm nào.
          </div>
        ) : (
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "100px", fontWeight: "bold" }}>
                  STT
                </TableCell>
                <TableCell sx={{ minWidth: "100px", fontWeight: "bold" }}>
                  Mã
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ minWidth: "200px", fontWeight: "bold" }}
                >
                  Hình ảnh
                </TableCell>
                <TableCell sx={{ minWidth: "200px", fontWeight: "bold" }}>
                  Tên
                </TableCell>
                <TableCell align="right" sx={{ minWidth: "200px", fontWeight: "bold" }}>
                  Giá
                </TableCell>
                <TableCell sx={{ minWidth: "200px", fontWeight: "bold" }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ flex: 1, fontWeight: "bold" }}>
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {limitProduct &&
                limitProduct.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.product_id}</TableCell>
                      <TableCell className="product-image">
                        <img src={item?.product_image} alt="san-pham" />
                      </TableCell>
                      <TableCell>{item?.product_name}</TableCell>
                      <TableCell align="right" style={{ color: 'red' }}>{MoneyFormat(item?.price)}</TableCell>
                      <TableCell>
                        {item?.status === 0 ? (
                          <button className="product-status bgc-gray">
                            Hết hàng
                          </button>
                        ) : (
                          <button className="product-status bgc-green">
                            Còn hàng
                          </button>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          startIcon={<Edit />}
                          sx={{ mr: 1, color: "#fff" }}
                          onClick={() =>
                            navigate(`/product/${item.product_id}/edit`, {
                              state: { data: item },
                            })
                          }
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          startIcon={<Delete />}
                          sx={{ mr: 1, color: "#fff" }}
                          onClick={() => {
                            setIsConfirmModal(true);
                            setProductItem(item);
                          }}
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Box mt={2} mb={3} sx={{ display: 'flex', alignItem: 'center', justifyContent: 'flex-end'}}>
        <Pagination
          page={page}
          count={Math.ceil(data?.length / pageSize)}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      {isConfirmModal && (
        <Dialog
          open={isConfirmModal}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <DialogTitle sx={{ borderBottom: "1px solid #cccccc" }}>
            <Typography
              sx={{ fontWeight: 600, textAlign: "center", fontSize: "20px" }}
            >
              Xác nhận xóa sản phẩm
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{ borderBottom: "1px solid #cccccc", margin: "10px 0" }}
          >
            Bạn có chắc chắn muốn xóa sản phẩm này?
          </DialogContent>
          <DialogActions>
            <Box
              width="100%"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem", color: "#fff" }}
                onClick={handleDeleteProduct}
              >
                Đồng ý
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => setIsConfirmModal(false)}
              >
                Hủy
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
