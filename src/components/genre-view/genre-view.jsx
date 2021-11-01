import React from "react";
import Button from  'react-bootstrap/Button';
import propTypes from 'prop-types';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="genre-view">
                
                <div className = "genre-name">
                    <span className="value">{genre.Name}</span>
                </div>
                <div className = "genre-description">
                    <span className="value">{genre.Description}</span>
                </div>
                               
                <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}

GenreView.propTypes = {
    genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }).isRequired
  };