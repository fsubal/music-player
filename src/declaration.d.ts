type Branded<T, U extends string> = T & { [K in U]: never }

interface BaseEntity<Name extends string> {
  id: Branded<string, Name>
}
