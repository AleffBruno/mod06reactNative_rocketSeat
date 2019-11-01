import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { 
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author
} from './styles';

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    };

    state = {
        stars: [],
        loading: false,
        page: 1,
    };

    async componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const { navigation } = this.props;
        const user = navigation.getParam('user');

        this.setState({ loading: true });
        const response = await api.get(`/users/${user.login}/starred?page=${page}`);

        this.setState({
            stars : [...this.state.stars, ...response.data],
            loading: false,
            page
        })
    }

    loadMore = async () => {
        const { page } = this.state;

        const pageNumber = page+1;

        this.loadProducts(pageNumber)

        // console.log("CARREGA MAIS");
    }

    render() {
        const { navigation } = this.props;
        const { stars, loading } = this.state;
        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name> {user.name} </Name>
                    <Bio> {user.bio} </Bio>
                </Header>
                
                { loading ? (
                    <ActivityIndicator color="#red"/>
                ) : (
                    <Stars
                        onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
                        onEndReached={this.loadMore} // Função que carrega mais itens
                        data={stars}
                        keyExtractor={star => String(star.id)}
                        renderItem={({ item }) => (
                            <Starred>
                                <OwnerAvatar source={{uri: item.owner.avatar_url}}/>
                                <Info>
                                    <Title>{item.name}</Title>
                                    <Author>{item.owner.login}</Author>
                                </Info>
                            </Starred>
                        )}
                    />
                )}
                
                
            </Container>
        )
    }
}