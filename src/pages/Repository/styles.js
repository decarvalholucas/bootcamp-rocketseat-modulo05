import styled from 'styled-components';

export const Loading = styled.div`
  color: #7159c1;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;
  select {
    background: none;
    border: 1px solid #eee;
    padding: 10px;
    width: 100%;
    max-width: 200px;
  }
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          color: #333;
          &:hover {
            color: #7159c1;
          }
        }
        span {
          color: #333;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          line-height: 15px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 130px;
    cursor: pointer;
    background: none;
    margin: 0 0 0 10px;
    padding: 10px;
    border: 1px solid #eee;
    &:disabled {
      cursor: inherit;
      opacity: 0.6;
    }
  }
  span {
    border: 1px solid #eee;
    /* padding: 10px; */
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
