import React from "react";
import Layout from "../components/Layout";
import Helmet from "react-helmet";

const NotFoundPage = () => {
    return (
        <Layout>
            <Helmet title="未知星系" />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    height: "400px",
                    lineHeight: "400px",
                    width: "800px",
                    margin: "0 auto",
                    fontSize: "10rem",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    backgroundColor: "#000",
                }}
            >
                404
            </div>
        </Layout>
    );
};

export default NotFoundPage;
