import Image from "next/image";

export const LoaderScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <Image
        src="/loading-fast.gif"
        alt="loadingGif"
        width={250}
        height={250}
        className=""
        unoptimized={true}
      />
    </div>
  );
};
