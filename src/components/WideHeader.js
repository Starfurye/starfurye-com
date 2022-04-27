import React from "react";

const WideHeader = ({ title, subtitle, backImgUrl }) => {
    return (
        <div
            className="wide-header"
            style={{
                width: "100%",
                marginBottom: "2rem",
                background: `url(${backImgUrl}) no-repeat`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default WideHeader;
