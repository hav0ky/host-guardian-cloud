import WidthWrapper from "@/components/ui/width-wrapper";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <WidthWrapper>
      <Link href="/gameserver">
        gameservers
      </Link>
    </WidthWrapper>
  );
}
