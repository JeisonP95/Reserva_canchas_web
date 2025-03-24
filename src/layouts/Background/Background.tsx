import React from "react";
import "./Background.css";

interface BackgroundProps {
    children: React.ReactNode;
    backgroundImage: string;
}

const Background: React.FC<BackgroundProps> = ({ children, backgroundImage }) => {
    return (
        <div
            className="background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="background-overlay"></div>
            <div className="background-content">
                {children}
            </div>
        </div>
    );
};

export default Background;