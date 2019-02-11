const dev = {
  pokeContext: 'http://localhost:3001'
}

const prod = {
  pokeContext: 'some aws url'
}

export let environment = dev;

if (process.env.NODE_ENV === 'production') {
  environment = prod;
}