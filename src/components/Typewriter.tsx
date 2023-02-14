import { useEffect, useState } from "react";
import styles from "../styles/Typewriter.module.css";

function arrWithoutLast(arr: any[]) {
  return arr.filter((_, index) => index + 1 != arr.length);
}

function chunksFromArr<T>(arr: T[], size: number) {
  let chunks: T[][] = [];
  let chunk = -1;
  for (let i = 0; i < arr.length; i++) {
    if (i % size == 0) {
      chunks.push([]);
      chunk++;
    }
    chunks[chunk]?.push(arr[i] as T);
  }
  return chunks;
}

export interface TypewriterProps {
  maxlength?: number;
  onenter?: (event?: KeyboardEvent, text?: string) => void;
}

export default function Typewriter(props: TypewriterProps) {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (
        (e.code.startsWith("Key") || e.code == "Space") &&
        (!props.maxlength || letters.length < props.maxlength)
      )
        setLetters([...letters, e.key]);
      else if (e.code == "Backspace") setLetters(arrWithoutLast(letters));
      else if (e.code == "Enter" && letters.length > 0 && props.onenter) props.onenter(e, letters.join(''));
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [letters]);

  const chunks = chunksFromArr(letters, 10);

  return (
    <>
      {chunks.length > 0 ? (
        chunks.map((chunkLetters, chunkIndex, chunks) => (
          <div
            key={chunkIndex}
            className="flex flex-row justify-center gap-2 text-white"
          >
            {chunkLetters.map((letter, rowIndex) => (
              <p key={rowIndex} className={`${styles.letter}`}>
                {letter}
              </p>
            ))}
            {(chunkIndex == chunks.length - 1 || letters.length == 0) &&
              (props.maxlength ? (
                letters.length < props.maxlength && (
                  <p className={`${styles.letter} ${styles.blink}`}></p>
                )
              ) : (
                <p className={`${styles.letter} ${styles.blink}`}></p>
              ))}
          </div>
        ))
      ) : (
        <div key={-1} className="flex flex-row justify-center gap-2 text-white">
          <p className={`${styles.letter} ${styles.blink}`}></p>
        </div>
      )}
    </>
  );
}