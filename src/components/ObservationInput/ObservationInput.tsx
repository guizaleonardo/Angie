import { useEffect, useRef, useState } from 'react';

interface ObservationInputProps {
  id?: string;
  value: string;
  placeholder: string;
  onCommit: (value: string) => void;
  minHeight?: number;
}

export function ObservationInput({
  id,
  value,
  placeholder,
  onCommit,
  minHeight = 52,
}: ObservationInputProps) {
  const [text, setText] = useState(value);
  const onCommitRef = useRef(onCommit);
  onCommitRef.current = onCommit;

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (text === value) return;
    const timer = window.setTimeout(() => onCommitRef.current(text), 350);
    return () => window.clearTimeout(timer);
  }, [text, value]);

  return (
    <textarea
      id={id}
      value={text}
      placeholder={placeholder}
      style={{ minHeight }}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => {
        if (text !== value) onCommitRef.current(text);
      }}
    />
  );
}
