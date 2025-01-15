<template>
  <q-page class="q-pa-md ">

    <div class="row  q-col-gutter-md">
      <div class="col-xl-3 col-md-3 col-sm-12 col-xs-12">
      </div>
      <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-pa-md">
          <template v-if="!checkEmail">
            <q-form ref="form" @submit="join" >
              <div class="text-h6 q-mb-md">Register</div>
              <q-input
                v-model="entity.name"
                label="Full Name"
                :error="!!errors.name"
                :error-message="errors.name"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                type="email"
                v-model="entity.email"
                label="Email"
                :error="!!errors.email"
                :error-message="errors.email"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                v-model="entity.password"
                :type="showPassword ? 'text' : 'password'"
                :append="showPassword ? 'visibility_off' : 'visibility'"
                @click:append="showPassword = !showPassword"
                label="Password"
                :error="!!errors.password"
                :error-message="errors.password"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />
              <q-input
                v-model="entity.c_password"
                :type="showCPassword ? 'text' : 'password'"
                :append="showCPassword ? 'visibility_off' : 'visibility'"
                @click:append="showCPassword = !showCPassword"
                label="Confirm Password"
                :error="!!errors.c_password"
                :error-message="errors.c_password"
                :rules="[val => !!val || 'Field is required']"
                outlined
                dense
                class="q-mb-sm"
              />



              <q-btn
                block
                class="full-width "
                :loading="loading"
                type="submit"
                label="Register"
                color="primary"
              />
              <div class="q-mt-md text-center">
                <q-btn
                  label="Login"
                  class="full-width"
                  outline
                  color="primary"
                  @click="$router.push({ path: 'login'})"
                />
              </div>
            </q-form>
          </template>
          <template v-else>
            Your account has been registered!
            <br>
            We have sent you an email with instructions to verify your email address.
          </template>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import User from "src/models/User";
import VueCookies from "vue-cookies";

export default {
  name: "JoinView",
  data() {
    return {
      entity: {},
      loading: false,
      checkEmail: false,
      showPassword: false,
      showCPassword: false,
      errors: {},
      itemEmpty: {
        name: "",
        email: "",
        password: "",
        c_password: "",
      },
    };
  },
  methods: {
    setErrors(rawErrors = {}) {
      for (const fieldKey in this.itemEmpty) {
        if (rawErrors[fieldKey]) {
          this.errors[fieldKey] = rawErrors[fieldKey][0];
        } else {
          this.errors[fieldKey] = null;
        }
      }
    },
    join() {
      if (this.$refs.form.validate()) {
        this.loading = true;



        const session = VueCookies.get('VITE_AUTH');



        User.Register(this.entity)
          .then((response) => {

            const user = response.response.data.user

            this.checkEmail = true
            this.loading = false

          })
          .catch((errors) => {
            if (errors.response && errors.response.data.errors) {
              this.setErrors(errors.response.data.errors);
            }
            this.loading = false
          });
      }

    },
  },
  mounted() {
    this.setErrors();
  },
};
</script>

<style scoped></style>
