import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider(process.env.API_URL);

export default dataProvider;
