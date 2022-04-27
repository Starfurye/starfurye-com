import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/palenight";
import Prism from "prism-react-renderer/prism";

// export const CodeBlock = ({ children }) => {
//     const codeClassName = children.props.className || "";
//     const language = codeClassName.replace(/language-/, "") || "";

//     return (
//         <Highlight
//             {...defaultProps}
//             code={children.props.children}
//             language={language}
//         >
//             {({ className, style, tokens, getLineProps, getTokenProps }) => (
//                 <pre
//                     className={className}
//                     style={{ ...style, padding: "20px" }}
//                 >
//                     {tokens.map((line, i) => (
//                         <div key={i} {...getLineProps({ line, key: i })}>
//                             {line.map((token, key) => (
//                                 <span
//                                     key={key}
//                                     {...getTokenProps({ token, key })}
//                                 />
//                             ))}
//                         </div>
//                     ))}
//                 </pre>
//             )}
//         </Highlight>
//     );
// };
export default (props) => {
    const className = props.children.props.className || "";
    const matches = className.match(/language-(?<lang>.*)/);
    return (
        <Highlight
            {...defaultProps}
            code={props.children.props.children.trim()}
            language={
                matches && matches.groups && matches.groups.lang
                    ? matches.groups.lang
                    : ""
            }
            theme={theme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{ ...style, padding: "20px" }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
