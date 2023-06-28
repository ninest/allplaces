import { Country } from ".";

export async function getCountries() {
  const response = await fetch("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json");
  const list = (await response.json()) as Country[];
  // const countries = list.map((item) => {
  //   const { translations, ...props } = item;
  //   return { ...props };
  // });
  // ;
  return list;
}

export async function getCountry(cca2: string) {
  const countries = await getCountries();
  const country = countries.find((c) => c.cca2 === cca2)! as Country;
  const borderingCountries = countries.filter(c => country.borders.includes(c.cca3))
  return { country, borderingCountries }
}
