import { Box, Center, Heading, Input, Spacer, Text } from '@chakra-ui/react';
import md5 from 'js-md5';
import sha1 from 'js-sha1';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BinaryContext } from './contexts/Binary';
import { APP_NAME } from './utils';

export const Info: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!rom.data) {
      navigate(`/${APP_NAME}/top`);
    }
  }, [rom.data]); // eslint-disable-line

  if (!rom.data || !rom.name) {
    return <></>;
  }

  const title = new TextDecoder().decode(rom.data?.slice(0xa0, 0xa0 + 12));
  const gamecode = new TextDecoder().decode(rom.data?.slice(0xac, 0xac + 4));
  const maker = new TextDecoder().decode(rom.data?.slice(0xb0, 0xb0 + 2));
  const version = rom.data?.at(0xbc) || 0x00;
  const md5Hash = md5.create().update(rom.data).hex();
  const sha1Hash = sha1.create().update(rom.data).hex();

  return (
    <Center>
      <Box w="50%">
        <Heading size="lg">ROM Info</Heading>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Filename:</Text>
          <Input value={rom.name} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Size:</Text>
          <Input value={`${rom.data.byteLength} Bytes`} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Game Title:</Text>
          <Input value={title} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Game Code:</Text>
          <Input value={gamecode} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Maker Code:</Text>
          <Input value={maker} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">Software Version:</Text>
          <Input value={`v1.${version.toString()}`} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">MD5 Hash:</Text>
          <Input value={md5Hash} isReadOnly />
        </Box>

        <Spacer h="4" />

        <Box>
          <Text fontSize="sm">SHA1 Hash:</Text>
          <Input value={sha1Hash} isReadOnly />
        </Box>
      </Box>
    </Center>
  );
});
