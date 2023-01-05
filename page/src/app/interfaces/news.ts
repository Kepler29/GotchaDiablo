export interface News {
  _id: string
  title: {
    es: string;
    en: string;
  };
  slug: {
    es: string;
    en: string;
  };
  intro: {
    es: string;
    en: string;
  };
  content: {
    es: string;
    en: string;
  };
  date: string;
  datePicker: {
    year: number,
    month: number,
    day: number
  };
  image: string;
  active: boolean;
  type: string;
}
