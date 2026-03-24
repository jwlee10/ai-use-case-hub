export interface Newsletter {
  id: string;
  title: string;
  imageUrl: string;
  date: string; // YYYY-MM-DD
}

let newsletters: Newsletter[] = [
  {
    id: "nl1",
    title: "March 2026 Newsletter",
    imageUrl: "/newsletters/march-2026.png",
    date: "2026-03-01",
  },
  {
    id: "nl2",
    title: "February 2026 Newsletter",
    imageUrl: "/newsletters/february-2026.png",
    date: "2026-02-01",
  },
  {
    id: "nl3",
    title: "January 2026 Newsletter",
    imageUrl: "/newsletters/january-2026.png",
    date: "2026-01-01",
  },
];

export const getNewsletters = () => newsletters;

export const addNewsletter = (nl: Newsletter) => {
  newsletters = [nl, ...newsletters];
};
