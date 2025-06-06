import { useEffect, useRef, useState } from "react";

function Countdown() {
  const [count, setCount] = useState(9);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!interval.current)
      interval.current = setInterval(() => {
        if (count === 8) console.log("ok");

        setCount((prev) => {
          if (prev === 0 && interval.current) {
            clearInterval(interval.current);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
  }, []);

  return <div className="text-6xl font-bold">{count}</div>;
}
export default Countdown;
