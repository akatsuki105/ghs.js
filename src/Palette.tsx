import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Spacer, Palette, Button } from './components';
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
    <Center className="max-w-screen-lg mx-auto">
      <div className="w-1/2">
        <p className="text-3xl">Palette Viewer</p>

        <Spacer />

        <div>
          <span className="text-sm">Address:</span>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            placeholder="0x08000000"
            value={addr}
            onChange={(e) => {
              setAddr(e.currentTarget.value);
            }}
          />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Palette Length:</span>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            value={length}
            onChange={(e) => {
              setLen(e.currentTarget.value);
            }}
          />
        </div>

        <Spacer size="md" />

        <Button onClick={viewPalette}>View</Button>

        <Spacer size="md" />

        {pal && <Palette id="pal-viewer" colors={pal} width={16} />}
      </div>
    </Center>
  );
});

const rgb888 = (rgb555: number): number => {
  const [r, g, b] = rgb555To888(rgb555);

  return (r << 16) | (g << 8) | b;
};
