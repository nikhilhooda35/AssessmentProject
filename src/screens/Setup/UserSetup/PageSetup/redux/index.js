// export actions and reducers

export { PageSetupActions, PageSetupReducer } from "./slice";

export {
  getModuleHandlerWatcher,
  getPageTypeHandlerWatcher,
  deletePageHandlerWatcher,
} from "./saga";

export { pageSetupSelector } from "./selectors";
