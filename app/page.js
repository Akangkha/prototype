import Image from "next/image";
import Customisation from "@/components/Customisation";
import Modal from "@mui/material/Modal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Customisation />
    </main>
  );
}
