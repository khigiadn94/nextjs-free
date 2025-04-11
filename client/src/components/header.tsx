import { User } from "@/app/app-provider";
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default async function Header({ user }: { user: User }) {
  return (
    <div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/products">Product</Link>
        </li>
        {user ? (
          <>
            <li>
              <div>
                Greeding! <strong>{user.name}</strong>
              </div>
            </li>
            <li>
              <ButtonLogout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </div>
  );
}
