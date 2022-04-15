import { useReactiveVar } from '@apollo/client';
import { Link } from 'react-router-dom';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo/vars';
import useUser from '../hooks/useUser';
import Avatar from './Avatar';

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid rgb(219, 219, 219);
  background-color: ${({ theme }) => theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: pink;
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${loggedInUser?.username}`}>
                  <Avatar url={loggedInUser?.avatar || ''} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link to="/">
              <Button>로그인</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

export default Header;
