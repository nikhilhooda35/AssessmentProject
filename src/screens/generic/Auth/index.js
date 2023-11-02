import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { saveAccessToken, saveTokenExpiryTime, saveUserId } from "helper/login";
import { RoutesName } from "router/paths";
import { genericActions } from "../redux";
import { HTTP_OK } from "common/constants";
import { loginActions } from "../Login/redux";

export const Auth = (response) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.status === HTTP_OK && response.data.authToken) {
      const accessToken = response.data.authToken;
      const userId = response.data.fk_userId_global;
      const decoded = jwt_decode(accessToken);
      saveAccessToken(accessToken);
      saveUserId(userId);
      saveTokenExpiryTime(JSON.stringify(decoded.exp));
      dispatch(loginActions.signIn(response.data));
      if (response.data.isfirstlogin) {
        navigate(RoutesName.ChangePassword.path);
      } else {
        navigate(RoutesName.Layout.path);
      }
    } else {
      dispatch(genericActions.updateLoading(null));
      navigate(RoutesName.Login.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, response]);

  return <></>;
};
