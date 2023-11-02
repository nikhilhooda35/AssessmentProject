export const HTTP_OK = 200;
export const SUCCESS_NO_CONTENT = 204;
export const NOT_AUTHORIZED = 401;
export const NOT_FOUND = 404;
export const ERROR = 400;
export const FORBIDDEN_ERROR = 403;
export const INTERNAL_SERVER_ERROR = 500;
export const TOKEN_EXPIRY_TIME = "TOKEN_EXPIRY_TIME";
export const UNIQUE_KEY = "UNIQUE_KEY";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const USER_ID = "USER_ID";

export const API_PATH = {
  fetchUniqueKey: "Home/GenerateSalt",
  loginIndex: "Home/Index",
  changePassword: "Home/ChangePassword",
  forgotPassword: "Home/ForgotPassword",
  leftMenu: "Home/GetMenuAccess",

  UserSetup: {
    PageSetup: {
      GetModule: "UM/UM_Module_SelForDDL",
      GetPageType: "UM/UM_PageType_SelForDDL",
      Search: "UM/UM_Page_Search",
      AddNewPage: "UM/AddPageMst",
      DeletePage: "UM/UM_Page_Del",
    },
    ModuleSetup: {
      GetModule: "UM/UM_Module_SelForDDL",
      GetPageType: "UM/UM_PageType_SelForDDL",
      Search: "UM/Module_Search",
      AddNewPage: "UM/AddPageMst",
      DeletePage: "UM/UM_Page_Del",
    },
  },
};
