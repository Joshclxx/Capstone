import Image from "next/image";

export default function ImageContainer() {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <Image
          src="/image/icon.svg"
          alt="Sample"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

//  COSTUMIZE IF NEEDED
