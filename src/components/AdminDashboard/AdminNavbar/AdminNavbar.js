"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./AdminNavbar.css");
const blue_ocean_logo_2_png_1 = require("../../../assets/blue-ocean-logo-2.png");
const react_1 = require("react");
const AdminNavbar = () => {
    const [mouseover, setMouseover] = (0, react_1.useState)(false);
    const handleMouseover = () => {
        setMouseover(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "admin-navbar-container", onMouseLeave: () => setMouseover(false) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "admin-navbar-buttons" }, { children: [(0, jsx_runtime_1.jsx)("img", { className: "admin-navbar-logo", src: blue_ocean_logo_2_png_1.default }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "classes-btn" }, { children: "Classes" })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "admins-btn" }, { children: "Admins" })) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "archives-btn" }, { children: "Archives" })) })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `admin-dropdown ${mouseover ? 'mouseover' : ''}` }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "admin-dropdown-btn", onMouseEnter: () => setMouseover(true) }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "admin-dropdown-avatar" }, { children: "AA" })), (0, jsx_runtime_1.jsx)("p", { children: "ADMIN-NAME" }), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "triangle", viewBox: "0 0 232.72 86.82" }, { children: (0, jsx_runtime_1.jsx)("path", { className: "cls-1", d: "M116.02,120.76L1.17,.5H230.88L116.02,120.76Z" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: mouseover ? 'admin-dropdown-account' : 'hidden' }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "MY ACCOUNT" }), (0, jsx_runtime_1.jsx)("p", { children: "email address" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: mouseover ? 'admin-dropdown-sign-out' : 'hidden' }, { children: "SIGN OUT" }))] }))] })));
};
exports.default = AdminNavbar;
