import axios from "axios";

const BASE_URL = "https://localhost:7062/contacts/";

export default {
  name: "ListaContatos",
  data() {
    return {
      contacts: [],
    };
  },
  created() {
    this.fetchContacts();
  },
  watch: {
    $route() {
      this.fetchContacts();
    },
  },
  methods: {
    async fetchContacts() {
      try {
        const token = this.getToken();

        if (!token) {
          this.redirectToLogin();
          return;
        }

        const response = await axios.get(BASE_URL + "searchAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.contacts = response.data;
      } catch (error) {
        console.error("Erro ao buscar contatos", error);
      }
    },

    getToken() {
      return localStorage.getItem("jwtToken");
    },

    redirectToLogin() {
      this.$router.push("/login");
    },

    goToCreateContact() {
      this.$router.push("/contato/create");
    },

    editContact(contact) {
      this.$router.push({ name: "EditContato", params: { id: contact.id } });
      this.fetchContacts();
    },

    async deleteContact(contactId) {
      try {
        const token = this.getToken();

        if (!token) {
          this.redirectToLogin();
          return;
        }

        await axios.delete(BASE_URL + `delete/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.fetchContacts();
      } catch (error) {
        console.error("Erro ao deletar contato", error);
      }
    },
  },
};



