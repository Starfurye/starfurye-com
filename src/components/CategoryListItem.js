import React from "react";
import { Link } from "gatsby";

const CategoryListItem = ({ link, categoryName, count, color }) => {
    return (
        <Link
            className="category-list-item"
            to={link}
            style={{
                border: `6px solid ${color}`,
            }}
        >
            <span style={{ color: `${color}` }}>{categoryName}</span>
            <span className="category-list-item-count">{count}</span>
        </Link>
    );
};

export default CategoryListItem;
