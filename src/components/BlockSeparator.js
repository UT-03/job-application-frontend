import React from 'react';

const BlockSeparator = (props) => {
    return (
        <div
            className='border-top border-3 border-primary'
            style={{
                position: "relative",
                height: "4rem",
                marginTop: "4rem"
            }}>
            <h6
                className="px-1 display-6 bg-white"
                style={{
                    position: "absolute",
                    top: "-50%",
                    left: "0%"
                }}>{props.heading}</h6>
        </div>
    );
};

export default BlockSeparator;