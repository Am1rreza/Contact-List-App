import http from "./httpServices";

function getOneContactService(id) {
  return http.get(`/contacts/${id}`);
}

export default getOneContactService;
