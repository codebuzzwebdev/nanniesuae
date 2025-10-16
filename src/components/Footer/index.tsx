import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, Grid, Box, IconButton, Typography } from "@mui/material";

import Icon from "@components/Icon";
import Logo from "@components/Logo";
import GooglePNG from "@assets/google.svg";
import ApplePNG from "@assets/apple.svg";
import BHSVG from "@assets/bahrain.svg";

import { footerItems } from "@utils";

const VITE_APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL;
const VITE_PLAY_STORE_URL = import.meta.env.VITE_PLAY_STORE_URL;
const VITE_WP_URL = import.meta.env.VITE_WP_URL;
const VITE_FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL;
const VITE_INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;
const VITE_YOUTUBE_URL = import.meta.env.VITE_YOUTUBE_URL;

const Footer: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenu = (url: string) => {
    if (url !== "#" && !url.includes("?")) {
      window.location.href = `${VITE_WP_URL}${url}`;
    } else {
      navigate(url);
    }
  };

  const handleApple = () => {
    window.open(VITE_APP_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const handleGoogle = () => {
    window.open(VITE_PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const handleFacebook = () => {
    window.open(VITE_FACEBOOK_URL, "_blank", "noopener,noreferrer");
  };

  const handleInstagram = () => {
    window.open(VITE_INSTAGRAM_URL, "_blank", "noopener,noreferrer");
  };

  const handleYoutube = () => {
    window.open(VITE_YOUTUBE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Grid
        container
        px={{ xs: 2, sm: 2, md: 4, lg: "90px", xl: "90px" }}
        pt="50px"
        bgcolor={theme.palette.secondary.light}
      >
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Logo isFull />
          <Typography
            variant="body1"
            color={theme.palette.grey[500]}
            fontSize={14}
            mt={2}
            sx={{ maxWidth: { xs: "100%", lg: "85%" } }}
          >
            Yaya Middle East is the UAE’s all-in-one family app, connecting you with trusted nannies, maids, tutors, newborn care specialists, and more. Whether you need childcare, educational support, or family services like swim coaches, music teachers, or event planners, Yaya has it all. Our platform simplifies finding care by eliminating agency fees and providing direct access to the largest network of qualified caregivers and professionals in Dubai, Abu Dhabi, and across the UAE. No matter what your family needs, Yaya is here to help — finding care, made easy.
          </Typography>

          <Box mt={2} ml={-1}>
            <IconButton onClick={handleFacebook}>
              <Icon name="facebook" color={theme.palette.common.black} />
            </IconButton>
            <IconButton onClick={handleInstagram}>
              <Icon name="instagram" color={theme.palette.common.black} />
            </IconButton>
            <IconButton onClick={handleYoutube}>
              <Icon name="youtube" color={theme.palette.common.black} />
            </IconButton>
          </Box>

          {/* Bahrain Flag Selector */}
          <Box
            display="flex"
            alignItems="center"
            mt={4}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            onClick={() => (window.location.href = `${VITE_WP_URL}/bahrain`)}
          >
            <Typography variant="body1" fontSize={16} mr={1}>
              Switch to
            </Typography>
            <img src={BHSVG} alt="Bahrain Flag" width={36} height={24} />
            <Typography variant="body1" fontSize={16} ml={1}>
              Bahrain
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          mt={{ xs: 3, sm: 3, md: 3, lg: 0, xl: 0 }}
        >
          <Grid container>
            {footerItems.map((item, _idx) => (
              <Grid
                key={`${item.title}_${_idx}`}
                item
                xs={12}
                sm={12}
                md={12}
                lg={2.3}
                xl={2.3}
              >
                <Typography variant="body1" fontWeight="bold" fontSize={18}>
                  {item.title}
                </Typography>
                {item.items.map((subItem, _idx2) => {
                  if (subItem.id === 17) {
                    return (
                      <Box key={`${subItem.title}_${_idx}_${_idx2}`}>
                        <img
                          src={ApplePNG}
                          alt="Apple"
                          width={180}
                          height={50}
                          className="store-images"
                          onClick={handleApple}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                    );
                  } else if (subItem.id === 18) {
                    return (
                      <Box key={`${subItem.title}_${_idx}_${_idx2}`}>
                        <img
                          src={GooglePNG}
                          alt="Google"
                          width={180}
                          height={50}
                          className="store-images"
                          onClick={handleGoogle}
                          style={{ cursor: "pointer" }}
                        />
                      </Box>
                    );
                  } else {
                    return (
                      <Typography
                        key={`${subItem.title}_${_idx}_${_idx2}`}
                        variant="body1"
                        color={theme.palette.grey[600]}
                        fontSize={14}
                        my={3}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: theme.palette.primary.main,
                          },
                        }}
                        onClick={() => handleMenu(subItem.url)}
                      >
                        {subItem.title}
                      </Typography>
                    );
                  }
                })}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color={theme.palette.grey[500]}
        textAlign="center"
        sx={{
          py: "40px",
          px: "8px",
        }}
      >
        © Copyright 2025 Yaya Middle East FZ-LLC. All rights reserved.
      </Typography>
    </>
  );
};

export default Footer;
