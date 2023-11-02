import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
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
  PageSetupActions,
  deletePageHandlerCreator,
  getModuleHandlerCreator,
  getPageTypeHandlerCreator,
} from "./redux/slice";
import { pageSetupSelector } from "./redux";
import { API_PATH } from "common/constants";
import NetworkService from "services/network/NetworkService";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutesName } from "router/paths";
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
    },
  },
});

const initialSearchPageData = {
  fk_moduleId: 0,
  fk_pagetypeId: 0,
  menucaption: "",
  modulename: "",
  pagetypename: "",
  pagename: "",
  pageIndex: 2,
  pageSize: 10,
};

export const PageSetup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const secondMenuData = location.state;
  const [searchPageData, setSearchPageData] = useState(initialSearchPageData);
  const [searchedData, setSearchedData] = useState([]);
  const [updatingError, setUpdatingError] = useState(null);
  const [isUpdatingPage, setIsUpdatingPage] = useState(false);

  const module = useSelector(pageSetupSelector.getModuleData(), shallowEqual);
  const loading = useSelector(pageSetupSelector.getLoading(), shallowEqual);
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

  const handleDeletePage = useCallback((deletePageData) => {
    dispatch(deletePageHandlerCreator({ deletePageData }));
    onAddOrUpdatePageHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddPageData = useCallback(() => {
    setSearchPageData(initialSearchPageData);
  }, []);

  const onAddOrUpdatePageHandler = async () => {
    const updatedAddPageData = {
      fk_moduleId: searchPageData.fk_moduleId,
      fk_pagetypeId: searchPageData.fk_pagetypeId,
      menucaption: searchPageData.menucaption,
      pagename: searchPageData.pagename,
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
    setSearchPageData({
      ...searchPageData,
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

  const onChangeMenu = useCallback(
    (event) => {
      onFormUpdateHandler({ menucaption: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangePageName = useCallback(
    (event) => {
      onFormUpdateHandler({ pagename: event.target.value });
    },
    [onFormUpdateHandler]
  );

  if (isUpdatingPage || loading) {
    LoadingIndicator();
    dispatch(PageSetupActions.updateLoading(true));
  }

  return (
    <Grid container spacing={4} direction="column">
      <Grid xs={4} item>
        <Box className="nav-container">
          <Typography className="page-setup-text">Page Setup</Typography>
          <Button
            variant="contained"
            className="button-PageSetup addNew-button-PageSetup reset-button-PageSetup-hover"
            onClick={() => {
              navigate(RoutesName.AddPage.path, {
                state: secondMenuData,
              });
            }}
          >
            <Typography className="addNew-setup-text">Add New</Typography>
          </Button>
        </Box>
        <Box className="upper-main-container">
          <Box className="first-container">
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
            <TextField
              className="textField"
              placeholder="Menu Name"
              value={searchPageData.menucaption}
              onChange={onChangeMenu}
              InputProps={{
                className: "textField-input",
              }}
              variant="outlined"
            />
            <TextField
              className="textField"
              placeholder="Page Name"
              value={searchPageData.pagename}
              onChange={onChangePageName}
              InputProps={{
                className: "textField-input",
              }}
              variant="outlined"
            />
          </Box>
          <Box className="buttons">
            <Button
              variant="contained"
              className="button-PageSetup reset-button-PageSetup"
              onClick={getAddPageData}
            >
              <Typography color="black" fontWeight={500} fontSize={14}>
                Reset
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="button-PageSetup search-button-PageSetup reset-button-PageSetup-hover"
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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S. No.</TableCell>
                  <TableCell>Module Name</TableCell>
                  <TableCell align="center">Menu Name</TableCell>
                  <TableCell align="center">Page Name</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {searchedData?.map((row, index) => (
                  <TableRow
                    key={row.pagename}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#F8F8F8",
                    }}
                  >
                    <TableCell>{row.srNo ? row.srNo : "Undefined"}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.modulename
                        ? row.modulename
                        : " Undefined Module Name"}
                    </TableCell>
                    <TableCell align="center">{row.menucaption}</TableCell>
                    <TableCell align="center">{row.pagename}</TableCell>
                    {row.active === "Yes" ||
                    row.active === "yes" ||
                    row.active === "YES" ? (
                      <TableCell align="center">
                        <Typography className="pass-text">Pass</Typography>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <Typography className="inactive-text">
                          Inactive
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <Box>
                        <IconButton className="iconbutton">
                          <Edit className="edit-icon" />
                        </IconButton>
                        <IconButton
                          className="iconbutton"
                          onClick={() =>
                            handleDeletePage({
                              pk_pageId: row.pk_pageId,
                              actionPageId_enc: "5",
                            })
                          }
                        >
                          <DeleteOutlineRounded className="delete-icon" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4" align="center">
            No Data
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
