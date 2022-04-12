import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BaseBox } from '../shared';

const SBottomBox = styled(BaseBox)`
  padding: 20px 0;
  text-align: center;
  a {
    color: #0095f6;
    font-weight: 600;
    margin-left: 5px;
  }
`;

interface Props {
  text: string;
  link: string;
  linkText: string;
}

const BottomBox = ({ text, link, linkText }: Props) => {
  return (
    <SBottomBox>
      <span>{text}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
