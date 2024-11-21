// services/befastapi.tsx
import createApiServices from "../aiService";
const api = createApiServices();
const get = () => {
    return api.makeAuthRequest({
      url: "/api/v1/thongkect",
      method: "GET",
    });
  };

const getcount = () => {
    return api.makeAuthRequest({
      url: `/api/thongke`,
      method: "GET",
    });
  };

const getscore = () => {
    return api.makeAuthRequest({
      url: `/api/thongke2`,
      method: "GET",
    });
  };
export const befastapi = { get, getcount, getscore };