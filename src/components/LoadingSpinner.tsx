export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="
        w-4 h-4
        border-2 border-green-200 border-t-transparent sm:border-4 sm:w-6 sm:h-6
        rounded-full
        animate-spin
      "></div>
    </div>
  );
}
