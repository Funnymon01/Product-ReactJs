import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();

	return (
		<div className="header">
			<div className="header-logo" onClick={() => navigate("/")}>
				LOGO
			</div>
			<div className="header-main"  onClick={() => navigate("/")}>
				<h4>Sign in</h4>
				<button>Quản lý sản phẩm</button>
			</div>
		</div>
	)
}
