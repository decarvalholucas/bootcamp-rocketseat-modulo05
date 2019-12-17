import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    inputBorderColor: '#EEE',
  };

  // Load data from localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Save data from localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;
    try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      const repoDuplicate = repositories.filter(
        repository => repository.name === response.data.full_name
      );

      if (repoDuplicate.length > 0) {
        throw new Error('Repositório duplicado');
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        inputBorderColor: '#eee',
      });
    } catch (error) {
      this.setState({
        repositories: [...repositories],
        newRepo: '',
        loading: false,
        inputBorderColor: '#FF0000',
      });
      console.error(error);
    }
  };

  handleInputChange = event => {
    this.setState({ newRepo: event.target.value });
  };

  render() {
    const { newRepo, repositories, loading, inputBorderColor } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} inputBorderColor={inputBorderColor}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
