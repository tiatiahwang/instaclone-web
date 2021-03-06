import styled from 'styled-components';

interface IButton {
  disabled?: boolean;
}

const Button = styled.input<IButton>`
  width: 100%;
  margin-top: 12px;
  padding: 8px 0;
  background-color: #0095f6;
  color: #fff;
  border: none;
  border-radius: 3px;
  text-align: center;
  font-weight: 600;
  opacity: ${(props) => (props.disabled ? '0.2' : '1')};
`;

export default Button;
