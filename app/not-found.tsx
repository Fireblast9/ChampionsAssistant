import BackButton from "./components/BackButton";

export default function NotFoundPage() {
  return (
    <>
      <div className="text-2xl">Error 404</div>
      <p className="mb-4">
        Not sure what you&apos;re looking for, but it&apos;s not here.
      </p>
      <BackButton href="/" />
    </>
  );
}
