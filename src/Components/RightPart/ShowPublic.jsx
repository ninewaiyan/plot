import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../Utils/formatNumber";

const ShowPublic = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/api/users");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 Get the top follower globally (only one)
const topFollowerId =
  users.length > 0
    ? users.reduce((top, current) => {
        if (current.followerCount > top.followerCount) return current;
        if (current.followerCount === top.followerCount) {
          return new Date(current.created_at) > new Date(top.created_at)
            ? current
            : top;
        }
        return top;
      }).id
    : null;

  // Filtered and sorted users (by search, then sort by follower count)
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFilteredUsers = [...filteredUsers].sort((a, b) => {
    if (b.followerCount !== a.followerCount) {
      return b.followerCount - a.followerCount;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        textAlign="left"
        color="primary"
      >
        Public
      </Typography>

      {/* Search input */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <input
          type="text"
          placeholder="Search users by name or email..."
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

      {/* User list or message */}
      {users.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          😔 No users available.
        </Typography>
      ) : sortedFilteredUsers.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          🔍 No users found.
        </Typography>
      ) : (
        <List>
          {sortedFilteredUsers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                alignItems="center"
                sx={{
                  px: 1,
                  py: 0.75,
                  borderRadius: 2,
                  transition: "0.3s",
                  boxShadow:
                    user.id === topFollowerId
                      ? "0 4px 20px rgba(255, 215, 0, 0.6)" // Gold for top follower
                      : "0 1px 6px rgba(0, 123, 255, 0.15)",
                  "&:hover": {
                    boxShadow:
                      user.id === topFollowerId
                        ? "0 6px 25px rgba(255, 215, 0, 0.9)" // Gold hover
                        : "0 2px 12px rgba(0, 123, 255, 0.3)",
                    bgcolor: "rgba(0, 123, 255, 0.05)",
                  },
                  mb: 0.5,
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <Avatar
                  alt={user.fullName}
                  src={user.image}
                  sx={{ width: 36, height: 36, mr: 2 }}
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
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3 }}>
                    {formatNumber(user.followerCount)} Followers{" "}
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

export default ShowPublic;
