import { Country } from ".";

export async function getCountries() {
  const mledozeResponse = await fetch("https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json");
  const mledozeCountries = (await mledozeResponse.json()) as (Object & { cca3: string })[];

  const dr5hnResponse = await fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries+states+cities.json")
  const dr5hnCountries = (await dr5hnResponse.json()) as (Object & { iso3: string })[]

  const countries: Country[] = []
  mledozeCountries.forEach(mledozeCountry => {
    const dr5hnCountry: any = dr5hnCountries.find(dr5hnCountry => dr5hnCountry.iso3 === mledozeCountry.cca3)

    const country = { ...mledozeCountry } as Country
    if (dr5hnCountry) {
      country.timezones = dr5hnCountry.timezones
      country.states = dr5hnCountry.states
    }
    countries.push(country)
  });


  return countries;
}

export async function getCountry(cca2: string) {
  const countries = await getCountries();
  const country = countries.find((c) => c.cca2 === cca2)! as Country;
  const borderingCountries = countries.filter(c => country.borders.includes(c.cca3))
  return { country, borderingCountries }
}

export async function getDivision(countryCca2: string, divisionCode: string) {
  const { country } = await getCountry(countryCca2)
  const division = country.states.find(s => s.state_code === divisionCode)!
  if (!division) throw Error(`Invalid country/division code ${countryCca2}/${divisionCode}`)
  return division
}

export async function getCountriesByLetter(letter: string) {
  const countries = await getCountries()
  const countriesWithLetter = countries.filter(c => c.name.common.toLowerCase().startsWith(letter.toLowerCase()))
  return countriesWithLetter
}