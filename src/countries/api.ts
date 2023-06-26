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
  return countries.find((c) => c.cca2 === cca2)! as Country;
}
