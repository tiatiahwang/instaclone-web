import styled from 'styled-components';
import { SeeFeedQuery } from '../../graphql/generated';
import Comment from './Comment';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-size: 10px;
  font-weight: 600;
`;

type ArrayElement<ArrayType extends readonly unknown[] | null | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface Props {
  photo: ArrayElement<SeeFeedQuery['seeFeed']>;
}

const Comments = ({ photo }: Props) => {
  return (
    <CommentsContainer>
      <Comment username={photo?.user?.username} payload={photo?.caption} />
      <CommentCount>
        {photo?.commentNumber === 0
          ? '0 comment'
          : photo?.commentNumber === 1
          ? '1 comment'
          : `${photo?.commentNumber} comments`}
      </CommentCount>
      {photo?.comments?.map((comment) => (
        <Comment
          key={comment?.id}
          username={comment?.user.username}
          payload={comment?.payload}
        />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
