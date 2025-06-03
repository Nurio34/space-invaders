import { useGlobalContext } from "@/app/Context";
import { Form } from "./components/Form";
import Loading from "./components/Loading";

function Home() {
  const { isAllAssetsLoaded } = useGlobalContext();

  return !isAllAssetsLoaded ? <Loading /> : <Form />;
}
export default Home;
