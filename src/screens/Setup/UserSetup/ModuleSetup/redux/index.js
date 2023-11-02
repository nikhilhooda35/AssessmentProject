// export actions and reducers

export { ModuleSetupActions, ModuleSetupReducer } from "./slice";

export {
  moduleSetupLoadingHandlerWatcher,
  getModuleHandlerWatcher,
  getPageTypeHandlerWatcher,
  deleteModuleHandlerWatcher,
} from "./saga";

export { moduleSetupSelector } from "./selectors";
