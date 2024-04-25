import { getPeople } from "@/api-client";
import { Person, RoleName } from "@/types";

let people: Person[] | null = null;

export async function usePeople(roleName: RoleName) {
  if (!people) {
    people = await getPeople();
  }
  return people.filter((person) =>
    person.attributes.roles.data.some(
      (role) => role.attributes.name === roleName
    )
  );
}
