import React from 'react'
import axios from 'axios'
import { Button, Card, Col, Form, Row, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
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
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavMovies(_id) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(
        `https://patricks-movie-api.herokuapp.com/users/${username}/movies/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e) {    
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    console.log({username});
    console.log(token);

    axios.put(`https://patricks-movie-api.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        //Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
    .then((response) => {
      
      this.setState({
        Username: response.data.Username,
        //Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
      });

      localStorage.setItem("user", this.state.Username);
      const data = response.data;
      console.log(data);
      console.log(this.state.Username)
      //window.open(`/users/${username}`, "_self");
      alert("Saved Changes");

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  changeInput(name, input) {
    this.setState({[name]: input})
  }

  render() {
    const { favoriteMovies, validated } = this.state
    const { Username, Email, Birthday } = this.state;
    const { movies, movie_id } = this.props;
    //console.log({Username});
    //console.log({favoriteMovies});

    return (
      <Container>

        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Title>Profile Info</Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroupItem>Username: {Username} </ListGroupItem>
                <ListGroupItem>Email: {Email} </ListGroupItem>
                <ListGroupItem>Birthdate: {Birthday} </ListGroupItem>

              </ListGroup>
            </Card>
          </Col>

          <Col xs={12} sm={8}>
            <Card>
              <Card.Title>Update Your Profile</Card.Title>
              <Form className="update-form" onSubmit={(e) =>
                                this.handleUpdate(e)
                              }>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" onChange={(e) =>
                                    this.changeInput('Username', e.target.value)
                                  } placeholder="Change your username" value={this.state.Username}/>
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" onChange={(e) =>
                                    this.changeInput('Email', e.target.value)
                                  } placeholder="Change your email" value={this.state.Email}/>
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date" onChange={(e) =>
                                    this.changeInput('Birthday', e.target.value)
                                  } placeholder="Birthday" value={this.state.Birthday}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Update
                </Button>
                  
              </Form>

            </Card>

          </Col>

        </Row>

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

                              <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movies.title} onClick={() => this.removeFavMovies(movie._id)}>
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
      </Container>
    )
  }
}

export default ProfileView
