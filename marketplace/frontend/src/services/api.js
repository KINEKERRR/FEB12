const API_URL = "http://localhost:3000";

const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Произошла ошибка");
  }

  return data;
};
export const signupRequest = (data) => {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginRequest = (data) => {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getProductsRequest = () => {
  return request("/products");
};

export const getProductRequest = (id) => {
  return request(`/products/${id}`);
};

export const getCartRequest = (token) => {
  return request("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToCartRequest = (token, data) => {
  return request("/cart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateCartRequest = (token, data) => {
  return request("/cart", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const getOrdersRequest = (token) => {
  return request("/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createOrderRequest = (token) => {
  return request("/my-orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItemRequest = (token, productId) => {
  return request(`/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
