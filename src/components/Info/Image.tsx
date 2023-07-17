import { Box, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export type ImageInfoProps = {
  addr: number;
  compressedSize: number;
  decompressedSize: number;
};

export const ImageInfo: React.VFC<ImageInfoProps> = React.memo(
  ({ addr, compressedSize, decompressedSize }) => {
    return (
      <Box w="240px">
        <Text fontSize="md" fontWeight="medium">
          Image Info
        </Text>
        <StyledDiv>Addr: 0x{(addr + 0x08000000).toString(16)}</StyledDiv>
        <StyledDiv>Compressed Size: {compressedSize.toString(10)}</StyledDiv>
        <StyledDiv>Decompressed Size: {decompressedSize.toString(10)}</StyledDiv>
      </Box>
    );
  },
);

const StyledDiv: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Box overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
      {children}
    </Box>
  );
};
