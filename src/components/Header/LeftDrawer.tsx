import * as React from "react";
import {
  useTheme,
  Box,
  Typography,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";

import Icon from "@components/Icon";
import Logo from "@components/Logo";

import UAESVG from "@assets/uae.svg";
import SASVG from "@assets/sa.svg";
import BHSVG from "@assets/bahrain.svg";

import { headerItems } from "@utils";

const VITE_WP_URL = import.meta.env.VITE_WP_URL;

const LeftDrawer: React.FC = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  // -1 = main menu, -2 = country submenu, 0+ = header submenu index
  const [subMenu, setSubMenu] = React.useState(-1);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) setSubMenu(-1);
  };

  const handleMenu = (_idx: number) => {
    setSubMenu(_idx);
  };

  const handleFlagSubMenu = (country: string) => {
    setOpen(false);
    switch (country) {
      case "bahrain":
        window.location.href = `${VITE_WP_URL}/bahrain`;
        break;
      case "uae":
        window.location.href = `${VITE_WP_URL}/`;
        break;
      case "sa":
        window.location.href = `${VITE_WP_URL}/saudi-arabia`;
        break;
      default:
        break;
    }
  };

  const handleSubMenu = (url: string) => {
    if (url.includes("whatsapp")) {
      window.location.href = url;
    } else if (url === "/") {
      setOpen(false);
      window.location.href = `${VITE_WP_URL}`;
    } else if (url !== "#") {
      window.location.href = `${VITE_WP_URL}${url}`;
    }
  };

  const handleDownload = () => {
    window.location.href = `${VITE_WP_URL}/download`;
  };

  const DrawerList = (
    <Box
      width="100vw"
      p={3}
      role="presentation"
      position="relative"
      minHeight="100vh"
    >
      {/* Header with Logo & Close */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <IconButton onClick={toggleDrawer(false)}>
          <Icon name="close" />
        </IconButton>
      </Box>

      <Box mt={2}>
        {subMenu === -1 && (
          <Box display="flex" flexDirection="column" gap={1}>
            {/* Other header menu items */}
            {headerItems.map((item, _idx) => (
              <Box
                key={`${item.title}_${_idx}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    "& .icon-hover": {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                onClick={() =>
                  item.items.length > 0 ? handleMenu(_idx) : handleSubMenu("/")
                }
              >
                <Typography variant="body1" color="#161C2D" fontSize={16}>
                  {item.title}
                </Typography>
                {item.items.length > 0 && (
                  <Icon className="icon-hover" name="right" color="#161C2D" />
                )}
              </Box>
            ))}

            {/* UAE item last with arrow */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={1.5}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.primary.main },
                }}
                onClick={() => handleFlagSubMenu("uae")}
              >
                <img src={UAESVG} alt="UAE" width={36} height={24} />
                <Typography variant="body1" color="#161C2D" fontSize={16} ml={1}>
                  UAE
                </Typography>
              </Box>

              {/* Arrow to open country submenu */}
              <IconButton
                size="small"
                onClick={() => setSubMenu(-2)}
                sx={{
                  color: theme.palette.text.primary,
                  "&:hover": { color: theme.palette.primary.main },
                  p: 0,
                  ml: 1,
                }}
                aria-label="Open countries submenu"
              >
                <Icon name="right" color="#161C2D" />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Header submenu */}
        {subMenu >= 0 && subMenu !== -2 && (
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              fontSize={10}
              onClick={() => setSubMenu(-1)}
              py={2}
              color="#161C2D"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              BACK
            </Typography>

            {headerItems[subMenu].items.map((item, _idx) => (
              <Typography
                key={`${item.title}_${_idx}`}
                variant="body1"
                fontSize={16}
                py={2}
                color="#161C2D"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={() => handleSubMenu(item.url)}
              >
                {item.title}
              </Typography>
            ))}
          </Box>
        )}

        {/* Countries submenu: Bahrain & SA */}
        {subMenu === -2 && (
          <Box display="flex" flexDirection="column">
            <Typography
              variant="caption"
              fontSize={10}
              onClick={() => setSubMenu(-1)}
              py={2}
              color="#161C2D"
              sx={{
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              BACK
            </Typography>

            {/* Bahrain */}
            <Box
              display="flex"
              alignItems="center"
              py={1.5}
              sx={{
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main },
              }}
              onClick={() => handleFlagSubMenu("bahrain")}
            >
              <img src={BHSVG} alt="Bahrain" width={36} height={24} />
              <Typography variant="body1" color="#161C2D" fontSize={16} ml={1}>
                Bahrain
              </Typography>
            </Box>

            {/* Saudi Arabia */}
            <Box
              display="flex"
              alignItems="center"
              py={1.5}
              sx={{
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main },
              }}
              onClick={() => handleFlagSubMenu("sa")}
            >
              <img src={SASVG} alt="Saudi Arabia" width={36} height={24} />
              <Typography variant="body1" color="#161C2D" fontSize={16} ml={1}>
                SA
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box position="absolute" bottom={40} width="calc(100vw - 50px)">
        <Button
          variant="contained"
          fullWidth
          color="primary"
          size="large"
          onClick={handleDownload}
        >
          Download
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)} aria-label="Open menu">
        <Icon name="menu" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default LeftDrawer;
