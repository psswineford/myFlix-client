import React from "react";
import Button from  'react-bootstrap/Button';
import propTypes from 'prop-types';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <div className="director-view">
                
                <div className = "director-name">
                    <span className="value">{director.Name}</span>
                </div>
                <div className = "director-bio">
                    <span className="value">{director.Bio}</span>
                </div>
                <div className = "director-Birthdate">
                    <span className="value">{director.Birth}</span>
                </div>
               
                <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birthdate: propTypes.instanceOf(Date),
    }).isRequired
  };