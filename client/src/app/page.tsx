import Client from "./Client";
import { Provider } from "./Context";

function Page() {
  return (
    <Provider>
      <Client />
    </Provider>
  );
}
export default Page;
