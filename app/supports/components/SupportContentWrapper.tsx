import React from "react";

interface SupportContentWrapperProps {
    children: React.ReactNode;
}

const SupportContentWrapper: React.FC<SupportContentWrapperProps> = ({ children }) => {
    return (
        <div className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 rounded-lg ml-16 shadow-md mb-20">
            {children}
        </div>
    );
};

export default SupportContentWrapper;
