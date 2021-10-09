import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import './app.css';

export default class App extends Component {
    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false 
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomCharPannel = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        }) 
    }

    render() {

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
           <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button className="btn btn-primary"
                                        onClick={this.toggleRandomCharPannel}>
                                    Toggle random char pannel
                                </button>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </div>
           </Router>
        )
            
    };
}
