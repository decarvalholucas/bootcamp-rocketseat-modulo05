import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import api from '../../services/api';

import { Loading, Owner, IssueList, Filters, Pagination } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { filter, page } = this.state;
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filter, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });
    this.setState({ issues: response.data });
  };

  updateRepoState = async filter => {
    this.setState({
      filter,
    });
    this.loadIssues();
  };

  pagination = async page => {
    this.setState({
      page,
    });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, filter, page } = this.state;

    if (loading) {
      return (
        <Container>
          <Loading>Carregando...</Loading>
        </Container>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowAltCircleLeft /> Voltar aos repositórios
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <Filters>
            <select
              value={filter}
              onChange={event => this.updateRepoState(event.target.value)}
            >
              <option value="all">Todos</option>
              <option value="open">Abertos</option>
              <option value="closed">Fechados</option>
            </select>
            <Pagination>
              <button type="button" disabled={page <= 1}>
                Anterior
              </button>
              <button type="button">Proximo</button>
            </Pagination>
          </Filters>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="__blank">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span
                      style={{ backgroundColor: `#${label.color}` }}
                      key={String(label.id)}
                    >
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
