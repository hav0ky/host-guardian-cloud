import React from "react";

interface SupportContentWrapperProps {
    children: React.ReactNode;
}

const SupportContentWrapper: React.FC<SupportContentWrapperProps> = ({ children }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-md">
            {children}
        </div>
    );
};

export default SupportContentWrapper;
