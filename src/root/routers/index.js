import auth from "./auth";

export default function() {
  let root = { ...auth() };
  return root;
}
