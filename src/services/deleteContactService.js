import http from "./httpServices";

function deleteContactService(id) {
  return http.delete(`/contacts/${id}`);
}

export default deleteContactService;
