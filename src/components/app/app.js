import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';
import GotService from '../../services/gotService';


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
            <> 
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
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        )
            
    };
}
