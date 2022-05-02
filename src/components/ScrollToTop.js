import React, { useState, useEffect } from "react";
import { FaAngleUp } from "@react-icons/all-files/fa/FaAngleUp";

const isBrowser = typeof window !== "undefined";

const ScrollToTop = () => {
    const [showTopIcon, setShowTopIcon] = useState(false);

    const goTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        if (isBrowser) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 400) {
                    setShowTopIcon(true);
                } else {
                    setShowTopIcon(false);
                }
            });
        }
    }, []);

    return (
        <>
            {showTopIcon && (
                <div className="scroll-to-top" onClick={goTop}>
                    <FaAngleUp className="scroll-to-top-icon" />
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
