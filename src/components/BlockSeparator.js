import React from 'react';

const BlockSeparator = (props) => {
    return (
        <div
            className='border-top border-3 border-primary'
            style={{
                position: "relative",
                marginTop: "4rem",
                marginBottom: "25px",
            }}>
            <h4
                className="px-1 bg-white"
                style={{
                    position: "absolute",
                    top: "-17px",
                    left: "0%"
                }}>{props.heading}</h4>
        </div>
    );
};

export default BlockSeparator;