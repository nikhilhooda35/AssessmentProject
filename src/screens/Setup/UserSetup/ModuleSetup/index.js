import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteOutlineRounded, Edit } from "@mui/icons-material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getModuleHandlerCreator,
  getPageTypeHandlerCreator,
} from "../PageSetup/redux/slice";
import { API_PATH } from "common/constants";
import NetworkService from "services/network/NetworkService";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
import { pageSetupSelector } from "../PageSetup/redux";
import { ErrorToaster } from "components/Toaster";
import { LoadingIndicator } from "components/loadingIndicator";

const useStyles = makeStyles({
  dropdown: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 17,
      border: "1.4px solid rgba(148, 148, 148, 0.24)",
      background: "#fff",
      // height: 42,
      width: 250,
      fontSize: 16,
      marginRight: 15,
    },
  },
});

const initialAddPageData = {
  fk_moduleId: 0,
  fk_pagetypeId: 0,
  menucaption: "",
  modulename: "",
  pagetypename: "",
  pagename: "",
  pageIndex: 2,
  pageSize: 10,
};

export const ModuleSetup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const secondMenuData = location.state;
  const [addPageData, setAddPageData] = useState(initialAddPageData);
  const [searchedData, setSearchedData] = useState([]);
  const [updatingError, setUpdatingError] = useState(null);
  const [isUpdatingPage, setIsUpdatingPage] = useState(false);

  const module = useSelector(pageSetupSelector.getModuleData(), shallowEqual);
  const pageType = useSelector(
    pageSetupSelector.getPageTypeData(),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getModuleHandlerCreator());
    dispatch(getPageTypeHandlerCreator());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moduleProps = {
    options: module,
    getOptionLabel: (option) => option.modulename,
  };

  const pageTypeProps = {
    options: pageType,
    getOptionLabel: (option) => option.pagetypename,
  };

  const getAddPageData = useCallback(() => {
    setAddPageData(initialAddPageData);
  }, []);

  const onAddOrUpdatePageHandler = async (e) => {
    e.preventDefault();

    const updatedAddPageData = {
      modulename: addPageData.modulename,
      displayname: addPageData.displayname,
      pageIndex: 1,
      pageSize: 10,
    };
    setIsUpdatingPage(true);
    try {
      const response = await NetworkService.post(
        API_PATH.UserSetup.PageSetup.Search,
        updatedAddPageData,
        {}
      );
      if (response.status !== 200) {
        ErrorToaster("Error Occured");
        setUpdatingError(response.data.description);
      } else {
        setSearchedData(response.data._lstPageModel);
      }
      setIsUpdatingPage(false);
    } catch (error) {
      setIsUpdatingPage(false);
      ErrorToaster("Error Occured");
      setUpdatingError(error.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFormUpdateHandler = (data) => {
    if (updatingError) {
      setUpdatingError(null);
    }
    setAddPageData({
      ...addPageData,
      ...data,
    });
  };

  const onChangeModule = useCallback(
    (_, val) => {
      if (val) {
        onFormUpdateHandler({
          fk_moduleId: val.pk_moduleId,
          modulename: val.modulename,
        });
      } else {
        // Handle the case when val is null (clear action)
        onFormUpdateHandler({
          fk_moduleId: 0, // Set default value or 0, depending on your use case
          modulename: "", // Clear the modulename
        });
      }
    },
    [onFormUpdateHandler]
  );

  const onChangePageType = useCallback(
    (_, val) => {
      if (val) {
        onFormUpdateHandler({
          fk_pagetypeId: val.pk_pagetypeId,
          pagetypename: val.pagetypename,
        });
      } else {
        onFormUpdateHandler({
          fk_pagetypeId: 0,
          pagetypename: "",
        });
      }
    },
    [onFormUpdateHandler]
  );

  if (isUpdatingPage) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container spacing={4} direction="column">
      <Grid xs={4} item>
        <Box className="nav-container-Module-setup">
          <Typography fontSize={22} fontWeight={600}>
            Module Setup
          </Typography>
          <Button
            variant="contained"
            marginBottom={5}
            className="button-Module-setup search-button-Module-setup reset-button-Module-setup-hover"
            onClick={() => {
              navigate(RoutesName.AddPage.path, {
                state: secondMenuData,
              });
            }}
          >
            <Typography fontWeight={600} fontSize={14}>
              Add New
            </Typography>
          </Button>
        </Box>
        <Box className="upper-main-container-Module-setup">
          <Box className="first-container-Module-setup">
            <Autocomplete
              id="combo-box-demo"
              {...moduleProps}
              classes={{ root: classes.dropdown }}
              disablePortal
              onChange={onChangeModule}
              renderInput={(params) => (
                <TextField
                  {...params}
                  classes={{ input: classes.dropdown }}
                  label="Module"
                />
              )}
            />

            <Autocomplete
              id="combo-box-demo"
              {...pageTypeProps}
              classes={{ root: classes.dropdown }}
              disablePortal
              onChange={onChangePageType}
              renderInput={(params) => (
                <TextField
                  {...params}
                  classes={{ root: classes.dropdown }}
                  label="Page Type"
                />
              )}
            />
          </Box>
          <Box className="buttons-Module-setup">
            <Button
              variant="contained"
              className="button-Module-setup reset-button-Module-setup"
              onClick={getAddPageData}
            >
              <Typography color="black" fontWeight={500} fontSize={14}>
                Reset
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="button-Module-setup search-button-Module-setup reset-button-Module-setup-hover"
              onClick={onAddOrUpdatePageHandler}
            >
              <Typography fontWeight={600} fontSize={14}>
                Search
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} item>
        {searchedData && searchedData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Module Name</TableCell>
                  <TableCell>Alias</TableCell>
                  <TableCell>Display Name</TableCell>
                  <TableCell>Order No</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {searchedData?.map((row) => (
                  <TableRow
                    key={row.pagename}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.srNo ? row.srNo : "Undefined"}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.modulename
                        ? row.modulename
                        : " Undefined Module Name"}
                    </TableCell>
                    <TableCell>{row.menucaption}</TableCell>
                    <TableCell>{row.pagename}</TableCell>
                    <TableCell>{row.pagename}</TableCell>
                    {row.active === "Yes" ||
                    row.active === "yes" ||
                    row.active === "YES" ? (
                      <TableCell align="center">
                        <Typography
                          sx={{
                            backgroundColor: "#17D056",
                            // width: 45,
                            // marginLeft: 17,
                            borderRadius: 10,
                          }}
                        >
                          Pass
                        </Typography>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <Typography
                          sx={{
                            backgroundColor: "red",
                            // width: 45,
                            // marginLeft: 17,
                            borderRadius: 10,
                            color: "#fff",
                          }}
                        >
                          Inactive
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <Box>
                        <IconButton className="iconbutton">
                          <Edit
                            style={{ color: "blue", height: 25, width: 25 }}
                          />
                        </IconButton>
                        <IconButton className="iconbutton">
                          <DeleteOutlineRounded
                            style={{ color: "red", height: 25, width: 25 }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4">No Data</Typography>
        )}
      </Grid>
    </Grid>
  );
};
