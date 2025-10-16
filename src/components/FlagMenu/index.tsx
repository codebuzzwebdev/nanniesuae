import * as React from "react";
import {
  useTheme,
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Icon from "@components/Icon";

import UAESVG from "@assets/uae.svg";
import SASVG from "@assets/sa.svg";
import BHSVG from "@assets/bahrain.svg";

const VITE_WP_URL = import.meta.env.VITE_WP_URL;

const FlagMenu: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleRedirect = (country: string) => {
    setOpen(false);
    switch (country) {
      case "uae":
        window.location.href = `${VITE_WP_URL}/`;
        break;
      case "sa":
        window.location.href = `${VITE_WP_URL}/saudi-arabia`;
        break;
      case "bahrain":
        window.location.href = `${VITE_WP_URL}/bahrain`;
        break;
      default:
        break;
    }
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab" || event.key === "Escape") {
      handleClose(event);
    }
  }

  return (
    <Box
      px={{ xs: 1, sm: 1, md: 1, lg: 1, xl: "15px" }}
      onMouseLeave={() => handleToggle(false)}
    >
      {/* Trigger Button */}
      <Box
        ref={anchorRef}
        id="flag-menu-button"
        aria-controls={open ? "flag-menu-list" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={handleClose}
        display="flex"
        alignItems="center"
        sx={{
          cursor: "pointer",
          fontSize: 16,
          textTransform: "none",
          color: theme.palette.common.black,
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Box display="flex" alignItems="center" px={1}>
          <img src={UAESVG} alt="UAE" width={36} height={24} />
          <Typography variant="body1" color="#161D2D" fontSize={16} ml={1}>
            UAE
          </Typography>
          <Box ml={0.5}>
            <Icon name="down" size={12} />
          </Box>
        </Box>
      </Box>

      {/* Dropdown Menu */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{
          width: 250,
          pt: 2,
          zIndex: 9999,
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                borderRadius: 0,
                boxShadow:
                  "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                background: theme.palette.common.white,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={false}
                  id="flag-menu-list"
                  aria-labelledby="flag-menu-button"
                  onKeyDown={handleListKeyDown}
                  onMouseEnter={() => handleToggle(true)}
                  onMouseLeave={() => handleToggle(true)}
                  sx={{
                    py: 2,
                    background: theme.palette.common.white,
                  }}
                >
                  {/* Saudi Arabia */}
                  <MenuItem
                    onClick={() => handleRedirect("sa")}
                    sx={{
                      py: 1,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        background: theme.palette.common.white,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <img src={SASVG} alt="Saudi Arabia" width={36} height={24} />
                      <Typography variant="body1" fontSize={16} ml={1}>
                        SA
                      </Typography>
                    </Box>
                  </MenuItem>

                  {/* Bahrain */}
                  <MenuItem
                    onClick={() => handleRedirect("bahrain")}
                    sx={{
                      py: 1,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        background: theme.palette.common.white,
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <img src={BHSVG} alt="Bahrain" width={36} height={24} />
                      <Typography variant="body1" fontSize={16} ml={1}>
                        Bahrain
                      </Typography>
                    </Box>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default FlagMenu;
