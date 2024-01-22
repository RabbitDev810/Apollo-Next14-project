import Link from "next/link";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Nav = ({ blur, user, isoverlay }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <nav
      className={`${isoverlay ? "absolute" : ""} bg-transparent ${
        blur === true && "backdrop-blur-sm"
      } md:w-full z-30 max-h-[201px] pt-[60px]`}
    >
      <div className="w-full container mx-auto flex items-center justify-between mt-0 py-2 px-2">
        <div className=" flex">
          <Link
            className="toggleColour flex no-underline hover:no-underline outline-0 items-center gap-10"
            href="/"
          >
            <img src="/logoo 3.png" alt="Apollo" className="max-w-[86.47px] max-h-[87.45px]" />
            <p className="font-lexend text-grey-50 font-semibold text-3lg max-w-[245px] max-h-[68px]">OracleAI</p>
          </Link>
        </div>
        <div className="flex justify-center items-center lg:gap-30 md:gap-20 sm:gap-10">
          <Link
            href="/calls"
            className="mx-2 cursor-pointer sm:mx-5 font-normal font-satoshi text-grey-100 text-2lg sm:text-[24px]"
          >
            Calls
          </Link>
          <Link
            href="/marketers"
            className="mx-2 cursor-pointer sm:mx-5 font-normal font-satoshi text-grey-100 text-2lg sm:text-[24px]"
          >
            Marketers
          </Link>
          {user ? (
            <p
              onClick={async () => {
                await supabase.auth.signOut();
                router.reload();
              }}
              className="mx-2 cursor-pointer sm:mx-5 text-[14px] sm:text-[16px] text-white"
            >
              Sign Out
            </p>
          ) : null}
        </div>
        <div className="flex jusify-center items-center">
          <button className="font-normal font-satoshi text-grey-100 text-2lg border border-2 rounded-50 p-50 gap-10">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
