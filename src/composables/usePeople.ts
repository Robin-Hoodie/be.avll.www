import { getPeople } from "@/api-client";
import { Role } from "@/types";
import { ref } from "vue";

export async function usePeople(role: Role) {
  const people = await getPeople();
  return ref(people.filter((person) => person.roles.includes(role)));
}
