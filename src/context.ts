import { TrackAPI } from "./datasources/TrackAPI"

export type DataSourceContext = {
  dataSources: {
    trackApi: TrackAPI
  }
}