
//this is the type of poduct , with its fields and datatypes which will match to what we are getting from the response
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
