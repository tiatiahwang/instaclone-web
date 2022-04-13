import styled from 'styled-components';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';
import { useSeeFeedQuery } from '../graphql/generated';

const PhotoContainer = styled.div`
  max-width: 615px;
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.div`
  img {
    width: 100%;
  }
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Home = () => {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();
  return (
    <>
      {seeFeed?.map((photo) => (
        <PhotoContainer key={photo?.id}>
          <PhotoHeader>
            <Avatar size="lg" url={photo?.user?.avatar} />
            <Username>{photo?.user?.username}</Username>
          </PhotoHeader>
          <PhotoFile>
            <img src={photo?.file} alt="" />
          </PhotoFile>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size="2x" icon={faHeart} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="2x" icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon size="2x" icon={faPaperPlane} />
                </PhotoAction>
              </div>
            </PhotoActions>
            <Likes>
              {photo?.likes === 0
                ? '0 like'
                : photo?.likes === 1
                ? '1 like'
                : `${photo?.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </>
  );
};

export default Home;
