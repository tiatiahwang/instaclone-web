import styled from 'styled-components';
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import { SeeFeedQuery, useToggleLikeMutation } from '../../graphql/generated';

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

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface Props {
  photo: ArrayElement<SeeFeedQuery['seeFeed']>;
}

const Photo = ({ photo }: Props) => {
  const [toggleLikeMutation] = useToggleLikeMutation({
    variables: { id: photo?.id! },
    update: (cache, { data }) => {
      if (!data?.toggleLike.ok) return;
      const id = `Photo:${photo?.id!}`;
      cache.modify({
        id,
        fields: {
          isLiked: (prev) => !prev,
          likes: (prev) => (photo && !photo.isLiked ? prev + 1 : prev - 1),
        },
      });
    },
  });
  return (
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
            <PhotoAction
              onClick={() =>
                toggleLikeMutation({ variables: { id: photo!.id } })
              }
            >
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
  );
};

export default Photo;
