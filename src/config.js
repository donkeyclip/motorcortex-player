// the players start name
export let name = "mc-player";

// set the players total name
export function updateName(nameToAdd) {
  name += `-${nameToAdd}`;
}
