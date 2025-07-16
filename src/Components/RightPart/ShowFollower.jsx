import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumber } from "../../Utils/formatNumber";

const ShowFollower = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { auth } = useSelector((state) => state);
  const followers = auth.user?.followers || [];

  const sortedUsers = [...followers].sort((a, b) => {
    if (b.followerCount !== a.followerCount) {
      return b.followerCount - a.followerCount;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ position: "relative", mb: 2 }}>
        <input
          type="text"
          placeholder="Search followers..."
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

      {followers.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          🥲 No one follows you yet.
        </Typography>
      ) : filteredUsers.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          🔍 No followers found.
        </Typography>
      ) : (
        <List>
          {filteredUsers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                alignItems="center"
                sx={{
                  px: 1,
                  py: 0.75,
                  borderRadius: 2,
                  transition: "0.3s",
                  boxShadow: "0 1px 6px rgba(0, 123, 255, 0.15)",
                  "&:hover": {
                    boxShadow: "0 2px 12px rgba(0, 123, 255, 0.3)",
                    bgcolor: "rgba(0, 123, 255, 0.05)",
                  },
                  mb: 0.5,
                  cursor: "pointer",
                }}
              >
                <Avatar
                  alt={user.fullName}
                  src={user.image}
                  sx={{ width: 36, height: 36, mr: 2 }}
                  onClick={() => navigate(`/profile/${user.id}`)}
                />
                <Box>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {user.fullName?.length > 10
                      ? user.fullName.slice(0, 10) + "..."
                      : user.fullName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ display: "block" }}
                  >
                    {user.email}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.3 }}
                  >
                    {formatNumber(user.followerCount || 0)} Followers{" "}
                    <small>
                      Joined on{" "}
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </small>
                  </Typography>
                </Box>
              </ListItem>
              <Divider component="li" sx={{ my: 0.5 }} />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ShowFollower;
