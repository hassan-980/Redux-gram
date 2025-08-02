function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 bg-opacity-50 flex items-center justify-center overflow-hidden">
      <button
        type="button"
        className="flex items-center rounded bg-indigo-600 p-2 text-white"
        disabled
      >
        <div className="w-4 h-4 border-3 mr-1 border-t-transparent border-white rounded-full animate-spin"></div>
        Loading...
      </button>
    </div>
  );
}

export default Loader;
