export const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <img
        src="/loading-fast.gif"
        alt="loadingGif"
        className="w-[250px] h-[250px] "
      />
    </div>
  );
};
