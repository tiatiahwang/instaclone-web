import styled from 'styled-components';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';
import { useSeeFeedQuery } from '../graphql/generated';
import PageTitle from '../components/PageTitle';

const PhotoContainer = styled.div`
  max-width: 615px;
  margin-bottom: 60px;
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 4px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
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
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PhotoAction = styled.button`
  all: unset;
  cursor: pointer;
  margin-right: 10px;
  svg {
    font-size: 20px;
  }
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Home = () => {
  const { data: { seeFeed } = {} } = useSeeFeedQuery();
  return (
    <>
      <PageTitle title="홈" />
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
                  <FontAwesomeIcon
                    style={{ color: photo?.isLiked ? 'tomato' : 'inherit' }}
                    icon={photo?.isLiked ? SolidHeart : faHeart}
                  />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faComment} />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </PhotoAction>
              </div>
              <PhotoAction>
                <FontAwesomeIcon icon={faBookmark} />
              </PhotoAction>
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
