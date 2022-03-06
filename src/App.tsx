import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Page, Separator, Spacer, ROMUpload, Tile, Slider } from 'components';
import { ModalsProvider } from 'contexts';
import init, { convert_4bpp_to_rgb } from 'pkg/wasm';
import theme from 'theme';
import { decompressLZ77, defaultPalette, lookupLZ77 } from 'utils';
import 'tailwind.css';

const App = (): JSX.Element => {
  const [rgb, setRgb] = useState<Uint8Array>(new Uint8Array(0));
  const [rows, setRows] = useState<number[][]>([]);
  const [rom, setRom] = useState<Uint8Array>(new Uint8Array(0));
  const [initialized, setInitialized] = useState<boolean>(false);
  const [width, setW] = useState<number>(0);

  useEffect(() => {
    (async () => {
      await init();
      setInitialized(true);
    })();
  }, []);

  return (
    <Providers>
      <div className="App">
        <Page>
          <h1>GBA Compress Suite</h1>

          <Spacer size="sm" />
          <Separator />
          <Spacer size="sm" />

          {rgb.byteLength > 0 && <Tile id="canvas" w={width * 8} rgb={rgb} />}

          <Slider label="Width" max={64} min={2} onChange={setW} />

          {rows.length === 0 && (
            <ROMUpload
              load={(b) => {
                setRom(b);
                setRows(lookupLZ77(b));
              }}
            />
          )}

          <StyledDiv className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Compressed size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Decompressed size
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => {
                        return (
                          <tr
                            className={(i & 1) === 1 ? 'bg-gray-100' : 'bg-white'}
                            key={r[0].toString()}
                            onClick={() => {
                              if (!initialized) return;
                              const [decompressed] = decompressLZ77(rom, r[0]);
                              const buf = convert_4bpp_to_rgb(decompressed, defaultPalette);
                              setRgb(buf);
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              0x{(r[0] + 0x08000000).toString(16)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {r[1]} Bytes
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {r[2]} Bytes
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </StyledDiv>
        </Page>
      </div>
    </Providers>
  );
};

const StyledDiv = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

const Providers: React.FC = React.memo(({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalsProvider>{children}</ModalsProvider>
    </ThemeProvider>
  );
});

export default App;
