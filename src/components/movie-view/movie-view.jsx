import React from 'react';
import Button from 'react-bootstrap/Button';
import "./movie-view.scss";

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
        
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view" >
                <div className="movie-poster">
                    <img src={movie.ImagePath} width="200" height="300"/>                    
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}