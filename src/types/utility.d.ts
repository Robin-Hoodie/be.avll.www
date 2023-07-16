export type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: Exclude<T[P], null>;
};

export type MenuLink = MenuLinkWithChildren | MenuLinkWithoutChildren;

export interface MenuLinkWithChildren {
  title: string;
  icon: string;
  value: string;
  children: Array<{
    title: string;
    to?: string;
    href?: string;
  }>;
}

export type MenuLinkWithoutChildren = Pick<
  MenuLinkWithChildren,
  "title" | "icon"
> & {
  to: string;
};
