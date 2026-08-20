import { useEffect, useRef, useState, type ChangeEvent } from 'react';

interface DebouncedFieldProps {
  label: string;
  value: string;
  onCommit: (value: string) => void;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  span?: boolean;
}

export function DebouncedField({
  label,
  value,
  onCommit,
  multiline = false,
  type = 'text',
  placeholder,
  span = false,
}: DebouncedFieldProps) {
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

  const commit = () => {
    if (text !== value) onCommitRef.current(text);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div style={span ? { gridColumn: '1 / -1' } : undefined}>
      <label>{label}</label>
      {multiline ? (
        <textarea value={text} placeholder={placeholder} onChange={onChange} onBlur={commit} />
      ) : (
        <input type={type} value={text} placeholder={placeholder} onChange={onChange} onBlur={commit} />
      )}
    </div>
  );
}
