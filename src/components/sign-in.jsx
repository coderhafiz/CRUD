import { signIn } from "./../auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="bg-white p-2 lg:rounded-md active:scale-95 text-blue-600"
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
