import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface Props {
  username: string | undefined;
  payload: string | null | undefined;
}

const Comment = ({ username, payload }: Props) => {
  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
