import React, { useRef } from 'react';

let title = '';

export const defaultRom = {
  title: '',
  data: new Uint8Array(0),
};

type Props = {
  load: (title: string, data: Uint8Array) => void;
};

export const Uploader: React.FC<Props> = React.memo(({ load }) => {
  const ref = useRef<HTMLInputElement>(null);

  const r = new FileReader();

  r.onloadend = () => {
    const bytes = new Uint8Array(r.result as ArrayBuffer);
    load(title, bytes);
  };

  const upload = () => {
    const input = ref.current!;
    const file = input.files![0];
    title = file.name;
    if (title.endsWith('.gba')) {
      r.readAsArrayBuffer(file);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    title = file.name;
    if (title.endsWith('.gba')) {
      r.readAsArrayBuffer(file);
    }
  };

  return (
    <div
      className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
      onDrop={onDrop}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 feather feather-file"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload a GBA ROM</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={upload}
              ref={ref}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">It is not over the network.</p>
      </div>
    </div>
  );
});
