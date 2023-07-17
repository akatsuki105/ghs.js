import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette } from './components';
import { BinaryContext } from './contexts/Binary';
import { APP_NAME, loadU16, rgb555To888 } from './utils';

export const PaletteViewer: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  const [addr, setAddr] = useState<string>('');
  const [length, setLen] = useState<string>('');
  const [pal, setPal] = useState<number[] | null>(null);

  const viewPalette = () => {
    const start = Number(addr);
    const len = Number(length);
    if (Number.isNaN(len) || Number.isNaN(start)) {
      setPal([]);

      return;
    }

    const newPal = [];
    for (let i = 0; i < len; i++) {
      const val = loadU16(rom.data!, start + i * 2);
      newPal.push(rgb888(val));
    }
    setPal(newPal);
  };

  useEffect(() => {
    if (!rom.data) {
      navigate(`/${APP_NAME}/top`);
    }
  }, [rom.data]); // eslint-disable-line

  if (!rom.data || !rom.name) {
    return <></>;
  }

  return (
    <Center>
      <Box w="50%">
        <Heading size="lg">Palette Viewer</Heading>

        <Spacer h="6" />

        <FormControl>
          <FormLabel>Address:</FormLabel>
          <Input
            placeholder="0x08000000"
            value={addr}
            onChange={(e) => {
              setAddr(e.currentTarget.value);
            }}
          />
        </FormControl>

        <Spacer h="4" />

        <FormControl>
          <FormLabel>Palette Length:</FormLabel>
          <Input
            value={length}
            onChange={(e) => {
              setLen(e.currentTarget.value);
            }}
          />
        </FormControl>

        <Spacer h="4" />

        <Button onClick={viewPalette}>View</Button>

        <Spacer h="4" />

        {pal && <Palette id="pal-viewer" colors={pal} width={16} />}
      </Box>
    </Center>
  );
});

const rgb888 = (rgb555: number): number => {
  const [r, g, b] = rgb555To888(rgb555);

  return (r << 16) | (g << 8) | b;
};
