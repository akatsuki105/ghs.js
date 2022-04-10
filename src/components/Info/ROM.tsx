import React from 'react';
import styled from 'styled-components';
import { Rom } from '../ROMUpload';

type Props = {
  rom: Rom;
};

export const ROMInfo: React.VFC<Props> = React.memo(({ rom }) => {
  return (
    <Container>
      <div className="text-lg font-medium">ROM Info</div>
      <StyledDiv>Title: {rom.title}</StyledDiv>
    </Container>
  );
});

const Container = styled.div`
  width: 200px;
`;

const StyledDiv = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
