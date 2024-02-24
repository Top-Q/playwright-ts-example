import { test, expect } from '@playwright/test';


test('getting Pokemon types - Promise', async ({ request }) => {
  request.get('https://pokeapi.co/api/v2/type')
    .then((response) => {
      console.log("Response result: " + response.ok())
      response.json().then((json) => {
        console.log("About to print the json");
        console.log(json);
        const count = json.results.length;
        console.log("Number of results" + count);
        expect(count).toBe(20);
      });
    })
    .catch((error) => {console.log(error)});
    
    // We need to wait for the promise to resolve
    await new Promise(r => setTimeout(r, 2000));
});

test("getting Pokemon types - await" , async({request}) =>{
  const response = await request.get('https://pokeapi.co/api/v2/type')
  const json = await response.json();
  console.log(json);
  const count = json.results.length;
  expect(count).toBe(20);
});

export class PokemonType {

  constructor(private name: string,private url: string) {
  }

  public toString() {
    return "PokemonType: " + this.name + " " + this.url;
  }
}

test("getting Pokemon types - store in list" , async({request}) =>{
  const response = await request.get('https://pokeapi.co/api/v2/type')
  const json = await response.json();
  let poks: Array<PokemonType> = [];
  for (let i in json.results) {
    let pType = new PokemonType(json.results[i].name, json.results[i].url);
    poks.push(pType);
  }
  console.log(poks);
});
