const dev = {
  empContext: 'http://localhost:3001'
}

const prod = {
  empContext: 'some aws url'
}

export let environment = dev;

if (process.env.NODE_ENV === 'production') {
  environment = prod;
}