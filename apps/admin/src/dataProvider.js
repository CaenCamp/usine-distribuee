import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider(process.env.REACT_APP_API_URL || '');

export default dataProvider;
