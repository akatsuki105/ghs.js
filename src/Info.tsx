import md5 from 'js-md5';
import sha1 from 'js-sha1';
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
  const md5Hash = md5.create().update(rom.data).hex();
  const sha1Hash = sha1.create().update(rom.data).hex();

  return (
    <Center className="max-w-screen-lg mx-auto">
      <div className="w-1/2">
        <p className="text-3xl">ROM Info</p>

        <Spacer />

        <div>
          <span className="text-sm">Filename:</span>
          <Input className="w-full" value={rom.name} />
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

        <Spacer size="sm" />

        <div>
          <span className="text-sm">MD5 Hash:</span>
          <Input value={md5Hash} />
        </div>

        <Spacer size="sm" />

        <div>
          <span className="text-sm">SHA1 Hash:</span>
          <Input value={sha1Hash} />
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
