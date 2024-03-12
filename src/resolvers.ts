import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers, Speciality } from "./types.js";

 
const doctorsData = [
  {
    id: '1',
    name: 'Samia Mekame',
    speciality: Speciality.Ophtalmologist,
  },
  {
    id: '2',
    name: 'Catherine Bedoy',
    speciality: Speciality.Psychologist,
  },
  {
    id: '3',
    name: 'John Doe',
    speciality: Speciality.Ophtalmologist,
  },
];
export const resolvers: Resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      const {specialities} = args
      return doctorsData.filter(doctor => specialities.includes(doctor.speciality))
    },
    doctor: (parent, args, context, info) => {
      const id = args.id
      return doctorsData.find(d => d.id === id)
    },
    divide: (parent, args, context, info) => {
      const {number1, number2} = args
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },
    closestColor: (parent, args, context, info) => {
      const {color} = args
      if (!(color.match(/^#[0-9a-fA-F]{6}/))) {
        throw new GraphQLError('color pattern does not match')
      }
      return getClosestColor(color, ["#FF5733", "#33FF57", "#3357FF"])
    },
    getPeoples: (parent, args, context, info) => {
      return context.dataSources.trackApi.getPeoples()
    },
    getFilms: (parent, args, context, info) => {
      return context.dataSources.trackApi.getFilms()
    },
  },

  Film: {	
    people: (parent, args, context, info) => {
      const res = [];
      console.log(parent);
      for(const ppl of parent.people){
        if(ppl.toString() !== 'https://ghibliapi.dev/people/'){
          res.push(context.dataSources.trackApi.getPeopleBy(ppl.toString()));
        }
      }
      return res;
    }
  },
  People: {
    films: (parent, args, context, info) => {
      const res = [];
      for(const film of parent.films){
        if(film.toString() !== 'https://ghibliapi.dev/people/'){
          res.push(context.dataSources.trackApi.getFilmsBy(film.toString()));
        }
      }
      return res;
    }
  },
 };
