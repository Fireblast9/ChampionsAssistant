import BackButton from "./components/BackButton";

export default function NotFoundPage() {
  return (
    <div className="p-12">
      <div className="text-2xl mb-4">Error 404</div>
      <p className="mb-8">
        Not sure what you&apos;re looking for, but it&apos;s not here.
      </p>
      <BackButton href="/" />
    </div>
  );
}
