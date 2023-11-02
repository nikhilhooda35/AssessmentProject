import React, { useCallback, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { moduleSetupSelector } from "../redux";
import NetworkService from "services/network/NetworkService";
import { API_PATH } from "common/constants";
import { ErrorToaster, SuccessToaster } from "components/Toaster";

const useStyles = makeStyles({
  dropdown: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 17,
      background: "#fff",
      height: 56,
      //   width: 250,
      fontSize: 16,
    },
  },
});

const initialSearchModuleData = {
  fk_moduleId: 0,
  fk_pagetypeId: 0,
  menucaption: "",
  modulename: "",
  pagetypename: "",
  pagename: "",
  pagepath: "",
  displayorder: "",
  tooltip: "",
  pageimage: "",
  isActive: false,
  remarks: "",
  pageIndex: 2,
  pageSize: 10,
};

export const AddModule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pageData = location.state;
  const [searchModuleData, setSearchModuleData] = useState(initialSearchModuleData);
  const [isUpdatingPage, setIsUpdatingPage] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const goBack = () => {
    navigate("/modulesetup");
  };

  const module = useSelector(moduleSetupSelector.getModuleData(), shallowEqual);
  const pageType = useSelector(
    moduleSetupSelector.getPageTypeData(),
    shallowEqual
  );

  const moduleProps = {
    options: module,
    getOptionLabel: (option) => option.modulename,
  };

  const pageTypeProps = {
    options: pageType,
    getOptionLabel: (option) => option.pagetypename,
  };

  const onAddOrUpdatePageHandler = async (e) => {
    e.preventDefault();

    const updatedSearchModuleData = {
      menucaption: searchModuleData.menucaption,
      pagename: searchModuleData.pagename,
      displayname: searchModuleData.displayname,
      pagepath: searchModuleData.pagepath,
      tooltip: searchModuleData.tooltip,
      pageimage: searchModuleData.pageimage,
      Active: searchModuleData.isActive,
      remarks: searchModuleData.remarks,
      pageIndex: 1,
      pageSize: 10,
      actionPageId_enc: pageData.pk_pageId_enc,
    };
    setIsUpdatingPage(true);
    console.log("updatedSearchModuleData", updatedSearchModuleData);
    try {
      const response = await NetworkService.post(
        API_PATH.UserSetup.PageSetup.AddNewPage,
        updatedSearchModuleData,
        {}
      );
      if (response.status === 200) {
        SuccessToaster(response.data.message || "Record Saved Successfully");
      } else {
        ErrorToaster("Error Occured");
        setUpdatingError(response.data.description);
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
    setSearchModuleData({
      ...searchModuleData,
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

  const onChangeMenuCaption = useCallback(
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

  const onChangePagePath = useCallback(
    (event) => {
      onFormUpdateHandler({ pagepath: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangeDisplayOrder = useCallback(
    (event) => {
      onFormUpdateHandler({ displayorder: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangeToolTip = useCallback(
    (event) => {
      onFormUpdateHandler({ tooltip: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangePageImage = useCallback(
    (event) => {
      onFormUpdateHandler({ pageimage: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangeRemarks = useCallback(
    (event) => {
      onFormUpdateHandler({ remarks: event.target.value });
    },
    [onFormUpdateHandler]
  );

  const onChangeIsActive = useCallback(
    (event) => {
      onFormUpdateHandler({ isActive: event.target.checked });
    },
    [onFormUpdateHandler]
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Add Page
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className="upper-main-container-addPage">
          <Grid container spacing={2}>
            {/* Autocomplete for Module */}
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                id="module-autocomplete"
                {...moduleProps}
                fullWidth
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
            </Grid>
            {/* Autocomplete for Page Type */}
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                id="page-type-autocomplete"
                {...pageTypeProps}
                fullWidth
                classes={{ root: classes.dropdown }}
                disablePortal
                onChange={onChangePageType}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    classes={{ input: classes.dropdown }}
                    label="Page Type"
                  />
                )}
              />
            </Grid>
            {/* Page Name Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                className="textField"
                fullWidth
                placeholder="Page Name"
                value={searchModuleData.pagename}
                onChange={onChangePageName}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
            {/* Page Path Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                className="textField"
                placeholder="Page Path"
                value={searchModuleData.pagepath}
                onChange={onChangePagePath}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
            {/* Menu Caption Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                className="textField"
                placeholder="Menu Caption"
                value={searchModuleData.menucaption}
                onChange={onChangeMenuCaption}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
            {/* Tool Tip Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                className="textField"
                placeholder="Tool Tip"
                value={searchModuleData.tooltip}
                onChange={onChangeToolTip}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
            {/* Display Order Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                className="textField"
                placeholder="Display Order"
                value={searchModuleData.displayorder}
                onChange={onChangeDisplayOrder}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
            {/* Page Image Input */}
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                className="textField"
                placeholder="Page Image"
                value={searchModuleData.pageimage}
                onChange={onChangePageImage}
                InputProps={{
                  className: "textField-input-addPage",
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid item my={2}>
            <FormControlLabel
              label="Is Active"
              control={
                <Checkbox
                  checked={searchModuleData.isActive}
                  onChange={onChangeIsActive}
                />
              }
            />
          </Grid>
          <Grid item>
            <TextField
              label="Remarks"
              fullWidth
              multiline
              rows={4}
              placeholder="Enter your remarks here"
              value={searchModuleData.remarks}
              onChange={onChangeRemarks}
              InputProps={{
                className: "remarks-input-addPage",
              }}
            />
          </Grid>

          <Box className="buttons-addPage">
            <Button
              variant="contained"
              className="button-addPage reset-button-addPage"
              onClick={() => {
                goBack();
              }}
            >
              <Typography color="black" fontWeight={500} fontSize={14}>
                Cancel
              </Typography>
            </Button>
            <Button
              variant="contained"
              className="button-addPage search-button-addPage reset-button-addPage-hover"
              onClick={onAddOrUpdatePageHandler}
            >
              <Typography fontWeight={600} fontSize={14}>
                Save
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
