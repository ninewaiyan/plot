import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  CircularProgress,
  TextField,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { api } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

// Optional: helper for formatting large numbers
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

const ShowFriend = ({
  title = 'Friends',
  endpoint = '/api/users/friends',
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await api.get(endpoint);
      const res = response.data;
      const dataArray = Array.isArray(res)
        ? res
        : res.friends || res.followers || res.following || [];

      setUsers(dataArray);
    } catch (error) {
      console.error(`Failed to fetch ${title.toLowerCase()}:`, error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [endpoint]);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
        <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                textAlign="left"
                color="primary"
              >
                Friends
              </Typography>
      <Box sx={{ position: "relative", mb: 2 }}>
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
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

      {loading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={24} />
        </Box>
      ) : users.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          😅 No {title.toLowerCase()} yet.
        </Typography>
      ) : filteredUsers.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
          🔍 No users found.
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
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {formatNumber(user.followerCount || 0)} Followers •{" "}
                    <small>
                      Joined{" "}
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

export default ShowFriend;
