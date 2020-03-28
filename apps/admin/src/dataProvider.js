import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider(`${process.env.REACT_APP_API_URL || ''}/api`);

export default dataProvider;
