import { getPeople } from "@/api-client";
import { Role, Person } from "@/types";

let people: Person[] | null = null;

export async function usePeople(role: Role) {
  if (!people) {
    people = await getPeople();
  }
  return people.filter((person) => person.roles.includes(role));
}
