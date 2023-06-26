import { Country } from ".";

export function officialNameSame(country: Country) {
  return country.name.common === country.name.official;
}

export function getFlagSvgSrc(country: Country) {
  return `https://raw.githubusercontent.com/mledoze/countries/master/data/${country.cca3.toLowerCase()}.svg`;
}
