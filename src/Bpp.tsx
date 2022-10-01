import React, { useState } from 'react';
import {
  Separator,
  Spacer,
  ROMUpload,
  Box,
  Rom,
  FlexBox,
  TileViewer,
  Slider,
  Button,
} from './components';
import { useWindowDimensions } from './hooks';
import { convert4BppToRGB, palettes, RGB, rgb555, toHex } from './utils';

// const ROM = 0x0800_0000 as const;

export const Bpp: React.VFC = React.memo(() => {
  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, setWidth] = useState<number>(16);
  const { height } = useWindowDimensions();
  const [addr, setAddr] = useState<number>(0x0800_0000);
  const [jumpTo, setJumpTo] = useState<number>(-1);

  const scale = 4;
  const canvasHeight = ((height * 9) / 10) & ~(8 * scale - 1);

  const setAddress = (col: number, row: number) => {
    const ofs = (row * width + col) * 32;
    const addr = 0x0800_0000 + ofs;
    setAddr(addr);
  };

  return (
    <FlexBox className="w-full">
      <div className="w-1/2">
        {rgb.length > 0 ? (
          <div className="flex justify-center">
            <TileViewer
              w={width * 8}
              h={canvasHeight}
              rgb={rgb}
              scale={scale}
              onScroll={setAddress}
              jumpTo={jumpTo}
              grid
            />
          </div>
        ) : (
          <Box height={canvasHeight} />
        )}
      </div>

      <Spacer size="sm" />
      <Separator axis="vertical" stretch />
      <Spacer size="sm" />

      <div className="w-1/8">
        {!rgb.length && (
          <>
            <Spacer size="sm" />
            <ROMUpload
              load={(r: Rom) => {
                const romRgb = convert4BppToRGB(r.data, rgb555(palettes[0]));
                setRgb(romRgb);
              }}
            />
          </>
        )}

        {!!rgb.length && (
          <>
            <div>{`Address: 0x${toHex(addr, 8)}`}</div>
            <Spacer size="sm" />
            <Slider label="Width" max={32} min={16} onChange={setWidth} />

            <Spacer size="lg" />
            <Button
              onClick={() => {
                const newAddr = addr - width * 32;
                if (newAddr >= 0) {
                  setJumpTo(newAddr);
                  setAddr(newAddr);
                }
              }}
            >
              ↑
            </Button>
            <Spacer size="sm" />
            <Button
              onClick={() => {
                const newAddr = addr + width * 32;
                if (newAddr < 0x0800_0000 + rgb.length) {
                  setJumpTo(newAddr);
                  setAddr(newAddr);
                }
              }}
            >
              ↓
            </Button>
          </>
        )}
      </div>
      <div className="w-3/8"></div>
    </FlexBox>
  );
});
