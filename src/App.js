import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavbarComponent from './components/layout/NavbarComponent';
import Homepage from './components/home/Homepage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import LikedMovies from './components/movies/LikedMovies';
import RateMovie from './components/ratings/RateMovie';
import CommentOnMovie from './components/comments/CommentOnMovie';
import RateCollection from './components/ratings/RateCollection';
import CommentOnCollection from './components/comments/CommentOnCollection';
import CollectionComments from './components/comments/CollectionComments';
import MovieComments from './components/comments/MovieComments';
import CollectionRatings from './components/ratings/CollectionRatings';
import MovieRatings from './components/ratings/MovieRatings';
import { Card, Container } from 'react-bootstrap';
import PersonalCollections from './components/collections/PersonalCollections';
import CreateCollection from './components/collections/CreateCollection';
import CollectionDetails from './components/collections/CollectionDetails';
import ResetPassword from './components/auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <Card>
          <Card.Body>
              <Route path='/collections' component={PersonalCollections} />
              <Route path='/createCollection' component={CreateCollection} />
              <Route path='/collectionDetails' component={CollectionDetails} />
              <Route path='/likedMovies' component={LikedMovies} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/passReset' component={ResetPassword} />
              <Route exact path='/' component={Homepage} />
          </Card.Body>
        </Card>
      </div>
    </BrowserRouter>
  );
}

export default App;
