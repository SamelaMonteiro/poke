import { Router } from "./routes";

export default function App() {
  return (
    <div className="w-screen h-screen bg-neutral-600 overflow-auto flex justify-center">
      <Router />
    </div>
  );
}
