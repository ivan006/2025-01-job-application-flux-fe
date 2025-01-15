<template>

  <q-page class="q-pa-md ">

    <div class="row  q-col-gutter-md">
      <div class="col-xl-3 col-md-3 col-sm-12 col-xs-12">
      </div>
      <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-pa-md">
          <q-form @submit.prevent="submit">
            <div class="text-h6 q-mb-md">Login</div>
            <template v-if="!session">
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                dense
                :rules="[emailRule]"
                autocomplete="email"
                name="email"
              />
              <q-input
                v-model="form.password"
                label="Password"
                type="password"
                outlined
                dense
                autocomplete="password"
                name="password"
              />
              <q-btn
                type="submit"
                block
                class="q-mt-md full-width"
                :loading="loading"
                label="Login"
                color="primary"
              />
              <div class="q-mt-md text-center">
                <q-btn
                  label="Register"
                  class="full-width"
                  outline
                  color="primary"
                  @click="$router.push({ path: 'register'})"
                />
              </div>
            </template>
            <template v-else>
              Welcome <b>{{ loginSession.user.email }}</b>
            </template>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import VueCookies from "vue-cookies";
import Session from "src/models/Session";

export default {
  name: "SigninView",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      emailRule: (val) => !!val || 'Email is required'
    };
  },
  computed: {
    loginSession() {
      return Session.query().withAllRecursive().first();
    },
    session() {
      const session = VueCookies.get('VITE_AUTH');
      return session
    },
  },
  methods: {
    submit() {
      // Session.deleteAll();
      this.loading = true;
      Session.signIn(this.form)
        .then((response) => {
          const sessionData = response.response.data;
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 7); // Set the expiration date to 7 days from now

          sessionData.expireDate = expireDate.toISOString(); // Add the expiration date to the session data

          VueCookies.set('VITE_AUTH', sessionData, '7d');
          // this.$router.push({ path: '/'})
          this.loading = false;
          window.location.href = '/'; // Redirect to home page after logout
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
