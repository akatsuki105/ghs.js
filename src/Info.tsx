import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Spacer } from './components';
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

  return (
    <Center className="max-w-screen-lg">
      <div className="w-1/2">
        <p className="text-3xl">ROM Info</p>

        <Spacer />

        <div>
          <span className="text-sm">Filename:</span>
          <Input value={rom.name} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Size:</span>
          <Input value={`${rom.data.byteLength} Bytes`} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Game Title:</span>
          <Input value={title} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Game Code:</span>
          <Input value={gamecode} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Maker Code:</span>
          <Input value={maker} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">Software Version:</span>
          <Input value={`v1.${version.toString()}`} />
        </div>
      </div>
    </Center>
  );
});

const Input: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  return (
    <input
      type="text"
      name="filename"
      id="filename"
      className={`block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${className}`}
      value={value}
      disabled
    />
  );
};
