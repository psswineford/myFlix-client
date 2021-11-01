import React from 'react'
import axios from 'axios'
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      favoriteMovies: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios.get(`https://patricks-movie-api.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          //Password: response.data.Password,
          //Email: response.data.Email,
          //Birthdate: response.data.Birthdate,
          favoriteMovies: response.data.FavoriteMovies,
          
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

render () {
    const { favoriteMovies } = this.state
    const {Username} = this.state;
    const { movies } = this.props;
    console.log({Username});
    console.log({favoriteMovies});

    return (

      //show favorite Movies
      <Card>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card.Body>
            {favoriteMovies.length === 0 && (
              <div className="text-center">
                You have no favorite movies.
              </div>
            )}
            <Row className="favorites-movies ">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      
                        <Card
                          className="favorites-item card-content"
                          style={{ width: "16rem" }}
                          key={movie._id}
                        >
                          <Card.Img
                            style={{ width: "18rem" }}
                            className="movieCard"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body>
                            <Card.Title className="movie-card-title">
                              {movie.Title}
                            </Card.Title>
                            <Button
                              size="sm"
                              className="profile-button remove-favorite"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) =>
                                this.removeFavMovies(e, movie)
                              }
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      
                    );
                  }
                })}
            </Row>
          </Card.Body>

          <Button
            variant="secondary"
            onClick={() => handleDeleteUser(e, user)}
          >
            Delete Account
          </Button>
        </Col>
      </Row>
    </Card>
    )
}
}

export default ProfileView
