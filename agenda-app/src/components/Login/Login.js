import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("https://localhost:7062/api/auth/login", this.loginData);
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        this.$router.push("/contatos");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = "Usuário ou senha inválidos";
        } else {
          this.errorMessage = "Ocorreu um erro ao tentar fazer login.";
        }
      }
    },
  },
};