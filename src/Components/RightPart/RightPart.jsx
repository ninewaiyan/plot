import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../Utils/formatNumber";
import { formatTimeAgo } from "../../Utils/formatTimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import StarIcon from "@mui/icons-material/Star";

const RightPart = () => {
  const [plots, setPlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const { data } = await api.get("/api/plots/");
        setPlots(data);
      } catch (error) {
        console.error("Failed to fetch public plots:", error);
      }
    };
    fetchPlots();
  }, []);

  // Sort globally once
  const sortedPlots = [...plots].sort((a, b) => {
    const scoreA = a.totalLikes + a.totalReplot + a.totalCollects + a.views;
    const scoreB = b.totalLikes + b.totalReplot + b.totalCollects + b.views;
    if (scoreB !== scoreA) return scoreB - scoreA;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Get global top 10 and top 1 IDs
  const top10PlotIds = sortedPlots.slice(0, 10).map((plot) => plot.id);
  const top1PlotId = top10PlotIds[0];

  // Filtered based on search
  const filteredPlots = sortedPlots.filter(
    (plot) =>
      plot.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTimeAgo = (plot) => {
    if (!plot.updatedAt || plot.updatedAt === plot.createdAt) {
      return `Created ${formatTimeAgo(plot.createdAt)}`;
    }
    return `Updated ${formatTimeAgo(plot.updatedAt)}`;
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      {/* Search */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <input
          type="text"
          placeholder="Search by user or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: 40,
            borderRadius: 9999,
            paddingTop: 8,
            paddingBottom: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            color: "#333",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 12,
            transform: "translateY(-50%)",
            color: "gray",
          }}
        >
          <SearchIcon />
        </Box>
      </Box>

      {/* Plot list */}
      {filteredPlots.length > 0 ? (
        <List>
          {filteredPlots.map((plot) => {
            const isTop1 = plot.id === top1PlotId;
            const isTop10 = top10PlotIds.includes(plot.id);

            return (
              <React.Fragment key={plot.id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => navigate(`/plot/${plot.id}`)}
                  sx={{
                    px: 1,
                    py: 1,
                    borderRadius: 2,
                    position: "relative",
                    mb: 0.5,
                    cursor: "pointer",
                    transition: "0.3s",
                    boxShadow: isTop1
                      ? "0 4px 18px rgba(255, 215, 0, 0.5)"
                      : "0 1px 6px rgba(0, 123, 255, 0.15)",
                    border: isTop1
                      ? "2px solid gold"
                      : isTop10
                      ? "1px solid gold"
                      : "1px solid #eee",
                    "&:hover": {
                      boxShadow: isTop1
                        ? "0 6px 25px rgba(255, 215, 0, 0.75)"
                        : isTop10
                        ? "0 4px 14px rgba(255, 215, 0, 0.4)"
                        : "0 2px 12px rgba(0, 123, 255, 0.3)",
                      bgcolor: "rgba(0, 123, 255, 0.05)",
                    },
                  }}
                >
                  {/* Crown or Star Rank */}
                  {isTop1 ? (
                    <FontAwesomeIcon
                      icon={faCrown}
                      style={{
                        color: "gold",
                        fontSize: 20,
                        position: "absolute",
                        top: 8,
                        right: 8,
                      }}
                    />
                  ) : isTop10 ? (
                    <Chip
                      label={
                        <>
                          <StarIcon sx={{ fontSize: 16, mr: 0.5, color: "silver" }} />
                          {top10PlotIds.indexOf(plot.id) + 1}
                        </>
                      }
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "gold",
                        color: "#000",
                        fontWeight: "bold",
                      }}
                    />
                  ) : null}

                  {/* Plot Body */}
                  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                      <Avatar
                        alt={plot.user.fullName}
                        src={plot.user.image}
                        sx={{ width: 36, height: 36, mr: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${plot.user.id}`);
                        }}
                      />
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {plot.user.fullName.length > 10
                          ? plot.user.fullName.slice(0, 10) + "..."
                          : plot.user.fullName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {renderTimeAgo(plot)}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5 }}
                      color="text.primary"
                    >
                      {plot.content.length > 100
                        ? plot.content.slice(0, 100) + "..."
                        : plot.content}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.7, fontSize: "11px" }}
                    >
                      {formatNumber(plot.totalLikes)} Likes •{" "}
                      {formatNumber(plot.totalReplot)} Replots •{" "}
                      {formatNumber(plot.totalCollects)} Collects •{" "}
                      {formatNumber(plot.views)} Views
                    </Typography>
                  </Box>
                </ListItem>
                <Divider component="li" sx={{ my: 0.5 }} />
              </React.Fragment>
            );
          })}
        </List>
      ) : (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 4, fontStyle: "italic" }}
        >
          No plots found.
        </Typography>
      )}
    </Box>
  );
};

export default RightPart;
