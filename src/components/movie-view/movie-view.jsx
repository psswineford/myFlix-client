import React from 'react';
import Button from 'react-bootstrap/Button';
import "./movie-view.scss";
import axios from 'axios';

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

    addFavoriteMovie(_id) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post(`https://patricks-movie-api.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST'
        })
            .then(response => {
                alert(`Added to Favorites`)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view" >
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <Button variant='danger' className="fav-button" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>
                    Add to Favorites
                </Button>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>

            </div>
        );
    }
}