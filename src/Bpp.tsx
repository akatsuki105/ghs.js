import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TileViewer } from './components';
import { BinaryContext } from './contexts/Binary';
import { useWindowDimensions } from './hooks';
import { APP_NAME, convert4BppToRGB, palettes, RGB, rgb555, toHex } from './utils';

const ROM = 0x0800_0000 as const;

export const Bpp: React.FC = React.memo(() => {
  const rom = useContext(BinaryContext);
  const navigate = useNavigate();

  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, _] = useState<number>(16);
  const { height } = useWindowDimensions();
  const [addr, setAddr] = useState<number>(0);
  const [jumpTo, setJumpTo] = useState<number>(-1);

  const scale = 4;
  const canvasHeight = ((height * 9) / 10) & ~(8 * scale - 1);

  const onScroll = (col: number, row: number) => {
    const ofs = (row * width + col) * 32;
    setAddr(ofs);
  };

  useEffect(() => {
    if (!!rom.data) {
      const romRgb = convert4BppToRGB(rom.data, rgb555(palettes[0]));
      setRgb(romRgb);
    } else {
      navigate(`/${APP_NAME}/top`);
    }
  }, [rom.data]); // eslint-disable-line

  return (
    <Center>
      <Flex w="100%">
        <Box w="50%">
          {rgb.length > 0 ? (
            <Flex alignItems="center">
              <Spacer />
              <TileViewer
                w={width * 8}
                h={canvasHeight}
                rgb={rgb}
                scale={scale}
                onScroll={onScroll}
                jumpTo={jumpTo}
                grid
              />
              <Spacer />
            </Flex>
          ) : (
            <Box height={canvasHeight} />
          )}
        </Box>

        <Divider orientation="vertical" />

        <Box>
          <Box>{`Address: 0x${toHex(ROM + addr, 8)}`}</Box>
          <Spacer h="4" />
          <Slider aria-label="slider-ex-2" defaultValue={16} onChange={(val) => console.log(val)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
          </Slider>

          <Spacer h="8" />
          <Button
            onClick={() => {
              const newAddr = addr - width * 32;
              if (newAddr >= 0) {
                setJumpTo(ROM + newAddr);
                setAddr(newAddr);
              }
            }}
          >
            ↑
          </Button>
          <Spacer h="4" />
          <Button
            onClick={() => {
              const newAddr = addr + width * 32;
              if (newAddr < rgb.length) {
                setJumpTo(ROM + newAddr);
                setAddr(newAddr);
              }
            }}
          >
            ↓
          </Button>

          <Spacer h="6" />

          <Box>
            <Text>Jump to address</Text>
            <JumpTo
              jumpTo={(addr) => {
                setJumpTo(addr);
                setAddr(addr - ROM);
              }}
            />
          </Box>
        </Box>
        <Spacer />
      </Flex>
    </Center>
  );
});

const JumpTo: React.FC<{ jumpTo: (addr: number) => void }> = React.memo(({ jumpTo }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    if (!ref.current) return;

    let value = ref.current.value;
    if (!value.startsWith('0x')) {
      value = '0x' + value;
    }

    const addr = Number(value);
    if (!(Number.isNaN(addr) || addr < ROM)) {
      jumpTo(addr);
    }
    ref.current.value = '';
  };

  return (
    <Box mt="1">
      <Input name="jump" id="jump" placeholder="0x08000000" ref={ref} onKeyDown={onKeyDown} />
    </Box>
  );
});
