import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import starwarsImage from '../images/starwarsjpg.jpeg';
import duneImage from '../images/dune.jpeg';
import matrixImage from '../images/matrix.jpg';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Star Wars', Description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empires world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', ImagePath: starwarsImage},
            { _id: 2, Title: 'Dune (2021)', Description: 'Feature adaptation of Frank Herberts science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy', ImagePath: duneImage},
            { _id: 3, Title: 'Matrix', Description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.', ImagePath: matrixImage}
          ],
          selectedMovie: null
        };
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
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
   