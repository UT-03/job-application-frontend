import React from 'react';
import Card from 'react-bootstrap/Card';

const ProfileData = (props) => {
    return (
        <React.Fragment>
            {props.data.map(dt => {
                return (
                    <div key={dt.label}>
                        <h5>{dt.label}</h5>
                        <h6 className="mb-4 text-muted d-flex">
                            {dt.value ? dt.value : <span><em>Not Provided</em></span>}
                        </h6>
                    </div>
                )
            })}
        </React.Fragment>
    );
};

export default ProfileData;