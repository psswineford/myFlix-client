import React from 'react';
import axios from 'axios';
import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// import starwarsImage from '../images/starwarsjpg.jpeg';
// import duneImage from '../images/dune.jpeg';
// import matrixImage from '../images/matrix.jpg';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          register: null
        };
      }

      componentDidMount() {
        axios.get('https://patricks-movie-api.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      onRegister(register) {
        this.setState({
          register
        });
      }

      onLoggedIn(user) {
        this.setState({
          user
        });
      }

      render() {
        const { movies, selectedMovie, user, register} = this.state;

        if (!register) return <RegisterView onRegister={register => this.onRegister(register)}/>;
        
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
        if (movies.length === 0) return <div className="main-view" />;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    
    
    }
   