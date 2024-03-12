import { RESTDataSource } from "@apollo/datasource-rest";
import { AuthorModel, TrackModel } from "../models.js";
import { People, Film } from "../types.js";


export class TrackAPI extends RESTDataSource {
  baseURL = "https://ghibliapi.dev/";

  getPeoples() {
    return this.get<People[]>('people')
  }

  getPeopleBy(id: string) {
    id = id.substring(this.baseURL.length);
    return this.get<People[]>(`${id}`)
  }

  getFilms() {	
    return this.get<Film[]>('films')
  }

  getFilmsBy(id: string) {
    id = id.substring(this.baseURL.length);
    return this.get<Film[]>(`${id}`)
  }

}