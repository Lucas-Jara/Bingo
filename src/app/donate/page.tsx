import { getPayment } from "@/action/get-payment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    payment_id: string;
  };
}

const Donate = async ({ searchParams }: Props) => {
  const existPayment = await getPayment(searchParams.payment_id);
  if (!existPayment) redirect("/");
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-4">
      <h4 className="text-center font-bold text-4xl text-black">
        Gracias or la donación!!!
      </h4>
      <Image src="/donate.jpg" width={400} height={400} alt="donate image" />
      <Link href="/">
        <button className="bg-white hover:bg-neutral-100 border text-black font-bold py-2 px-4 rounded-md">
          Volver
        </button>
      </Link>
    </div>
  );
};

export default Donate;
