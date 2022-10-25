import React, { useRef, useState } from 'react';
import { Separator, Spacer, ROMUpload, Box, Rom, TileViewer, Slider, Button } from './components';
import { useWindowDimensions } from './hooks';
import { convert4BppToRGB, palettes, RGB, rgb555, toHex } from './utils';

const ROM = 0x0800_0000 as const;

export const Bpp: React.VFC = React.memo(() => {
  const [rgb, setRgb] = useState<RGB[]>([]);
  const [width, setWidth] = useState<number>(16);
  const { height } = useWindowDimensions();
  const [addr, setAddr] = useState<number>(0);
  const [jumpTo, setJumpTo] = useState<number>(-1);

  const scale = 4;
  const canvasHeight = ((height * 9) / 10) & ~(8 * scale - 1);

  const onScroll = (col: number, row: number) => {
    const ofs = (row * width + col) * 32;
    setAddr(ofs);
  };

  return (
    <div className="flex w-full">
      <div className="w-1/2">
        {rgb.length > 0 ? (
          <div className="flex justify-center">
            <TileViewer
              w={width * 8}
              h={canvasHeight}
              rgb={rgb}
              scale={scale}
              onScroll={onScroll}
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
            <div>{`Address: 0x${toHex(ROM + addr, 8)}`}</div>
            <Spacer size="sm" />
            <Slider label="Width" max={32} min={16} onChange={setWidth} />

            <Spacer size="lg" />
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
            <Spacer size="sm" />
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

            <Spacer size="md" />

            <div>
              <label htmlFor="jump" className="block text-sm font-medium text-gray-700">
                Jump to address
              </label>
              <JumpTo
                jumpTo={(addr) => {
                  setJumpTo(addr);
                  setAddr(addr - ROM);
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="w-3/8"></div>
    </div>
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
    <div className="mt-1">
      <input
        type="text"
        name="jump"
        id="jump"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="0x08000000"
        ref={ref}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});
