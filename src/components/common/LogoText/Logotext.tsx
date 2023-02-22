import { useEffect, useState } from "react";

export const Logotext = () => {
  const [LedEffect, setLedEffect] = useState({ sign: 1, order: 0 });
  const mylogo = ["O", "n", "e", "E", "d", "u", "c", "a", "t", "i", "o", "n"];

  useEffect(() => {
    setTimeout(() => {
      if (LedEffect.sign === 1) {
        if (LedEffect.order === 11) {
          setLedEffect({ ...LedEffect, sign: -1 });
        } else {
          setLedEffect({ ...LedEffect, order: LedEffect.order + 1 });
        }
      } else {
        if (LedEffect.order === 0) {
          setLedEffect({ ...LedEffect, sign: 1 });
        } else {
          setLedEffect({ ...LedEffect, order: LedEffect.order - 1 });
        }
      }
    }, 200);
  }, [LedEffect]);
  return (
    <>
      {mylogo.map((item: any, index: any) => (
        <span
          key={index}
          className={`font-bold  ${
            LedEffect.order === index ? "text-secondary" : "text-light2"
          } `}
        >
          {item}
        </span>
      ))}
    </>
  );
};
