import { signOut } from "./../auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="bg-white text-blue-600 p-2 lg:rounded-md active:scale-95"
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
