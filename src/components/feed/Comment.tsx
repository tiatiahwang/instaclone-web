import React from 'react';
import styled from 'styled-components';
// import sanitizeHtml from 'sanitize-html';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import { useDeleteCommentMutation } from '../../graphql/generated';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: #0095f6;
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
`;

interface Props {
  photoId?: number | undefined;
  commentId?: number;
  username: string | undefined;
  payload: string | null | undefined;
  isMine?: boolean | undefined;
}

const Comment = ({ photoId, commentId, username, payload, isMine }: Props) => {
  //   const cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, '<mark>$&</mark>')!,
  //     { allowedTags: ['mark'] },
  //   );
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    update: (cache, { data }) => {
      if (!isMine || !data?.deleteComment?.ok) return;
      cache.modify({
        id: `Photo:${photoId}`,
        fields: { commentNumber: (prev) => prev - 1 },
      });
      cache.evict({ id: `Comment:${commentId}` });
    },
  });
  const onDelete = () => {
    if (loading) return;
    deleteComment({ variables: { id: commentId! } });
  };
  return (
    <CommentContainer>
      <Link to={`/users/${username}`}>
        <FatText>{username}</FatText>
      </Link>
      {/* <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      /> */}
      <CommentCaption>
        {payload?.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          ),
        )}
      </CommentCaption>
      {isMine && <button onClick={onDelete}>❌</button>}
    </CommentContainer>
  );
};

export default Comment;
