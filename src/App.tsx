import { MetamaskProvider } from "./metamask/context";
import HelloMetamask from "./components/HelloMetamask";

export default function App() {
  return (
    <MetamaskProvider>
      <HelloMetamask />
      <a
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
        target="_blank"
        className="absolute bottom-10 right-10 bg-gray-500 text-white p-4 py-2 rounded pointer"
      >
        Source Code
      </a>
    </MetamaskProvider>
  );
}
