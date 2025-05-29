import ErrorPage from "./ErrorPage";

export default function Error401() {
  return (
    <div className="bg-blue-500 min-h-screen">
      <ErrorPage errorCode="401" />
    </div>
  );
}
