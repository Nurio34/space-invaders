import { useGlobalContext } from "@/app/Context";
import { Form } from "./components/Form";
import Loading from "./components/Loading";
import { useEffect, useRef, useState } from "react";

export function Home() {
  const { isAllAssetsLoaded, isGameStarted } = useGlobalContext();
  const [isRender, setIsRender] = useState(true);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isGameStarted) {
      setIsRender(true);
      timeout.current = null;
    }

    if (isGameStarted) {
      timeout.current = setTimeout(() => {
        setIsRender(false);
      }, 1000);
    }

    return () => {
      if (timeout.current) clearInterval(timeout.current);
    };
  }, [isGameStarted]);

  return (
    isRender && (
      <div
        className={`fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-96 aspect-square select-none
          md:shadow-[0_10px_40px_-10px_black] rounded-lg py-2 px-10 bg-base-100 transformation-transform duration-1000
          ${isGameStarted ? "opacity-0" : "opacity-100"}
        `}
      >
        {!isAllAssetsLoaded ? <Loading /> : <Form />}
      </div>
    )
  );
}
