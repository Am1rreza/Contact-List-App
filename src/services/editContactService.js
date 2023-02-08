import http from "./httpServices";

function editContactService(id, contact) {
  return http.put(`/contacts/${id}`, contact);
}

export default editContactService;
