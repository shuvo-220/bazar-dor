
import Image from "next/image";
import logo from "../../../public/logo-icon.png";
import Link from "next/link";
import NavbarAuth from "./NavbarAuth";

const Navbar = async () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );
  const result = await res.json();
  const data = result?.data || result;

  return (
    <div>
      <div className="flex items-center justify-between bg-white py-5">
        <Link href='/' className="flex gap-3">
          <Image src={logo} alt="logo" width={25} height={25} />
          <div>
            <h2 className="text-2xl font-bold">বাজার দর</h2>
            <span className="text-sm">{date}</span>
          </div>
        </Link>

        {/* Login status অনুযায়ী user menu */}
        <NavbarAuth />
      </div>

      <div className="flex justify-center gap-5">
        {data.map((nav) => (
          <Link key={nav.id} href={`/category/${nav.slug}`}>
            <span>{nav.icon}</span>{" "}
            <span>{nav.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

