import { Text } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

export type ImageInfoProps = {
  addr: number;
  compressedSize: number;
  decompressedSize: number;
};

export const ImageInfo: React.VFC<ImageInfoProps> = React.memo(
  ({ addr, compressedSize, decompressedSize }) => {
    return (
      <Container>
        <Text fontSize="md" fontWeight="medium">
          Image Info
        </Text>
        <StyledDiv>Addr: 0x{(addr + 0x08000000).toString(16)}</StyledDiv>
        <StyledDiv>Compressed Size: {compressedSize.toString(10)}</StyledDiv>
        <StyledDiv>Decompressed Size: {decompressedSize.toString(10)}</StyledDiv>
      </Container>
    );
  },
);

const Container = styled.div`
  width: 240px;
`;

const StyledDiv = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
