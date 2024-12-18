import axios from "axios";

const BASE_URL = "https://localhost:7062/contacts/";

export default {
  name: "FormContato",
  data() {
    return {
      contact: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        isActive: false,
      },
      isEdit: false,
      successMessage: "", 
      errorMessage: "",   
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.fetchContact();
    }
  },
  methods: {
    async fetchContact() {
      try {
        const token = this.getToken();

        if (!token) {
          this.redirectToLogin();
          return;
        }

        const contactId = this.$route.params.id;
        const response = await axios.get(BASE_URL + `searchId/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.contact = response.data;
      } catch (error) {
        console.error("Erro ao carregar o contato", error);
        this.errorMessage = "Erro ao carregar o contato. Tente novamente mais tarde."; 
      }
    },

    async handleSubmit() {
        try {
          const token = this.getToken();
      
          if (!token) {
            this.redirectToLogin();
            return;
          }
      
          if (this.isEdit) {
            await axios.put(BASE_URL + `update/${this.contact.id}`, this.contact, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.successMessage = "Contato atualizado com sucesso!"; 
          } else {
            await axios.post(BASE_URL + "create", this.contact, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.successMessage = "Contato criado com sucesso!"; 
          }
      
          this.contact = {
            id: 0,
            name: "",
            email: "",
            phone: "",
            isActive: false,
          };
      
          setTimeout(() => {
            this.$router.push("/contatos"); 
            this.successMessage = ""; 
          }, 1000);
      
        } catch (error) {
          console.error("Erro ao salvar contato", error);
          this.errorMessage = "Erro ao salvar o contato. Tente novamente mais tarde."; 
      
          setTimeout(() => {
            this.$router.push("/contatos"); 
            this.errorMessage = ""; 
          }, 1000);
        }
      },

    getToken() {
      return localStorage.getItem("jwtToken");
    },

    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
