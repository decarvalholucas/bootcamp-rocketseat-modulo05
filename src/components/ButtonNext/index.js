import styled from 'styled-components';

const ButtonNext = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.page === 1,
}))``;

export default ButtonNext;
