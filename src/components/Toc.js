import React from "react";
import Scrollspy from "react-scrollspy";

const Toc = ({ headers }) => {
    let url = headers.items.map((p) => p["url"].substring(1));

    return (
        <nav className="toc-side">
            <Scrollspy
                items={url}
                currentClassName="is-current"
                className="toc-list"
            >
                {headers.items.map((p, index) => (
                    <li key={p.url}>
                        <a href={p.url}>{`${index} | ${p.title}`}</a>
                    </li>
                ))}
            </Scrollspy>
        </nav>
    );
};

export default Toc;
