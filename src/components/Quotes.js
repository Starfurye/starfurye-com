import React from "react";

export const Quotes = ({ quoteType, title, message }) => {
    // Must 必须, Suggestion 建议, Danger 禁止, Warning 警告, Note 提示, Quote 引用或背景
    let styleName = "quote-",
        borderStyleName = "quote-title-";
    let QuestionMark;
    switch (quoteType) {
        case "Must":
            styleName = styleName + "must";
            QuestionMark = <span>&#10004;</span>;
            borderStyleName = borderStyleName + "must";
            break;
        case "Suggestion":
            styleName = styleName + "suggestion";
            QuestionMark = <span>&#128077;</span>;
            borderStyleName = borderStyleName + "suggestion";
            break;
        case "Danger":
            styleName = styleName + "danger";
            QuestionMark = <span>&#9888;</span>;
            borderStyleName = borderStyleName + "danger";
            break;
        case "Warning":
            styleName = styleName + "warning";
            QuestionMark = <span>&#9432;</span>;
            borderStyleName = borderStyleName + "warning";
            break;
        case "Note":
            styleName = styleName + "note";
            QuestionMark = <span>&#128214;</span>;
            borderStyleName = borderStyleName + "note";
            break;
        case "Quote":
            styleName = styleName + "quote";
            QuestionMark = <span>&#128172;</span>;
            borderStyleName = borderStyleName + "quote";
            break;
    }
    return (
        <div className={`quote-block ${styleName}`}>
            {QuestionMark}
            <p className={`quote-block-title ${borderStyleName}`}>{title}</p>
            <p className="quote-block-message">{message}</p>
        </div>
    );
};
