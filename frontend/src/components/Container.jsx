import React from 'react';

const Container = ({ children }) => {
    return (
        <div className=" max-w-[2520px]">
            {children}
        </div>
    );
};

export default Container;