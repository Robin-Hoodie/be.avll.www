import { getPeople } from "@/api-client";
import { Role, Person } from "@/types";

let people: Person[] | null = null;

export async function usePeople(roleName: Role["name"]) {
  if (!people) {
    people = await getPeople();
  }
  return people.filter((person) =>
    person.roles.some((role) => role.name === roleName)
  );
}
