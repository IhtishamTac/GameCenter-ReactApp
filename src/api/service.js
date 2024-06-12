import axios from "axios";
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const signout = (token) => {
  return instance.post('auth/signout', {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const getadmins = (token) => {
  return instance.get('admins', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const getUsers = (token) => {
  return instance.get('usersid', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


const addUser = (token, username, password) => {
  const data = { username, password };
  return instance.post('users', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const updateUser = (token, username, password, userid) => {
  const data = { username, password };
  return instance.put(`users/${userid}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const blockUser = (token, delete_reason, id) => {
  return instance.post(`users/${id}/block`, { delete_reason }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const unblockUser = (token, id) => {
  return instance.delete(`users/${id}/unblock`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const deleteUser = (token, id) => {
  return instance.delete(`users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const discoverGames = (token, size, page, sortBy, sortDir) => {
  return instance.get(`games`, {
    params: {
      page: page || '0',
      size: size || '10',
      sortBy: sortBy || 'title',
      sortDir: sortDir || 'asc'
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const detailGame = (token, slug) => {
  return instance.get(`games/${slug}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const getScore = (token, slug) => {
  return instance.get(`games/${slug}/scores`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const getProfile = (token, username) => {
  return instance.get(`users/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const Services = {
  signout,
  getadmins,
  getUsers,
  addUser,
  updateUser,
  blockUser,
  unblockUser,
  deleteUser,
  discoverGames,
  detailGame,
  getScore,
  getProfile
}

export default Services;    