import { useRef, useEffect } from 'react';

type VerificationCodeInputProps = {
  length: number;
  value: string;
  onChange: (value: string) => void;
};

export default function VerificationCodeInput({ length, value, onChange }: VerificationCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  const handleInput = (index: number, inputValue: string) => {
    const newValue = value.split('');
    newValue[index] = inputValue.slice(-1); // Only keep the last character
    
    onChange(newValue.join(''));
    
    // Auto focus to next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Only process numbers
    const numericData = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (numericData) {
      onChange(numericData.padEnd(length, ''));
      
      // Set focus to last non-empty input
      const focusIndex = Math.min(numericData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };
  
  // Correctly handle refs
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };
  
  return (
    <div className="flex justify-center gap-2" role="group" aria-labelledby="verification-code-label">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={setInputRef(index)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleInput(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          aria-label={`验证码第 ${index + 1} 位`}
          placeholder=""
          title={`验证码第 ${index + 1} 位`}
          className="w-12 h-12 text-center text-xl border rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
      ))}
    </div>
  );
} 